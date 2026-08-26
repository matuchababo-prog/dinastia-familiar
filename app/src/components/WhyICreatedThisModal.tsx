import React from 'react';
import { Sparkles, X, Quote } from 'lucide-react';

interface WhyICreatedThisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhyICreatedThisModal: React.FC<WhyICreatedThisModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:pl-64">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity animate-fade-in" 
      />

      {/* Modal Box */}
      <div className="relative z-10 w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 flex flex-col gap-5 animate-fade-in max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Cerrar carta"
        >
          <X size={16} />
        </button>

        {/* Header with Avatar and Author Badge */}
        <div className="flex items-center gap-3.5 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-13 h-13 rounded-2xl bg-orange-600 text-white flex items-center justify-center text-xl font-bold shadow-md shrink-0">
            MC
          </div>
          <div>
            <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles size={12} /> Carta de Matías Chababo
            </span>
            <h2 className="m-0 text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50 leading-tight">
              ¿Por qué creé esta app?
            </h2>
            <p className="m-0 text-xs text-slate-500 font-medium">
              El propósito personal detrás de Dinastía Familiar
            </p>
          </div>
        </div>

        {/* Quote Banner */}
        <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 flex items-start gap-3">
          <Quote size={24} className="text-orange-600 shrink-0 mt-0.5" />
          <p className="m-0 text-xs sm:text-sm font-semibold text-orange-950 dark:text-orange-200 italic leading-relaxed">
            "Alguien muere cuando se le olvida. La historia la preservan quienes deciden escribirla."
          </p>
        </div>

        {/* Personal Letter Content */}
        <div className="flex flex-col gap-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          <p className="m-0">
            Hola a todos. Quería contarles desde el corazón por qué decidí encarar este proyecto.
          </p>

          <p className="m-0">
            <strong>Dinastía Familiar</strong> nació de un deseo muy íntimo y personal que me hacía una ilusión gigante desde hace mucho tiempo: <strong>que la historia de nuestra gente nunca se pierda en el tiempo</strong>.
          </p>

          <p className="m-0">
            Pienso en los esfuerzos de los que llegaron de lejos con una valija y un sueño, en las anécdotas inolvidables de los almuerzos de domingo, en las risas de sobremesa y en los consejos de nuestros abuelos. Si nadie los recopila ni los cuida, con los años esos recuerdos se van desvaneciendo.
          </p>

          <p className="m-0">
            Me gustaría que las generaciones que vengan después de nosotros —nuestros hijos, sobrinos y nietos— puedan abrir esta plataforma, tocar la tarjeta de sus antepasados, ver sus fotos de jóvenes, escuchar sus voces y <strong>sentir un orgullo inmenso de sus raíces</strong>.
          </p>

          <p className="m-0">
            Si esta app ayuda a que una sola anécdota se salve del olvido y una sola conversación familiar ocurra, todo este trabajo habrá valido la pena por completo.
          </p>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold text-slate-800 dark:text-slate-200">— Matías Chababo</span>
            <span>Gen 3 · Rama Chababo</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 px-5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm flex items-center justify-center transition-colors cursor-pointer shadow-sm"
          >
            Entendido, ¡gracias!
          </button>
        </div>
      </div>
    </div>
  );
};
