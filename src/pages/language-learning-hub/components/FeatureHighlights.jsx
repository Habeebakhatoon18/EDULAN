import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeatureHighlights = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 'bulk-translation',
      title: 'Bulk Translation Tools',
      description: 'Process multiple documents, videos, and audio files simultaneously with our advanced batch processing system.',
      icon: 'Layers',
      color: 'primary',
      details: [
        'Upload up to 100 files at once',
        'Support for PDF, DOCX, MP4, MP3 formats',
        'Automated quality assurance checks',
        'Progress tracking and notifications',
        'Bulk download of translated content'
      ],
      metrics: {
        efficiency: '10x faster',
        capacity: '100 files',
        formats: '15+ supported'
      },
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop'
    },
    {
      id: 'offline-access',
      title: 'Offline Access & Sync',
      description: 'Download translated content for offline use and sync seamlessly when connection is restored.',
      icon: 'Download',
      color: 'secondary',
      details: [
        'Download entire courses for offline study',
        'Smart sync when back online',
        'Compressed file formats to save space',
        'Offline progress tracking',
        'Background sync capabilities'
      ],
      metrics: {
        storage: '90% compression',
        sync: 'Auto-sync',
        availability: '24/7 access'
      },
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop'
    },
    {
      id: 'api-integration',
      title: 'API Integration',
      description: 'Seamlessly integrate our translation capabilities into your existing educational platforms and systems.',
      icon: 'Code',
      color: 'accent',
      details: [
        'RESTful API with comprehensive documentation',
        'SDKs for popular programming languages',
        'Webhook support for real-time updates',
        'Rate limiting and usage analytics',
        'Enterprise-grade security and authentication'
      ],
      metrics: {
        uptime: '99.9% SLA',
        response: '<200ms',
        security: 'SOC 2 compliant'
      },
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop'
    },
    {
      id: 'quality-assurance',
      title: 'Quality Assurance',
      description: 'Advanced AI models with human review ensure the highest translation accuracy for educational content.',
      icon: 'Shield',
      color: 'success',
      details: [
        'Multi-layer AI validation system',
        'Subject matter expert review',
        'Context-aware translation algorithms',
        'Continuous learning from feedback',
        'Quality scoring and improvement suggestions'
      ],
      metrics: {
        accuracy: '99.2% average',
        review: 'Human verified',
        improvement: 'Continuous learning'
      },
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop'
    },
    {
      id: 'collaboration',
      title: 'Team Collaboration',
      description: 'Work together with colleagues and students on translation projects with real-time collaboration features.',
      icon: 'Users',
      color: 'warning',
      details: [
        'Real-time collaborative editing',
        'Comment and suggestion system',
        'Role-based access control',
        'Version history and rollback',
        'Team workspace management'
      ],
      metrics: {
        users: 'Unlimited team size',
        sync: 'Real-time updates',
        versions: 'Full history'
      },
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop'
    },
    {
      id: 'analytics',
      title: 'Advanced Analytics',
      description: 'Comprehensive insights into translation usage, student engagement, and content performance.',
      icon: 'BarChart3',
      color: 'error',
      details: [
        'Detailed usage analytics and reports',
        'Student engagement metrics',
        'Translation quality insights',
        'Performance optimization suggestions',
        'Custom dashboard creation'
      ],
      metrics: {
        insights: '50+ metrics',
        reports: 'Custom dashboards',
        export: 'Multiple formats'
      },
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop'
    }
  ];

  const currentFeature = features?.[activeFeature];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-heading font-semibold text-foreground mb-4">
          Powerful Features for Modern Education
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover the comprehensive suite of tools designed to make educational 
          content accessible across languages and cultures.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Feature Navigation */}
        <div className="lg:col-span-1">
          <div className="space-y-2">
            {features?.map((feature, index) => (
              <button
                key={feature?.id}
                onClick={() => setActiveFeature(index)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                  activeFeature === index
                    ? `bg-${feature?.color}/10 border border-${feature?.color}/20`
                    : 'glass border border-border/50 hover:bg-muted/30'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activeFeature === index
                      ? `bg-${feature?.color}/20`
                      : 'bg-muted'
                  }`}>
                    <Icon 
                      name={feature?.icon} 
                      size={20} 
                      color={activeFeature === index ? `var(--color-${feature?.color})` : 'var(--color-muted-foreground)'} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium text-sm ${
                      activeFeature === index ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {feature?.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {feature?.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Feature Details */}
        <div className="lg:col-span-2">
          <div className="glass rounded-2xl overflow-hidden border border-border/50">
            {/* Feature Header */}
            <div className={`bg-${currentFeature?.color}/5 p-6 border-b border-border/50`}>
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-16 h-16 rounded-xl bg-${currentFeature?.color}/10 flex items-center justify-center`}>
                  <Icon 
                    name={currentFeature?.icon} 
                    size={32} 
                    color={`var(--color-${currentFeature?.color})`} 
                  />
                </div>
                <div>
                  <h4 className="text-xl font-heading font-semibold text-foreground mb-1">
                    {currentFeature?.title}
                  </h4>
                  <p className="text-muted-foreground">
                    {currentFeature?.description}
                  </p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(currentFeature?.metrics)?.map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className={`text-lg font-heading font-semibold text-${currentFeature?.color}`}>
                      {value}
                    </div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {key}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Content */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Feature List */}
                <div>
                  <h5 className="font-medium text-foreground mb-4">Key Capabilities</h5>
                  <ul className="space-y-3">
                    {currentFeature?.details?.map((detail, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Icon 
                          name="CheckCircle" 
                          size={16} 
                          color={`var(--color-${currentFeature?.color})`} 
                          className="mt-0.5 flex-shrink-0" 
                        />
                        <span className="text-sm text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Feature Image */}
                <div className="relative">
                  <img
                    src={currentFeature?.image}
                    alt={currentFeature?.title}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 mt-6 pt-6 border-t border-border/50">
                <Button
                  variant="default"
                  iconName="ExternalLink"
                  iconPosition="right"
                >
                  Learn More
                </Button>
                <Button
                  variant="outline"
                  iconName="Play"
                  iconPosition="left"
                >
                  Watch Demo
                </Button>
                <Button
                  variant="ghost"
                  iconName="FileText"
                  iconPosition="left"
                >
                  Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <div className="glass rounded-xl p-8 border border-border/50">
          <h4 className="text-xl font-heading font-semibold text-foreground mb-2">
            Ready to Transform Your Educational Content?
          </h4>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of educators worldwide who are breaking language barriers 
            and making education accessible to everyone.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="default"
              size="lg"
              iconName="Rocket"
              iconPosition="left"
            >
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Calendar"
              iconPosition="left"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlights;