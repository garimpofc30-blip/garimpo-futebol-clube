export default function AdminDashboard() {
  return (
    <div className="p-8 bg-brand-navyDark min-h-screen text-white">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-gold">Painel de Gestão — Garimpo F.C.</h1>
          <p className="text-slate-400 text-sm">Gerencie notícias, elenco, produtos da loja e rifas do clube.</p>
        </div>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-brand-navy p-6 rounded-xl border border-white/10">
          <span className="text-slate-400 text-xs uppercase font-semibold">Total de Atletas</span>
          <p className="text-3xl font-bold text-white mt-2">28</p>
        </div>
        <div className="bg-brand-navy p-6 rounded-xl border border-white/10">
          <span className="text-slate-400 text-xs uppercase font-semibold">Notícias Publicadas</span>
          <p className="text-3xl font-bold text-white mt-2">14</p>
        </div>
        <div className="bg-brand-navy p-6 rounded-xl border border-white/10">
          <span className="text-slate-400 text-xs uppercase font-semibold">Vendas da Loja</span>
          <p className="text-3xl font-bold text-brand-gold mt-2">R$ 0,00</p>
        </div>
        <div className="bg-brand-navy p-6 rounded-xl border border-white/10">
          <span className="text-slate-400 text-xs uppercase font-semibold">Rifas Ativas</span>
          <p className="text-3xl font-bold text-white mt-2">2</p>
        </div>
      </div>
    </div>
  );
}
