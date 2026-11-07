import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Key, Sparkles, Clock, CheckCircle, X, Sun, Coffee, Sunset, Moon } from 'lucide-react';
import { TimeCapsule } from '../types';
import { INITIAL_CAPSULES } from '../data/defaultContent';
import { sound } from '../services/soundEffects';

export const SecretCapsules: React.FC = () => {
  const [capsules] = useState<TimeCapsule[]>(INITIAL_CAPSULES);
  const [unlockedIds, setUnlockedIds] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('unlocked_capsules');
      return stored ? JSON.parse(stored) : { 'cap-1': true, 'cap-2': true };
    } catch {
      return { 'cap-1': true, 'cap-2': true };
    }
  });

  const [activeCapsule, setActiveCapsule] = useState<TimeCapsule | null>(null);
  const [magicKeyActive, setMagicKeyActive] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState('');

  // Keep track of current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const timeVal = `${hours}:${minutes}`;
      setCurrentTimeStr(timeVal);

      // Check auto-unlock by system time
      capsules.forEach((c) => {
        if (timeVal >= c.unlockTime) {
          setUnlockedIds((prev) => {
            if (!prev[c.id]) {
              const updated = { ...prev, [c.id]: true };
              try {
                localStorage.setItem('unlocked_capsules', JSON.stringify(updated));
              } catch {}
              return updated;
            }
            return prev;
          });
        }
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, [capsules]);

  const handleUnlockWithKey = () => {
    sound.playSparkleCelebration();
    const allUnlocked: Record<string, boolean> = {};
    capsules.forEach((c) => {
      allUnlocked[c.id] = true;
    });
    setUnlockedIds(allUnlocked);
    setMagicKeyActive(true);
    try {
      localStorage.setItem('unlocked_capsules', JSON.stringify(allUnlocked));
    } catch {}
  };

  const handleOpenCapsule = (capsule: TimeCapsule) => {
    const isUnlocked = unlockedIds[capsule.id] || magicKeyActive;
    if (!isUnlocked) {
      sound.playChime(300);
      return;
    }
    sound.playChime(700);
    setActiveCapsule(capsule);
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Sun':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-amber-700" />;
      case 'Sunset':
        return <Sunset className="w-5 h-5 text-rose-500" />;
      case 'Moon':
        return <Moon className="w-5 h-5 text-indigo-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="capsules" className="py-16 sm:py-24 bg-[#FAF7F2] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#8B6E60] tracking-wider uppercase mb-2">
            <span>Hidden Treasures</span>
            <span aria-hidden="true">·</span>
            <span>Unlocks Hourly</span>
            <span aria-hidden="true">·</span>
            <span>Current Time: {currentTimeStr || '12:00'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2424] text-balance">
            Secret Messages Throughout Your Day
          </h2>
          <p className="mt-2 text-sm text-[#6B5E59]">
            A series of time-locked letters scattered across your special day. As the sun moves, each capsule unlocks its secret.
          </p>

          {/* Master Key Toggle so she never gets blocked */}
          <div className="mt-5 flex justify-center">
            {!magicKeyActive ? (
              <button
                onClick={handleUnlockWithKey}
                className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium text-[#8B3A4D] bg-[#F4D2D7]/40 hover:bg-[#F4D2D7]/70 rounded-full border border-[#8B3A4D]/20 transition-all cursor-pointer"
                title="If you are visiting before or after, use the golden key to unlock all secrets instantly"
              >
                <Key className="w-3.5 h-3.5 text-[#C2922E]" />
                <span>Impatient Birthday Girl? Unlock All with Magic Key 🗝️</span>
              </button>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs text-[#2E5E44] bg-[#E6ECE7] px-3 py-1 rounded-full border border-[#B8CEBC]">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Magic Key Activated — All Capsules Unlocked!</span>
              </span>
            )}
          </div>
        </div>

        {/* Timeline representation */}
        <div className="relative mt-12 space-y-6 before:absolute before:inset-0 before:left-7 sm:before:left-1/2 before:w-0.5 before:-translate-x-1/2 before:bg-[#E8DFC8]">
          {capsules.map((capsule, index) => {
            const isUnlocked = unlockedIds[capsule.id] || magicKeyActive;
            const isEven = index % 2 === 0;

            return (
              <div
                key={capsule.id}
                className={`relative flex items-center gap-6 ${
                  isEven ? 'sm:flex-row-reverse' : 'sm:flex-row'
                } flex-row`}
              >
                {/* Timeline Center Node */}
                <div className="absolute left-7 sm:left-1/2 -translate-x-1/2 z-10">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${
                      isUnlocked
                        ? 'bg-[#FCF9F3] border-[#8B3A4D] text-[#8B3A4D] shadow-sm'
                        : 'bg-[#F2ECE4] border-[#D6C7B2] text-[#8B6E60]'
                    }`}
                  >
                    {isUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </div>
                </div>

                {/* Capsule Card */}
                <div
                  onClick={() => handleOpenCapsule(capsule)}
                  className={`ml-16 sm:ml-0 sm:w-1/2 ${
                    isEven ? 'sm:pr-12' : 'sm:pl-12'
                  } w-full`}
                >
                  <div
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      isUnlocked
                        ? 'bg-[#FCF9F3] border-[#E8DFC8] hover:border-[#8B3A4D]/40 shadow-xs hover:shadow-md'
                        : 'bg-[#F2ECE4]/70 border-[#E8DFC8]/60 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        {renderIcon(capsule.iconName)}
                        <span className="text-xs font-semibold text-[#8B3A4D] font-mono">
                          {capsule.unlockTime}
                        </span>
                        <span className="text-xs text-[#8B6E60]">· {capsule.theme}</span>
                      </div>

                      <span className="text-[11px] font-medium">
                        {isUnlocked ? (
                          <span className="text-[#2E5E44] flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Unlocked
                          </span>
                        ) : (
                          <span className="text-[#8B6E60]">Locked</span>
                        )}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#2D2424] mb-1">
                      {capsule.unlockTitle}
                    </h3>
                    <p className="text-xs text-[#6B5E59] italic font-sans">
                      {isUnlocked ? `"${capsule.teaser}"` : '🔒 Unlocks when the clock reaches ' + capsule.unlockTime}
                    </p>

                    <div className="mt-3 pt-2 border-t border-[#E8DFC8]/60 flex justify-between items-center text-[11px]">
                      <span className="text-[#8B6E60]">
                        {isUnlocked ? 'Tap to reveal full letter' : 'Time-locked capsule'}
                      </span>
                      {isUnlocked && (
                        <span className="text-[#8B3A4D] font-medium">Open Message →</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Capsule Content Modal */}
      {activeCapsule && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          onClick={() => setActiveCapsule(null)}
        >
          <div
            className="bg-[#FCF9F3] parchment-card rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-[#E8DFC8] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Washi tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape washi-tape-sage rounded-xs opacity-90" />

            <button
              onClick={() => setActiveCapsule(null)}
              className="absolute top-4 right-4 p-1.5 text-[#6B5E59] hover:bg-[#F2ECE4] rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex p-2 rounded-full bg-[#FAF0DC] mb-2">
                {renderIcon(activeCapsule.iconName)}
              </div>
              <div className="text-xs text-[#8B6E60] font-mono">{activeCapsule.unlockTime} • {activeCapsule.theme}</div>
              <h3 className="font-serif text-2xl font-bold text-[#5B2333] mt-1">
                {activeCapsule.unlockTitle}
              </h3>
            </div>

            <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E8DFC8]/70">
              <p className="font-serif text-base text-[#2D2424] leading-relaxed">
                {activeCapsule.fullMessage}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveCapsule(null)}
                className="px-5 py-2 text-xs font-medium text-white bg-[#8B3A4D] hover:bg-[#6F2B3B] rounded-full transition-colors cursor-pointer"
              >
                Cherish This Message 🌸
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
