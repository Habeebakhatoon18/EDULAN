import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const languages = [
    {
      id: 'hindi',
      name: 'Hindi',
      nativeScript: 'हिन्दी',
      englishText: 'Education is the most powerful weapon',
      translatedText: 'शिक्षा सबसे शक्तिशाली हथियार है',
      speakers: '602M',
      flag: '🇮🇳',
      gradient: 'from-orange-400 to-red-500'
    },
    {
      id: 'bengali',
      name: 'Bengali',
      nativeScript: 'বাংলা',
      englishText: 'Knowledge is power',
      translatedText: 'জ্ঞানই শক্তি',
      speakers: '265M',
      flag: '🇧🇩',
      gradient: 'from-green-400 to-blue-500'
    },
    {
      id: 'telugu',
      name: 'Telugu',
      nativeScript: 'తెలుగు',
      englishText: 'Learning never stops',
      translatedText: 'నేర్చుకోవడం ఎప్పుడూ ఆగదు',
      speakers: '95M',
      flag: '🇮🇳',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      id: 'tamil',
      name: 'Tamil',
      nativeScript: 'தமிழ்',
      englishText: 'Books are our best friends',
      translatedText: 'புத்தகங்கள் நமது சிறந்த நண்பர்கள்',
      speakers: '78M',
      flag: '🇮🇳',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'spanish',
      name: 'Spanish',
      nativeScript: 'Español',
      englishText: 'Practice makes perfect',
      translatedText: 'La práctica hace al maestro',
      speakers: '500M',
      flag: '🇪🇸',
      gradient: 'from-red-400 to-yellow-500'
    },
    {
      id: 'french',
      name: 'French',
      nativeScript: 'Français',
      englishText: 'Every student can succeed',
      translatedText: 'Chaque étudiant peut réussir',
      speakers: '280M',
      flag: '🇫🇷',
      gradient: 'from-blue-400 to-purple-500'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % languages?.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + languages?.length) % languages?.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleDotClick = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentLanguage = languages?.[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Supported Languages
        </h3>
        <p className="text-muted-foreground">
          Experience real-time translation across multiple languages and scripts
        </p>
      </div>
      <div className="relative glass rounded-2xl p-8 overflow-hidden">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${currentLanguage?.gradient} opacity-5 transition-all duration-500`}></div>

        {/* Main Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrev}
              disabled={isAnimating}
              iconName="ChevronLeft"
              className="w-10 h-10 rounded-full"
            >
              <span className="sr-only">Previous language</span>
            </Button>

            <div className="flex-1 text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <span className="text-3xl">{currentLanguage?.flag}</span>
                <div>
                  <h4 className="text-xl font-heading font-semibold text-foreground">
                    {currentLanguage?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {currentLanguage?.speakers} speakers worldwide
                  </p>
                </div>
              </div>

              <div className={`text-4xl font-heading mb-6 transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                {currentLanguage?.nativeScript}
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleNext}
              disabled={isAnimating}
              iconName="ChevronRight"
              className="w-10 h-10 rounded-full"
            >
              <span className="sr-only">Next language</span>
            </Button>
          </div>

          {/* Translation Demo */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-lg p-4 border border-border/50">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="Languages" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">English</span>
              </div>
              <p className="text-foreground font-medium">{currentLanguage?.englishText}</p>
            </div>

            <div className="glass rounded-lg p-4 border border-border/50">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="ArrowRight" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">{currentLanguage?.name}</span>
              </div>
              <p className={`text-foreground font-medium transition-all duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                {currentLanguage?.translatedText}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center space-x-2 mt-8">
          {languages?.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              disabled={isAnimating}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary w-8' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            >
              <span className="sr-only">Go to slide {index + 1}</span>
            </button>
          ))}
        </div>

        {/* Auto-play indicator */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-gentle"></div>
          <span>Auto-rotating</span>
        </div>
      </div>
    </div>
  );
};

export default LanguageCarousel;