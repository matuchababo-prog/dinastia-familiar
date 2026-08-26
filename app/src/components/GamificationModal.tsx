import React, { useState, useEffect } from 'react';
import { 
  X, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Target, 
  ArrowRight, 
  Zap, 
  RotateCcw, 
  ChevronRight 
} from 'lucide-react';
import type { Person, FamilyUnion } from '../types/family';
import type { TriviaQuestion, UserGamificationState, FamilyQuest } from '../types/gamification';
import { 
  ALL_BADGES, 
  getUserGamificationState, 
  awardXp, 
  generateDailyQuests, 
  generateFamilyTrivia,
  calculateLevel 
} from '../services/gamificationService';

interface GamificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  persons: Person[];
  unions: FamilyUnion[];
  onSelectPerson?: (person: Person) => void;
  onOpenNameModal?: () => void;
}

export const GamificationModal: React.FC<GamificationModalProps> = ({
  isOpen,
  onClose,
  persons,
  unions,
  onSelectPerson,
  onOpenNameModal,
}) => {
  const [activeTab, setActiveTab] = useState<'badges' | 'quests' | 'trivia'>('badges');
  const [gameState, setGameState] = useState<UserGamificationState>(getUserGamificationState);
  const [quests, setQuests] = useState<FamilyQuest[]>([]);
  
  // Trivia Game State
  const [triviaQuestions, setTriviaQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [triviaScore, setTriviaScore] = useState(0);
  const [isTriviaFinished, setIsTriviaFinished] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const state = getUserGamificationState();
      setGameState(state);
      setQuests(generateDailyQuests());
      if (triviaQuestions.length === 0) {
        setTriviaQuestions(generateFamilyTrivia(persons, unions, 5));
      }
    }
  }, [isOpen, persons, unions]);

  // Start new trivia game
  const handleStartTrivia = () => {
    const generated = generateFamilyTrivia(persons, unions, 5);
    setTriviaQuestions(generated);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setTriviaScore(0);
    setIsTriviaFinished(false);
    setActiveTab('trivia');
  };

  const handleSelectOption = (optionIdx: number) => {
    if (isAnswerRevealed || !triviaQuestions[currentQuestionIdx]) return;
    
    setSelectedOption(optionIdx);
    setIsAnswerRevealed(true);

    const isCorrect = optionIdx === triviaQuestions[currentQuestionIdx].correctIndex;
    if (isCorrect) {
      setTriviaScore(prev => prev + 1);
      const res = awardXp(15, 'trivia_master');
      setGameState(res.newState);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx + 1 < triviaQuestions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
    } else {
      setIsTriviaFinished(true);
      const res = awardXp(20, 'trivia_master');
      setGameState(res.newState);
    }
  };

  if (!isOpen) return null;

  const currentLevelInfo = calculateLevel(gameState.xp);
  const currentQ = triviaQuestions[currentQuestionIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 lg:pl-64 animate-fade-in">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl z-10 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-black shadow-md">
              <Award size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="m-0 text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  Desafíos & Medallas Familiares
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-300">
                  Nivel {currentLevelInfo.level}
                </span>
              </div>
              <p className="m-0 text-xs text-slate-500 mt-0.5">
                {gameState.xp} XP acumulados · <span className="font-bold text-slate-700 dark:text-slate-300">{currentLevelInfo.levelTitle}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Level XP Progress Bar */}
        <div className="mx-5 sm:mx-6 mt-4 p-3 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 rounded-2xl border border-orange-200/70 dark:border-orange-900/40 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Zap size={14} className="text-orange-600 fill-orange-600" />
              Progreso al siguiente nivel
            </span>
            <span className="text-orange-700 dark:text-orange-300 font-extrabold">
              {gameState.xp} / {currentLevelInfo.nextLevelXp} XP
            </span>
          </div>
          <div className="w-full h-2.5 bg-orange-200/60 dark:bg-orange-950 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${currentLevelInfo.progressPercent}%` }}
            />
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 sm:px-6 pt-3 gap-2">
          {[
            { id: 'badges', label: 'Medallas', icon: Award, count: `${gameState.unlockedBadgeIds.length}/${ALL_BADGES.length}` },
            { id: 'quests', label: 'Misiones', icon: Target, count: quests.filter(q => !q.isCompleted).length },
            { id: 'trivia', label: 'Trivia Familiar', icon: Zap },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'trivia' && triviaQuestions.length === 0) handleStartTrivia();
                  else setActiveTab(tab.id as any);
                }}
                className={`pb-3 px-3 border-b-2 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-orange-600 text-orange-600 dark:text-orange-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    isActive ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 flex-1 overflow-y-auto min-h-[260px]">
          
          {/* BADGES TAB */}
          {activeTab === 'badges' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ALL_BADGES.map(badge => {
                const isUnlocked = gameState.unlockedBadgeIds.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                      isUnlocked
                        ? 'bg-gradient-to-tr from-amber-500/10 to-orange-500/5 border-amber-300 dark:border-amber-700/60 shadow-2xs'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 opacity-60'
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                      isUnlocked ? 'bg-amber-100 dark:bg-amber-950/80 shadow-xs' : 'bg-slate-200 dark:bg-slate-700 grayscale'
                    }`}>
                      {badge.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="m-0 text-xs font-black text-slate-900 dark:text-white truncate">
                          {badge.title}
                        </h4>
                        {isUnlocked ? (
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.2 rounded-full shrink-0 flex items-center gap-0.5">
                            <CheckCircle2 size={10} /> Ganada
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-semibold">
                            Bloqueada
                          </span>
                        )}
                      </div>
                      <p className="m-0 text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* QUESTS TAB */}
          {activeTab === 'quests' && (
            <div className="flex flex-col gap-3">
              {quests.map(quest => (
                <div
                  key={quest.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                    quest.isCompleted
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'
                      : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      quest.isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {quest.isCompleted ? <CheckCircle2 size={18} /> : <Target size={18} />}
                    </div>
                    <div className="min-w-0">
                      <h4 className="m-0 text-xs font-bold text-slate-900 dark:text-white truncate">
                        {quest.title}
                      </h4>
                      <p className="m-0 text-[11px] text-slate-500 mt-0.5 leading-snug">
                        {quest.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[10px] font-black text-orange-600 bg-orange-100 dark:bg-orange-950/60 px-2 py-1 rounded-lg">
                      +{quest.xpReward} XP
                    </span>
                    {quest.isCompleted ? (
                      <span className="text-xs font-bold text-emerald-600">Completada</span>
                    ) : quest.targetId && onSelectPerson ? (
                      <button
                        onClick={() => {
                          const target = persons.find(p => p.id === quest.targetId);
                          if (target) {
                            onSelectPerson(target);
                            onClose();
                          }
                        }}
                        className="py-1.5 px-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-2xs flex items-center gap-1 cursor-pointer"
                      >
                        <span>{quest.actionLabel || 'Ver'}</span>
                        <ChevronRight size={13} />
                      </button>
                    ) : quest.id === 'quest_id_identify' && onOpenNameModal ? (
                      <button
                        onClick={() => {
                          onOpenNameModal();
                          onClose();
                        }}
                        className="py-1.5 px-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-2xs flex items-center gap-1 cursor-pointer"
                      >
                        <span>Identificarme</span>
                        <ChevronRight size={13} />
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TRIVIA TAB */}
          {activeTab === 'trivia' && (
            <div className="flex flex-col gap-4">
              {isTriviaFinished ? (
                <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center text-3xl shadow-inner">
                    🎉
                  </div>
                  <h3 className="m-0 text-xl font-black text-slate-900 dark:text-white">
                    ¡Ronda de Trivia Completada!
                  </h3>
                  <p className="m-0 text-sm text-slate-500 max-w-sm">
                    Acertaste {triviaScore} de {triviaQuestions.length} preguntas históricas de la familia.
                  </p>
                  <button
                    onClick={handleStartTrivia}
                    className="mt-3 py-2.5 px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <RotateCcw size={15} />
                    <span>Jugar otra ronda de preguntas</span>
                  </button>
                </div>
              ) : currentQ ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span>Pregunta {currentQuestionIdx + 1} de {triviaQuestions.length}</span>
                    <span className="text-orange-600 font-extrabold">+15 XP</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-orange-50/60 dark:bg-orange-950/30 border-2 border-orange-200 dark:border-orange-800/60">
                    <p className="m-0 text-sm font-black text-slate-900 dark:text-slate-100 leading-snug">
                      {currentQ.question}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    {currentQ.options.map((opt, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrect = idx === currentQ.correctIndex;
                      
                      let btnClass = 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-orange-400';
                      if (isAnswerRevealed) {
                        if (isCorrect) {
                          btnClass = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnClass = 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-200';
                        } else {
                          btnClass = 'opacity-40 border-transparent';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isAnswerRevealed}
                          onClick={() => handleSelectOption(idx)}
                          className={`p-3.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer flex items-center justify-between ${btnClass}`}
                        >
                          <span>{opt}</span>
                          {isAnswerRevealed && isCorrect && <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswerRevealed && (
                    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex flex-col gap-2.5 animate-fade-in">
                      <p className="m-0 text-xs text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
                        💡 <b>Dato Histórico:</b> {currentQ.explanation}
                      </p>
                      <button
                        onClick={handleNextQuestion}
                        className="self-end py-1.5 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                      >
                        <span>Siguiente Pregunta</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40 text-xs text-slate-500">
          <span className="flex items-center gap-1.5 font-semibold text-slate-600 dark:text-slate-400">
            <Sparkles size={14} className="text-amber-500" />
            Explora el árbol y suma anécdotas para subir de nivel
          </span>
          <button
            onClick={onClose}
            className="py-1.5 px-4 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer"
          >
            Listo
          </button>
        </div>

      </div>
    </div>
  );
};
