import React from 'react';
import { countWords, countCharacters } from '../../../utils/noticiasHelpers';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const insertFormatting = (tagStart: string, tagEnd: string = '') => {
    const textarea = document.getElementById('rich-editor-area') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const replacement = `${tagStart}${selectedText}${tagEnd}`;

    const newValue = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
    onChange(newValue);
  };

  return (
    <div className="border border-white/10 rounded-xl bg-garimpo-navy-dark overflow-hidden focus-within:border-garimpo-gold transition-colors">
      {/* Barra de Ferramentas */}
      <div className="bg-garimpo-navy-light border-b border-white/10 p-2 flex flex-wrap gap-1.5 text-xs text-gray-300">
        <button type="button" onClick={() => insertFormatting('<h2>', '</h2>')} className="px-2 py-1 hover:bg-white/10 rounded font-bold">H2</button>
        <button type="button" onClick={() => insertFormatting('<h3>', '</h3>')} className="px-2 py-1 hover:bg-white/10 rounded font-bold">H3</button>
        <span className="w-px h-5 bg-white/10 self-center" />
        <button type="button" onClick={() => insertFormatting('<strong>', '</strong>')} className="px-2 py-1 hover:bg-white/10 rounded font-bold">B</button>
        <button type="button" onClick={() => insertFormatting('<em>', '</em>')} className="px-2 py-1 hover:bg-white/10 rounded italic">I</button>
        <button type="button" onClick={() => insertFormatting('<u>', '</u>')} className="px-2 py-1 hover:bg-white/10 rounded underline">U</button>
        <span className="w-px h-5 bg-white/10 self-center" />
        <button type="button" onClick={() => insertFormatting('<a href="#">', '</a>')} className="px-2 py-1 hover:bg-white/10 rounded">🔗 Link</button>
        <button type="button" onClick={() => insertFormatting('<blockquote>', '</blockquote>')} className="px-2 py-1 hover:bg-white/10 rounded">❝ Citação</button>
        <button type="button" onClick={() => insertFormatting('<ul>\n  <li>', '</li>\n</ul>')} className="px-2 py-1 hover:bg-white/10 rounded">• Lista</button>
        <button type="button" onClick={() => insertFormatting('<hr />')} className="px-2 py-1 hover:bg-white/10 rounded">― Linha</button>
        <button type="button" onClick={() => insertFormatting('<img src="URL_DA_IMAGEM" alt="Descrição" />')} className="px-2 py-1 hover:bg-white/10 rounded">🖼️ Imagem</button>
        <button type="button" onClick={() => insertFormatting('<table>\n  <tr><td>Conteúdo</td></tr>\n</table>')} className="px-2 py-1 hover:bg-white/10 rounded">📊 Tabela</button>
      </div>

      {/* Área de Edição */}
      <textarea
        id="rich-editor-area"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={12}
        className="w-full bg-transparent p-4 text-sm text-gray-100 focus:outline-none font-mono resize-y"
        placeholder="Escreva a notícia em formato Rich Text / HTML..."
      />

      {/* Estatísticas do Editor */}
      <div className="bg-garimpo-navy-light/50 border-t border-white/5 px-4 py-2 flex justify-between text-xs text-gray-400 font-mono">
        <span>Palavras: <strong className="text-garimpo-gold">{countWords(value)}</strong></span>
        <span>Caracteres: <strong className="text-garimpo-gold">{countCharacters(value)}</strong></span>
      </div>
    </div>
  );
};
