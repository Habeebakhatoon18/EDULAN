import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import InteractiveIndiaMap from './components/InteractiveIndiaMap';
import LanguageCarousel from './components/LanguageCarousel';
import LiveTranslationDemo from './components/LiveTranslationDemo';
import ComparisonSlider from './components/ComparisonSlider';
import VideoPlayerDemo from './components/VideoPlayerDemo';
import StatsDashboard from './components/StatsDashboard';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import FeatureHighlights from './components/FeatureHighlights';
import CallToActionSection from './components/CallToActionSection';

const LanguageLearningHub = () => {
  useEffect(() => {
    // Smooth scroll behavior for the page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Language Learning Hub - EduLingua AI | Break Language Barriers in Education</title>
        <meta 
          name="description" 
          content="Discover EduLingua AI's powerful translation platform. Interactive demos, real-time translation, and comprehensive tools for multilingual education. Join 89K+ students worldwide." 
        />
        <meta name="keywords" content="language learning, AI translation, educational technology, multilingual education, real-time translation" />
        <meta property="og:title" content="Language Learning Hub - EduLingua AI" />
        <meta property="og:description" content="Transform education with AI-powered translation. Interactive demos and comprehensive multilingual learning tools." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <main className="pt-16">
        {/* Hero Section with Interactive India Map */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
                Discover the Power of
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                  AI Translation
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Experience how EduLingua AI transforms educational content across languages and cultures. 
                Explore interactive demonstrations of our cutting-edge translation technology.
              </p>
            </div>
            <InteractiveIndiaMap />
          </div>
        </section>

        {/* Language Carousel Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <LanguageCarousel />
          </div>
        </section>

        {/* Live Translation Demo Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <LiveTranslationDemo />
          </div>
        </section>

        {/* Before/After Comparison Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <ComparisonSlider />
          </div>
        </section>

        {/* Video Player Demo Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <VideoPlayerDemo />
          </div>
        </section>

        {/* Statistics Dashboard Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <StatsDashboard />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <TestimonialsCarousel />
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <FeatureHighlights />
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="px-4 sm:px-6 lg:px-8">
          <CallToActionSection />
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-heading font-semibold mb-4">EduLingua AI</h4>
              <p className="text-sm text-background/70 mb-4">
                Breaking language barriers in education through AI-powered translation technology.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-background/70 hover:text-background transition-smooth">
                  <span className="sr-only">Twitter</span>
                  🐦
                </a>
                <a href="#" className="text-background/70 hover:text-background transition-smooth">
                  <span className="sr-only">LinkedIn</span>
                  💼
                </a>
                <a href="#" className="text-background/70 hover:text-background transition-smooth">
                  <span className="sr-only">GitHub</span>
                  🐙
                </a>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium mb-4">Product</h5>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-background transition-smooth">Features</a></li>
                <li><a href="#" className="hover:text-background transition-smooth">Pricing</a></li>
                <li><a href="#" className="hover:text-background transition-smooth">API</a></li>
                <li><a href="#" className="hover:text-background transition-smooth">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium mb-4">Resources</h5>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-background transition-smooth">Documentation</a></li>
                <li><a href="#" className="hover:text-background transition-smooth">Help Center</a></li>
                <li><a href="#" className="hover:text-background transition-smooth">Blog</a></li>
                <li><a href="#" className="hover:text-background transition-smooth">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-background transition-smooth">About</a></li>
                <li><a href="#" className="hover:text-background transition-smooth">Careers</a></li>
                <li><a href="#" className="hover:text-background transition-smooth">Privacy</a></li>
                <li><a href="#" className="hover:text-background transition-smooth">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 pt-8 text-center text-sm text-background/70">
            <p>&copy; {new Date()?.getFullYear()} EduLingua AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LanguageLearningHub;