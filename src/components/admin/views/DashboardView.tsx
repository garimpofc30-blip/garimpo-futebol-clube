import React, { useEffect, useState } from 'react';
import { StatCard } from '../StatCard';
import { supabase } from '../../../lib/supabaseClient'; // Instância do Supabase

export const DashboardView: React.FC = () => {
  const [stats, setStats] = useState({
    noticias: 0,
    jogadores: 0,
    produtos: 0,
    rifas: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [n, j, p, r] = await Promise.all([
          supabase.from('noticias').select('*', { count: 'exact', head: true }),
          supabase.from('jogadores').select('*', { count: 'exact', head: true }),
          supabase.from('produtos').select('*', { count: 'exact', head: true }),
          supabase.from('rifas').select('*', { count: 'exact', head: true }),
        ]);

        setStats({
          noticias: n.count || 0,
          jogadores: j.count || 0,
          produtos: p.count || 0,
          rifas: r.count || 0,
        });
      } catch (e) {
        console.error('Erro ao carregar totais do Supabase:', e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Visão Geral do Clube</h1>
        <p className="text-sm text-gray-400">Resumo de métricas e status dos módulos do portal.</p>
      </div>

      {/* Grid de Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Notícias Criadas" 
          value={loading ? "..." : stats.noticias} 
          icon="📰" 
          change="Sincronizado" 
          trend="neutral" 
        />
        <StatCard 
          title="Atletas Cadastrados" 
          value={loading ? "..." : stats.jogadores} 
          icon="🏃" 
          change="Elenco Garimpo F.C." 
          trend="up" 
        />
        <StatCard 
          title="Produtos na Loja" 
          value={loading ? "..." : stats.produtos} 
          icon="🛍️" 
          change="Catálogo oficial" 
          trend="neutral" 
        />
        <StatCard 
          title="Rifas Ativas" 
          value={loading ? "..." : stats.rifas} 
          icon="🎟️" 
          change="Campanha em andamento" 
          trend="up" 
        />
      </div>

      {/* Seção de Atividades Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0A1128] border border-white/10 rounded-xl p-6 shadow-md">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>⚡</span> Atividades Recentes
          </h2>
          <div className="space-y-4">
            {[
              { text: "Sistema de Migração SQL configurado no banco de dados.", time: "Hoje", icon: "🛠️" },
              { text: "Estrutura do Painel Administrativo inicializada.", time: "Hoje", icon: "🎨" },
              { text: "Políticas de Segurança RLS preparadas para o Supabase.", time: "Hoje", icon: "🔒" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <span>{item.icon}</span>
                  <span className="text-sm text-gray-200">{item.text}</span>
                </div>
                <span className="text-xs text-[#D4AF37] font-mono">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Auxiliar de Status do Servidor */}
        <div className="bg-[#0A1128] border border-white/10 rounded-xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-white mb-2">Status da Conexão</h2>
            <p className="text-xs text-gray-400 mb-6">Integração com Supabase e autenticação RBAC.</p>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Banco de Dados:</span>
                <span className="text-emerald-400 font-medium">Conectado</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Segurança RLS:</span>
                <span className="text-[#D4AF37] font-medium">Ativa</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Modo de Operação:</span>
                <span className="text-gray-200 font-medium">Produção</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <span className="text-xs text-gray-500">Garimpo Futebol Clube © 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
