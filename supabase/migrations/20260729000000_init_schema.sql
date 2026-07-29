-- ==========================================
-- 1. EXTENSÕES E FUNÇÕES AUXILIARES
-- ==========================================

-- Garantir extensão para geração de UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Função genérica para atualizar a coluna updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ==========================================
-- 2. TIPOS ENUM CUSTOMIZADOS
-- ==========================================

CREATE TYPE user_role AS ENUM ('admin', 'editor', 'member', 'guest');
CREATE TYPE match_status AS ENUM ('agendado', 'ao_vivo', 'finalizado', 'cancelado');
CREATE TYPE raffle_status AS ENUM ('ativo', 'encerrado', 'sorteado', 'cancelado');


-- ==========================================
-- 3. CRIAÇÃO DAS TABELAS
-- ==========================================

-- TABELA: PROFILES (Extensão do auth.users do Supabase)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    foto TEXT,
    cargo VARCHAR(100),
    role user_role NOT NULL DEFAULT 'member',
    ativo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABELA: NOTICIAS
CREATE TABLE public.noticias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(255) NOT NULL,
    resumo TEXT,
    conteudo TEXT NOT NULL,
    imagem_capa TEXT,
    categoria VARCHAR(100) NOT NULL DEFAULT 'Geral',
    autor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    publicado BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABELA: JOGOS
CREATE TABLE public.jogos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    adversario VARCHAR(255) NOT NULL,
    campeonato VARCHAR(255) NOT NULL,
    data_jogo DATE NOT NULL,
    horario TIME NOT NULL,
    local VARCHAR(255) NOT NULL,
    escudo_adversario TEXT,
    placar_garimpo INTEGER,
    placar_adversario INTEGER,
    status match_status NOT NULL DEFAULT 'agendado',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABELA: JOGADORES
CREATE TABLE public.jogadores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    numero INTEGER,
    posicao VARCHAR(100) NOT NULL,
    foto TEXT,
    data_nascimento DATE,
    nacionalidade VARCHAR(100) DEFAULT 'Brasileira',
    altura NUMERIC(3,2),
    peso NUMERIC(5,2),
    descricao TEXT,
    ativo BOOLEAN NOT NULL DEFAULT true
);

-- TABELA: PATROCINADORES
CREATE TABLE public.patrocinadores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    logo TEXT NOT NULL,
    site TEXT,
    categoria VARCHAR(100) NOT NULL DEFAULT 'Oficial',
    ordem INTEGER DEFAULT 0,
    ativo BOOLEAN NOT NULL DEFAULT true
);

-- TABELA: DOCUMENTOS (Estatuto Social, Atas, etc.)
CREATE TABLE public.documentos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    arquivo TEXT NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    publico BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABELA: GALERIA
CREATE TABLE public.galeria (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(255) NOT NULL,
    imagem TEXT NOT NULL,
    categoria VARCHAR(100) NOT NULL DEFAULT 'Geral',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABELA: PRODUTOS (Loja Oficial)
CREATE TABLE public.produtos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco NUMERIC(10,2) NOT NULL,
    estoque INTEGER NOT NULL DEFAULT 0,
    categoria VARCHAR(100) NOT NULL,
    imagem_principal TEXT NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABELA: RIFAS
CREATE TABLE public.rifas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    premio VARCHAR(255) NOT NULL,
    valor_numero NUMERIC(10,2) NOT NULL,
    quantidade_numeros INTEGER NOT NULL,
    imagem TEXT,
    status raffle_status NOT NULL DEFAULT 'ativo',
    data_sorteio TIMESTAMPTZ
);


-- ==========================================
-- 4. ÍNDICES DE PERFORMANCE
-- ==========================================

CREATE INDEX idx_noticias_publicado ON public.noticias(publicado);
CREATE INDEX idx_noticias_categoria ON public.noticias(categoria);
CREATE INDEX idx_jogos_data ON public.jogos(data_jogo);
CREATE INDEX idx_jogadores_ativo ON public.jogadores(ativo);
CREATE INDEX idx_patrocinadores_ativo_ordem ON public.patrocinadores(ativo, ordem);
CREATE INDEX idx_documentos_publico ON public.documentos(publico);
CREATE INDEX idx_produtos_ativo ON public.produtos(ativo);
CREATE INDEX idx_rifas_status ON public.rifas(status);


-- ==========================================
-- 5. TRIGGERS PARA TIMESTAMPS
-- ==========================================

CREATE TRIGGER update_profiles_modtime
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_noticias_modtime
    BEFORE UPDATE ON public.noticias
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ==========================================
-- 6. TRIGGER AUTOMÁTICO DE CRIAÇÃO DE PROFILE
-- ==========================================

-- Cria o perfil public.profiles automaticamente quando um usuário cadastra no Auth Supabase
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nome, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Novo Usuário'),
    NEW.email,
    'member'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ==========================================
-- 7. SEGURANÇA: ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.noticias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jogos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jogadores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patrocinadores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galeria ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rifas ENABLE ROW LEVEL SECURITY;

-- Helper Função: Verifica se o usuário atual é Admin ou Editor
CREATE OR REPLACE FUNCTION public.is_admin_or_editor()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'editor') AND ativo = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- POLÍTICAS: PROFILES
CREATE POLICY "Leitura de perfis por qualquer autenticado" ON public.profiles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Usuário altera próprio perfil" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admin gerencia todos os perfis" ON public.profiles FOR ALL USING (public.is_admin_or_editor());

-- POLÍTICAS: NOTICIAS
CREATE POLICY "Leitura pública de notícias publicadas" ON public.noticias FOR SELECT USING (publicado = true OR public.is_admin_or_editor());
CREATE POLICY "Admin/Editor gerencia notícias" ON public.noticias FOR ALL USING (public.is_admin_or_editor());

-- POLÍTICAS: JOGOS
CREATE POLICY "Leitura pública de jogos" ON public.jogos FOR SELECT USING (true);
CREATE POLICY "Admin/Editor gerencia jogos" ON public.jogos FOR ALL USING (public.is_admin_or_editor());

-- POLÍTICAS: JOGADORES
CREATE POLICY "Leitura pública de jogadores ativos" ON public.jogadores FOR SELECT USING (ativo = true OR public.is_admin_or_editor());
CREATE POLICY "Admin/Editor gerencia jogadores" ON public.jogadores FOR ALL USING (public.is_admin_or_editor());

-- POLÍTICAS: PATROCINADORES
CREATE POLICY "Leitura pública de patrocinadores ativos" ON public.patrocinadores FOR SELECT USING (ativo = true OR public.is_admin_or_editor());
CREATE POLICY "Admin/Editor gerencia patrocinadores" ON public.patrocinadores FOR ALL USING (public.is_admin_or_editor());

-- POLÍTICAS: DOCUMENTOS
CREATE POLICY "Leitura pública de documentos abertos" ON public.documentos FOR SELECT USING (publico = true OR public.is_admin_or_editor());
CREATE POLICY "Admin/Editor gerencia documentos" ON public.documentos FOR ALL USING (public.is_admin_or_editor());

-- POLÍTICAS: GALERIA
CREATE POLICY "Leitura pública da galeria" ON public.galeria FOR SELECT USING (true);
CREATE POLICY "Admin/Editor gerencia galeria" ON public.galeria FOR ALL USING (public.is_admin_or_editor());

-- POLÍTICAS: PRODUTOS
CREATE POLICY "Leitura pública de produtos ativos" ON public.produtos FOR SELECT USING (ativo = true OR public.is_admin_or_editor());
CREATE POLICY "Admin/Editor gerencia produtos" ON public.produtos FOR ALL USING (public.is_admin_or_editor());

-- POLÍTICAS: RIFAS
CREATE POLICY "Leitura pública de rifas" ON public.rifas FOR SELECT USING (true);
CREATE POLICY "Admin/Editor gerencia rifas" ON public.rifas FOR ALL USING (public.is_admin_or_editor());
