import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import AuthToggle from './components/AuthToggle';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';
import LanguageCarousel from './components/LanguageCarousel';
import AnimatedBackground from './components/AnimatedBackground';
import CursorGlow from './components/CursorGlow';

const AuthenticationPage = () => {
  const [activeMode, setActiveMode] = useState('login');
  const [currentLanguage, setCurrentLanguage] = useState('English');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'English';
    setCurrentLanguage(savedLanguage);
  }, []);

  const cyclingTexts = [
    { text: 'Break Language Barriers', lang: 'English' },
    { text: 'Rompe las Barreras del Idioma', lang: 'Spanish' },
    { text: 'Briser les Barrières Linguistiques', lang: 'French' },
    { text: 'भाषा की बाधाओं को तोड़ें', lang: 'Hindi' },
    { text: '打破语言障碍', lang: 'Chinese' }
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % cyclingTexts?.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [cyclingTexts?.length]);

  const Logo = () => (
    <Link to="/dashboard-role-based" className="flex items-center space-x-3 focus-ring rounded-lg">
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
          <Icon name="Languages" size={28} color="white" strokeWidth={2.5} />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
          <Icon name="Sparkles" size={12} color="var(--color-accent-foreground)" strokeWidth={3} />
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">EduLingua AI</h1>
        <p className="text-sm font-caption text-muted-foreground -mt-1">Smart Translation Platform</p>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      {/* Cursor Glow Effect */}
      <CursorGlow />
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />
          
          <div className="hidden sm:flex items-center space-x-6">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Already have an account?</div>
              <button
                onClick={() => setActiveMode('login')}
                className="text-primary hover:text-primary/80 transition-smooth font-medium"
              >
                Sign in here
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Hero Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                <Icon name="Zap" size={16} className="mr-2" />
                AI-Powered Translation
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight">
                <span className="block mb-2">Transform Education</span>
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in">
                  {cyclingTexts?.[currentTextIndex]?.text}
                </span>
              </h2>
              
              <p className="text-lg text-muted-foreground max-w-2xl">
                Empower students and educators with AI-driven translation tools for text, audio, and video content. 
                Make learning accessible in any language.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="glass rounded-lg p-4 border border-border/50 hover-lift">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Icon name="FileText" size={20} className="text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-1">Text Translation</h3>
                <p className="text-sm text-muted-foreground">Instant document translation with context awareness</p>
              </div>
              
              <div className="glass rounded-lg p-4 border border-border/50 hover-lift">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mb-3">
                  <Icon name="Video" size={20} className="text-secondary" />
                </div>
                <h3 className="font-medium text-foreground mb-1">Video Subtitles</h3>
                <p className="text-sm text-muted-foreground">Auto-generate multilingual subtitles for videos</p>
              </div>
              
              <div className="glass rounded-lg p-4 border border-border/50 hover-lift">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
                  <Icon name="Headphones" size={20} className="text-accent" />
                </div>
                <h3 className="font-medium text-foreground mb-1">Audio Processing</h3>
                <p className="text-sm text-muted-foreground">Speech-to-text translation and voice synthesis</p>
              </div>
            </div>

            {/* Language Carousel */}
            <div className="hidden lg:block">
              <LanguageCarousel />
            </div>
          </div>

          {/* Right Side - Authentication Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="glass rounded-2xl p-8 border border-border/50 shadow-xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-heading font-semibold text-foreground mb-2">
                  {activeMode === 'login' ? 'Welcome Back' : 'Join EduLingua AI'}
                </h3>
                <p className="text-muted-foreground">
                  {activeMode === 'login' ?'Sign in to access your translation workspace' :'Create your account to get started'
                  }
                </p>
              </div>

              <AuthToggle activeMode={activeMode} onModeChange={setActiveMode} />

              {activeMode === 'login' ? <LoginForm /> : <RegisterForm />}

              <div className="mt-6">
                <SocialLogin />
              </div>
            </div>

            {/* Mobile Language Carousel */}
            <div className="lg:hidden mt-8">
              <LanguageCarousel />
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-6 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} />
                  <span className="text-sm">Secure & Private</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} />
                  <span className="text-sm">10K+ Educators</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Globe" size={16} />
                  <span className="text-sm">50+ Languages</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="relative z-10 p-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {new Date()?.getFullYear()} EduLingua AI. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6">
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              Terms of Service
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthenticationPage;