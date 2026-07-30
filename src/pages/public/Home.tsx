import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

export const Home: React.FC = () => {
  const [proximoJogo, setProximoJogo] = useState<any>(null);
  const [noticias, setNoticias] = useState<any[]>([]);
  const [documentos, setDocumentos] = useState<any[]>([]);
  const [patrocinadores, setPatrocinadores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDadosHome() {
      try {
        setLoading(true);
        
        // 1. Próximo jogo agendado
        const { data: jogoData } = await supabase
          .from('jogos')
          .select('*')
          .eq('status', 'agendado')
          .order('data_jogo', { ascending: true })
          .limit(1)
          .maybeSingle();

        // 2. Últimas notícias publicadas
        const { data: noticiasData } = await supabase
          .from('noticias')
          .select('*')
          .eq('status', 'publicado')
          .order('created_at', { ascending: false })
          .limit(3);

        // 3. Documentos de transparência
        const { data: docsData } = await supabase
          .from('documentos')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4);

        // 4. Patrocinadores
        const { data: patrocData } = await supabase
          .from('patrocinadores')
          .select('*')
          .order('ordem', { ascending: true });

        if (jogoData) setProximoJogo(jogoData);
        if (noticiasData) setNoticias(noticiasData);
        if (docsData) setDocumentos(docsData);
        if (patrocData) setPatrocinadores(patrocData);
      } catch (err) {
        console.error('Erro ao carregar dados da home:', err);
      } finally {
        setLoading(false);
      }
    }

    carregarDadosHome();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-b from-[#080d21] to-[#050814] py-20 px-4 border-b border-white/10">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="inline-block px-3 py-1 bg-garimpo-gold/10 text-garimpo-gold rounded-full text-xs font-semibold tracking-wider uppercase border border-garimpo-gold/20">
            Portal Oficial
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
            Garimpo <span className="text-garimpo-gold">Futebol Clube</span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto font-light">
            Tradição, paixão e dedicação dentro e fora de campo. Acompanhe nossa trajetória oficial.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link to="/jogos" className="px-6 py-3 bg-garimpo-gold text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors">
              Ver Próximos Jogos
            </Link>
            <Link to="/o-clube" className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors">
              Conheça o Clube
            </Link>
          </div>
        </div>
      </section>

      {/* Próximo Jogo (Caso exista) */}
      {proximoJogo && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-garimpo-navy border border-garimpo-gold/30 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xs uppercase tracking-widest text-garimpo-gold font-bold mb-6 text-center">
              ⚔️ Próximo Confronto
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <span className="text-2xl font-black text-white">GARIMPO F.C.</span>
                <span className="block text-xs text-gray-400 mt-1">Mandante</span>
              </div>
              <div className="text-center bg-black/40 px-6 py-3 rounded-xl border border-white/5">
                <span className="text-sm font-bold text-garimpo-gold block">{proximoJogo.campeonato}</span>
                <span className="text-xs text-gray-300">{proximoJogo.data_jogo} às {proximoJogo.horario}</span>
                <span className="text-xs text-gray-400 block mt-1">📍 {proximoJogo.local}</span>
              </div>
              <div className="text-center sm:text-right">
                <span className="text-2xl font-black text-white">{proximoJogo.adversario}</span>
                <span className="block text-xs text-gray-400 mt-1">Visitante</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Últimas Notícias */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Últimas Notícias</h2>
            <p className="text-xs text-gray-400">Fique por dentro das atualizações mais recentes</p>
          </div>
          <Link to="/noticias" className="text-xs text-garimpo-gold hover:underline font-semibold">
            Ver todas →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-garimpo-navy animate-pulse rounded-xl" />
            ))}
          </div>
        ) : noticias.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {noticias.map((item) => (
              <article key={item.id} className="bg-garimpo-navy border border-white/10 rounded-xl overflow-hidden flex flex-col hover:border-garimpo-gold/50 transition-all">
                {item.imagem_capa && (
                  <img src={item.imagem_capa} alt={item.titulo} className="h-48 w-full object-cover" />
                )}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-garimpo-gold font-bold uppercase">{item.categoria || 'Notícia'}</span>
                    <h3 className="text-lg font-bold text-white mt-1 line-clamp-2">{item.titulo}</h3>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-3">{item.subtitulo || item.conteudo}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-gray-500">
                    <span>{new Date(item.created_at).toLocaleDateString('pt-BR')}</span>
                    <Link to={`/noticias/${item.id}`} className="text-garimpo-gold font-medium hover:underline">Ler mais</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8 bg-garimpo-navy rounded-xl border border-white/5">
            Nenhuma notícia publicada no momento.
          </p>
        )}
      </section>

      {/* Documentos & Transparência */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-garimpo-navy/60 border border-white/10 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white mb-2">📄 Portal da Transparência</h2>
          <p className="text-xs text-gray-400 mb-6">Acesse os documentos institucionais, estatutos e atas do Garimpo F.C.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {documentos.map((doc) => (
              <a
                key={doc.id}
                href={doc.arquivo_url}
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-garimpo-navy border border-white/5 rounded-xl hover:border-garimpo-gold/40 flex items-center justify-between transition-colors"
              >
                <div>
                  <span className="text-sm font-semibold text-white block">{doc.titulo}</span>
                  <span className="text-xs text-garimpo-gold">{doc.categoria}</span>
                </div>
                <span className="text-xs text-gray-400">Baixar PDF ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Patrocinadores */}
      {patrocinadores.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">Nossos Patrocinadores Oficial</h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {patrocinadores.map((p) => (
              <a
                key={p.id}
                href={p.site_url || '#'}
                target="_blank"
                rel="noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                <img src={p.logo_url} alt={p.nome} className="h-12 object-contain filter grayscale hover:grayscale-0 transition-all" />
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
