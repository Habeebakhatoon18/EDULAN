import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CallToActionSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e?.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  const features = [
    {
      icon: 'Zap',
      title: 'Instant Translation',
      description: 'Get started in seconds with our AI-powered platform'
    },
    {
      icon: 'Shield',
      title: 'Secure & Private',
      description: 'Your educational content is protected with enterprise-grade security'
    },
    {
      icon: 'Users',
      title: 'Collaborative',
      description: 'Work with your team and students in real-time'
    },
    {
      icon: 'Globe',
      title: '100+ Languages',
      description: 'Support for major world languages and regional dialects'
    }
  ];

  const pricingPlans = [
    {
      name: 'Educator',
      price: 'Free',
      period: 'forever',
      description: 'Perfect for individual teachers',
      features: [
        '10 documents per month',
        '2 video translations',
        'Basic language support',
        'Community support'
      ],
      cta: 'Start Free',
      popular: false
    },
    {
      name: 'Professional',
      price: '$29',
      period: 'per month',
      description: 'For serious educators and small teams',
      features: [
        'Unlimited documents',
        '50 video translations',
        'All languages supported',
        'Priority support',
        'Advanced analytics',
        'API access'
      ],
      cta: 'Start Trial',
      popular: true
    },
    {
      name: 'Institution',
      price: 'Custom',
      period: 'pricing',
      description: 'For schools and universities',
      features: [
        'Everything in Professional',
        'Unlimited team members',
        'Custom integrations',
        'Dedicated support',
        'Training sessions',
        'SLA guarantee'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="w-full">
      {/* Hero CTA Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse-gentle"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse-gentle"></div>

        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Break Language Barriers in
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Education Today
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Join over 89,000 students and 1,200+ institutions using EduLingua AI to make 
              education accessible in every language. Start your free trial today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/authentication-login-register">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Rocket"
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Start Free Trial
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Watch 2-min Demo
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features?.map((feature, index) => (
              <div key={index} className="glass rounded-lg p-6 text-center border border-border/50 hover-lift">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name={feature?.icon} size={24} color="var(--color-primary)" />
                </div>
                <h4 className="font-heading font-semibold text-foreground mb-2">
                  {feature?.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {feature?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Pricing Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-heading font-semibold text-foreground mb-4">
            Choose Your Plan
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start free and scale as you grow. All plans include our core translation features 
            with varying limits and support levels.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingPlans?.map((plan, index) => (
            <div
              key={index}
              className={`relative glass rounded-2xl p-8 border ${
                plan?.popular
                  ? 'border-primary/50 bg-primary/5' :'border-border/50'
              } hover-lift`}
            >
              {plan?.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h4 className="text-xl font-heading font-semibold text-foreground mb-2">
                  {plan?.name}
                </h4>
                <div className="mb-2">
                  <span className="text-3xl font-heading font-bold text-foreground">
                    {plan?.price}
                  </span>
                  {plan?.period && (
                    <span className="text-muted-foreground ml-1">
                      /{plan?.period}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {plan?.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan?.features?.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Icon 
                      name="CheckCircle" 
                      size={16} 
                      color="var(--color-success)" 
                      className="mt-0.5 flex-shrink-0" 
                    />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/authentication-login-register" className="block">
                <Button
                  variant={plan?.popular ? "default" : "outline"}
                  fullWidth
                  size="lg"
                >
                  {plan?.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* Newsletter Signup */}
      <div className="bg-muted/20 border-t border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h3 className="text-2xl font-heading font-semibold text-foreground mb-4">
            Stay Updated with EduLingua AI
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get the latest updates on new features, language support, and educational 
            resources delivered to your inbox.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
              <div className="flex space-x-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  required
                  className="flex-1"
                />
                <Button
                  type="submit"
                  variant="default"
                  loading={isLoading}
                  iconName="Send"
                  iconPosition="right"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                No spam, unsubscribe at any time. Read our privacy policy.
              </p>
            </form>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-2 text-success mb-4">
                <Icon name="CheckCircle" size={24} />
                <span className="font-medium">Successfully subscribed!</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Thank you for subscribing. You'll receive our latest updates soon.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Final CTA */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="glass rounded-2xl p-12 text-center border border-border/50">
          <h3 className="text-3xl font-heading font-semibold text-foreground mb-4">
            Ready to Transform Education?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the global movement making education accessible to everyone, 
            regardless of language barriers.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <Link to="/authentication-login-register">
              <Button
                variant="default"
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                Get Started Now
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="lg"
              iconName="MessageCircle"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Talk to Sales
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} />
              <span>89K+ Students</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="School" size={16} />
              <span>1.2K+ Institutions</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={16} />
              <span>127 Countries</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionSection;