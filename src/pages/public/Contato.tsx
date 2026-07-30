import React, { useState } from 'react';

export const Contato: React.FC = () => {
  const [enviado, setEnviado] = useState(false);
  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setFormData({ nome: '', email: '', mensagem: '' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-white uppercase">Fale Conosco</h1>
        <p className="text-gray-400 text-sm">Canais oficiais de atendimento do Garimpo Futebol Clube</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulário */}
        <div className="bg-garimpo-navy border border-white/10 rounded-2xl p-6">
          {enviado ? (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center space-y-2">
              <span className="text-emerald-400 font-bold block">Mensagem enviada com sucesso!</span>
              <p className="text-xs text-gray-300">Agradecemos o contato. Responderemos em breve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">Seu Nome *</label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData(p => ({ ...p, nome: e.target.value }))}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-garimpo-gold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">Seu E-mail *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-garimpo-gold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">Mensagem *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.mensagem}
                  onChange={(e) => setFormData(p => ({ ...p, mensagem: e.target.value }))}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-garimpo-gold"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-garimpo-gold text-black font-bold py-3 rounded-lg hover:bg-yellow-400 transition-colors text-sm uppercase"
              >
                Enviar Mensagem
              </button>
            </form>
          )}
        </div>

        {/* Informações de Atendimento */}
        <div className="space-y-6">
          <div className="bg-garimpo-navy border border-white/10 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-garimpo-gold">Canais Diretos</h3>
            
            <div className="space-y-3 text-sm">
              <div>
                <span className="block text-xs text-gray-400 uppercase">E-mail Oficial</span>
                <a href="mailto:contato@garimpofc.com.br" className="text-white hover:underline">contato@garimpofc.com.br</a>
              </div>
              <div>
                <span className="block text-xs text-gray-400 uppercase">Atendimento via WhatsApp</span>
                <a href="https://wa.me/5500000000000" target="_blank" rel="noreferrer" className="text-emerald-400 font-semibold hover:underline">
                  Enviar mensagem no WhatsApp ↗
                </a>
              </div>
            </div>
          </div>

          <div className="bg-garimpo-navy border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-2">Sede / Mando de Campo</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Estádio Municipal de Futebol<br />
              Atendimentos e jogos aos fins de semana.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
