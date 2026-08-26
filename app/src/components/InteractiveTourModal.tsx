import React, { useState } from 'react';
import { 
  Sparkles, 
  Users, 
  MessageSquareHeart, 
  MessageSquare, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  X, 
  BookOpen 
} from 'lucide-react';

interface InteractiveTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveTourModal: React.FC<InteractiveTourModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: '¡Bienvenido a Dinastía Familiar!',
      subtitle: 'El mapa vivo de nuestra historia, nuestras raíces y nuestros recuerdos.',
      icon: Sparkles,
      iconBg: 'bg-orange-100 text-orange-600',
      content: (
        <div className="flex flex-col gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p className="m-0">
            Cada familia tiene un color, cada generación un lugar y cada persona una historia que merece ser recordada para siempre.
          </p>
          <div className="bg-orange-50 dark:bg-orange-950/30 p-3.5 rounded-2xl border border-orange-200/80 dark:border-orange-800/50 flex items-center gap-3">
            <Users size={24} className="text-orange-600 shrink-0" />
            <p className="m-0 text-xs font-semibold text-orange-950 dark:text-orange-200">
              Desplázate con 2 dedos o arrastra la pantalla para explorar todas las ramas y generaciones.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Toca a cualquier familiar',
      subtitle: 'Descubre fotos, audios de voz, hechos históricos y sus enseñanzas.',
      icon: BookOpen,
      iconBg: 'bg-blue-100 text-blue-600',
      content: (
        <div className="flex flex-col gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p className="m-0">
            Al tocar una tarjeta, se abrirá la <strong>Ficha Biográfica</strong> donde podrás:
          </p>
          <ul className="m-0 pl-4 space-y-1.5 text-xs">
            <li>🎙️ <strong>Escuchar su voz:</strong> Grabaciones históricas o notas de voz preservadas.</li>
            <li>📸 <strong>Ver fotos de época:</strong> Retratos de juventud y momentos familiares.</li>
            <li>💬 <strong>Contrapuntos familiares:</strong> Cómo lo recordaba cada rama de la familia.</li>
          </ul>
        </div>
      )
    },
    {
      title: '¡Tu memoria es el tesoro!',
      subtitle: 'La app cobra vida cuando tú y tu familia suman anécdotas.',
      icon: MessageSquareHeart,
      iconBg: 'bg-rose-100 text-rose-600',
      content: (
        <div className="flex flex-col gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p className="m-0">
            ¿Te acordás de una frase típica, una comida que preparaba, o una historia divertida? 
          </p>
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs text-amber-900 dark:text-amber-200 flex flex-col gap-1.5">
            <span className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
              ✨ Alguien muere cuando se le olvida
            </span>
            <p className="m-0 leading-relaxed">
              Toca la tarjeta de tu familiar y usa el botón <strong>"Escribir anécdota"</strong> o sube fotos y audios para que las próximas generaciones lo conozcan.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Preguntas para recordar juntos',
      subtitle: 'La app te deja preguntas para responder sobre tus familiares.',
      icon: MessageSquare,
      iconBg: 'bg-orange-100 text-orange-600',
      content: (
        <div className="flex flex-col gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p className="m-0">
            En la ficha de cada familiar encontrarás preguntas especiales según tu parentesco:
          </p>
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 italic text-xs border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
            "¿A qué jugaban de chicos?" · "¿Cuál fue su mayor consejo?"
          </div>
          <p className="m-0 text-xs">
            Podés responder directamente desde la app con tus palabras y quedará guardado para siempre en la familia.
          </p>
        </div>
      )
    }
  ];

  const handleFinish = () => {
    localStorage.setItem('dinastia_tour_seen', 'true');
    onClose();
  };

  const step = steps[currentStep];
  const StepIcon = step.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:pl-64">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in" 
      />

      {/* Card Modal */}
      <div className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 flex flex-col gap-5 animate-fade-in overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Cerrar tutorial"
        >
          <X size={16} />
        </button>

        {/* Header Icon and Step Badge */}
        <div className="flex items-center justify-between pt-1">
          <div className={`w-12 h-12 rounded-2xl ${step.iconBg} flex items-center justify-center shadow-xs`}>
            <StepIcon size={24} />
          </div>
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            Paso {currentStep + 1} de {steps.length}
          </span>
        </div>

        {/* Title & Subtitle */}
        <div>
          <h2 className="m-0 text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50 leading-tight">
            {step.title}
          </h2>
          <p className="m-0 mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
            {step.subtitle}
          </p>
        </div>

        {/* Dynamic Content */}
        <div className="min-h-[140px] flex items-center">
          {step.content}
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-1.5 pt-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentStep ? 'w-6 bg-orange-600' : 'w-2 bg-slate-200 dark:bg-slate-700'
              }`}
              aria-label={`Ir al paso ${i + 1}`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          {currentStep > 0 ? (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Anterior</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 py-2 px-1 transition-colors cursor-pointer"
            >
              Saltar tutorial
            </button>
          )}

          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors cursor-pointer ml-auto"
            >
              <span>Siguiente</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors cursor-pointer ml-auto"
            >
              <Check size={14} />
              <span>¡Comenzar a Explorar!</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
