import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LanguageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const languages = [
    { name: 'English', native: 'English', flag: '🇺🇸' },
    { name: 'Spanish', native: 'Español', flag: '🇪🇸' },
    { name: 'French', native: 'Français', flag: '🇫🇷' },
    { name: 'German', native: 'Deutsch', flag: '🇩🇪' },
    { name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
    { name: 'Chinese', native: '中文', flag: '🇨🇳' },
    { name: 'Japanese', native: '日本語', flag: '🇯🇵' },
    { name: 'Arabic', native: 'العربية', flag: '🇸🇦' },
    { name: 'Portuguese', native: 'Português', flag: '🇵🇹' },
    { name: 'Russian', native: 'Русский', flag: '🇷🇺' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % languages?.length);
        setIsVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [languages?.length]);

  const currentLanguage = languages?.[currentIndex];

  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center space-x-2 mb-2">
        <Icon name="Languages" size={20} className="text-primary" />
        <span className="text-sm font-medium text-muted-foreground">
          Supporting {languages?.length}+ Languages
        </span>
      </div>
      <div className="relative h-16 flex items-center justify-center">
        <div
          className={`transition-all duration-300 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="flex items-center space-x-3 p-4 glass rounded-lg border border-border/50">
            <span className="text-2xl">{currentLanguage?.flag}</span>
            <div className="text-left">
              <div className="font-medium text-foreground">{currentLanguage?.name}</div>
              <div className="text-sm text-muted-foreground font-mono">
                {currentLanguage?.native}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-1">
        {languages?.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsVisible(true);
              }, 150);
            }}
            className={`w-2 h-2 rounded-full transition-smooth ${
              index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default LanguageCarousel;