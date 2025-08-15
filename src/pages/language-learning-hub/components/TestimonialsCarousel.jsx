import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      role: "Professor of Mathematics",
      institution: "Indian Institute of Technology, Delhi",
      location: "New Delhi, India",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      quote: `EduLingua AI has revolutionized how I deliver complex mathematical concepts to my diverse student body. The platform's ability to translate advanced calculus problems into Hindi and Bengali while maintaining mathematical notation accuracy is remarkable. My students from rural backgrounds now engage more confidently with the material.`,
      metrics: {
        studentsHelped: 450,
        coursesTranslated: 12,
        languagesUsed: 3
      },
      category: "educator"
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      role: "High School Science Teacher",
      institution: "Lincoln High School",
      location: "Los Angeles, USA",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      rating: 5,
      quote: `As a teacher in a predominantly Spanish-speaking community, EduLingua AI has been a game-changer. I can now provide chemistry and physics lessons in both English and Spanish simultaneously. The video translation feature with accurate subtitles has improved my students' comprehension rates by 40%.`,
      metrics: {
        studentsHelped: 280,
        coursesTranslated: 8,
        languagesUsed: 2
      },
      category: "educator"
    },
    {
      id: 3,
      name: "Ahmed Hassan",
      role: "Computer Science Student",
      institution: "Cairo University",
      location: "Cairo, Egypt",
      avatar: "https://randomuser.me/api/portraits/men/28.jpg",
      rating: 5,
      quote: `Learning programming concepts in Arabic has always been challenging due to limited resources. EduLingua AI's text translation feature helped me understand complex algorithms and data structures by translating MIT's course materials into Arabic. The technical accuracy is impressive.`,
      metrics: {
        coursesCompleted: 15,
        hoursLearned: 240,
        skillsAcquired: 8
      },
      category: "student"
    },
    {
      id: 4,
      name: "Prof. Jean-Claude Dubois",
      role: "Director of International Studies",
      institution: "Sorbonne University",
      location: "Paris, France",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      rating: 5,
      quote: `Our international exchange program needed a solution to make French literature accessible to students from various linguistic backgrounds. EduLingua AI's nuanced translation of classical French texts into multiple languages while preserving literary context has been exceptional.`,
      metrics: {
        studentsHelped: 320,
        coursesTranslated: 25,
        languagesUsed: 6
      },
      category: "educator"
    },
    {
      id: 5,
      name: "Yuki Tanaka",
      role: "Medical Student",
      institution: "Tokyo Medical University",
      location: "Tokyo, Japan",
      avatar: "https://randomuser.me/api/portraits/women/26.jpg",
      rating: 5,
      quote: `Studying medical terminology in English while being a native Japanese speaker was overwhelming. EduLingua AI's audio translation feature helped me understand complex medical lectures by providing real-time Japanese translations. My exam scores improved significantly.`,
      metrics: {
        coursesCompleted: 22,
        hoursLearned: 380,
        skillsAcquired: 12
      },
      category: "student"
    },
    {
      id: 6,
      name: "Dr. Sarah Mitchell",
      role: "Dean of Education",
      institution: "University of Melbourne",
      location: "Melbourne, Australia",
      avatar: "https://randomuser.me/api/portraits/women/48.jpg",
      rating: 5,
      quote: `Implementing EduLingua AI across our multicultural campus has transformed our approach to inclusive education. The platform's ability to handle Australian English nuances while translating into Mandarin, Hindi, and Arabic has made our courses accessible to international students from day one.`,
      metrics: {
        studentsHelped: 1200,
        coursesTranslated: 45,
        languagesUsed: 8
      },
      category: "educator"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials?.length]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials?.length);
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials?.[currentIndex];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        color={i < rating ? "var(--color-warning)" : "var(--color-muted-foreground)"}
        className={i < rating ? "fill-current" : ""}
      />
    ));
  };

  const getCategoryIcon = (category) => {
    return category === 'educator' ? 'GraduationCap' : 'BookOpen';
  };

  const getCategoryColor = (category) => {
    return category === 'educator' ? 'primary' : 'secondary';
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-heading font-semibold text-foreground mb-4">
          Success Stories from Our Community
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Hear from educators and students worldwide who are transforming education 
          through AI-powered translation technology.
        </p>
      </div>
      <div className="relative">
        {/* Main Testimonial Card */}
        <div className="glass rounded-2xl p-8 border border-border/50 min-h-96">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* User Info */}
            <div className="lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="relative mb-4">
                <Image
                  src={currentTestimonial?.avatar}
                  alt={currentTestimonial?.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className={`absolute -bottom-2 -right-2 w-8 h-8 bg-${getCategoryColor(currentTestimonial?.category)}/10 rounded-full flex items-center justify-center border-2 border-background`}>
                  <Icon 
                    name={getCategoryIcon(currentTestimonial?.category)} 
                    size={16} 
                    color={`var(--color-${getCategoryColor(currentTestimonial?.category)})`} 
                  />
                </div>
              </div>

              <h4 className="font-heading font-semibold text-foreground text-lg mb-1">
                {currentTestimonial?.name}
              </h4>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {currentTestimonial?.role}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                {currentTestimonial?.institution}
              </p>
              <p className="text-xs text-muted-foreground mb-4 flex items-center">
                <Icon name="MapPin" size={12} className="mr-1" />
                {currentTestimonial?.location}
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {renderStars(currentTestimonial?.rating)}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 w-full">
                {Object.entries(currentTestimonial?.metrics)?.map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-lg font-heading font-semibold text-primary">
                      {typeof value === 'number' ? value?.toLocaleString() : value}
                    </div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className="lg:w-2/3 flex flex-col justify-center">
              <div className="relative">
                <Icon 
                  name="Quote" 
                  size={32} 
                  className="text-primary/20 absolute -top-4 -left-2" 
                />
                <blockquote className="text-foreground leading-relaxed text-lg pl-8">
                  "{currentTestimonial?.quote}"
                </blockquote>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs bg-${getCategoryColor(currentTestimonial?.category)}/10 text-${getCategoryColor(currentTestimonial?.category)}`}>
                  <Icon name={getCategoryIcon(currentTestimonial?.category)} size={12} className="mr-1" />
                  {currentTestimonial?.category === 'educator' ? 'Educator' : 'Student'}
                </div>

                <div className="text-xs text-muted-foreground">
                  Verified testimonial • {new Date()?.getFullYear()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            iconName="ChevronLeft"
            className="w-10 h-10 rounded-full"
          >
            <span className="sr-only">Previous testimonial</span>
          </Button>

          {/* Dots Indicator */}
          <div className="flex items-center space-x-2">
            {testimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary w-8' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              >
                <span className="sr-only">Go to testimonial {index + 1}</span>
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            iconName="ChevronRight"
            className="w-10 h-10 rounded-full"
          >
            <span className="sr-only">Next testimonial</span>
          </Button>
        </div>

        {/* Auto-play Control */}
        <div className="flex items-center justify-center mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            iconName={isAutoPlaying ? "Pause" : "Play"}
            className="text-xs"
          >
            {isAutoPlaying ? 'Pause' : 'Resume'} Auto-play
          </Button>
        </div>
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        <div className="text-center p-4 glass rounded-lg border border-border/50">
          <div className="text-2xl font-heading font-semibold text-primary mb-1">98%</div>
          <div className="text-xs text-muted-foreground">Satisfaction Rate</div>
        </div>
        <div className="text-center p-4 glass rounded-lg border border-border/50">
          <div className="text-2xl font-heading font-semibold text-secondary mb-1">2.4K+</div>
          <div className="text-xs text-muted-foreground">Happy Users</div>
        </div>
        <div className="text-center p-4 glass rounded-lg border border-border/50">
          <div className="text-2xl font-heading font-semibold text-accent mb-1">127</div>
          <div className="text-xs text-muted-foreground">Countries Served</div>
        </div>
        <div className="text-center p-4 glass rounded-lg border border-border/50">
          <div className="text-2xl font-heading font-semibold text-success mb-1">4.9/5</div>
          <div className="text-xs text-muted-foreground">Average Rating</div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;