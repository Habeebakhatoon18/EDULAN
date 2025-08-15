import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const StatsDashboard = () => {
  const [animatedStats, setAnimatedStats] = useState({
    contentTranslated: 0,
    languagesSupported: 0,
    studentsReached: 0,
    institutionsServed: 0,
    accuracyRate: 0,
    processingSpeed: 0
  });

  const finalStats = {
    contentTranslated: 2847,
    languagesSupported: 127,
    studentsReached: 89432,
    institutionsServed: 1256,
    accuracyRate: 99.2,
    processingSpeed: 0.8
  };

  const statsConfig = [
    {
      key: 'contentTranslated',
      label: 'Content Pieces Translated',
      suffix: 'K+',
      icon: 'FileText',
      color: 'primary',
      description: 'Documents, videos, and audio files processed'
    },
    {
      key: 'languagesSupported',
      label: 'Languages Supported',
      suffix: '+',
      icon: 'Globe',
      color: 'secondary',
      description: 'Including regional dialects and scripts'
    },
    {
      key: 'studentsReached',
      label: 'Students Reached',
      suffix: 'K+',
      icon: 'Users',
      color: 'accent',
      description: 'Learners accessing translated content'
    },
    {
      key: 'institutionsServed',
      label: 'Educational Institutions',
      suffix: '+',
      icon: 'School',
      color: 'success',
      description: 'Schools, colleges, and universities'
    },
    {
      key: 'accuracyRate',
      label: 'Translation Accuracy',
      suffix: '%',
      icon: 'Target',
      color: 'warning',
      description: 'AI-powered precision rate'
    },
    {
      key: 'processingSpeed',
      label: 'Average Processing Speed',
      suffix: 's',
      icon: 'Zap',
      color: 'error',
      description: 'Per page of content'
    }
  ];

  useEffect(() => {
    const animationDuration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const stepDuration = animationDuration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4); // Easing function

      setAnimatedStats({
        contentTranslated: Math.floor(finalStats?.contentTranslated * easeOutQuart),
        languagesSupported: Math.floor(finalStats?.languagesSupported * easeOutQuart),
        studentsReached: Math.floor(finalStats?.studentsReached * easeOutQuart),
        institutionsServed: Math.floor(finalStats?.institutionsServed * easeOutQuart),
        accuracyRate: Math.floor(finalStats?.accuracyRate * easeOutQuart * 10) / 10,
        processingSpeed: Math.floor(finalStats?.processingSpeed * easeOutQuart * 10) / 10
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedStats(finalStats);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num, key) => {
    if (key === 'contentTranslated' || key === 'studentsReached') {
      return (num / 1000)?.toFixed(1);
    }
    return num?.toString();
  };

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'text-primary bg-primary/10 border-primary/20',
      secondary: 'text-secondary bg-secondary/10 border-secondary/20',
      accent: 'text-accent bg-accent/10 border-accent/20',
      success: 'text-success bg-success/10 border-success/20',
      warning: 'text-warning bg-warning/10 border-warning/20',
      error: 'text-error bg-error/10 border-error/20'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-heading font-semibold text-foreground mb-4">
          Platform Impact Statistics
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real-time metrics showcasing the global reach and effectiveness of our AI-powered 
          educational translation platform across diverse learning communities.
        </p>
      </div>
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {statsConfig?.map((stat, index) => (
          <div
            key={stat?.key}
            className="glass rounded-xl p-6 border border-border/50 hover-lift group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${getColorClasses(stat?.color)}`}>
                <Icon name={stat?.icon} size={24} color={`var(--color-${stat?.color})`} />
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  Live Data
                </div>
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-gentle mt-1 ml-auto"></div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-baseline space-x-1">
                <span className={`text-3xl font-heading font-bold text-${stat?.color}`}>
                  {formatNumber(animatedStats?.[stat?.key], stat?.key)}
                </span>
                <span className={`text-lg font-medium text-${stat?.color}`}>
                  {stat?.suffix}
                </span>
              </div>
            </div>

            <div className="mb-3">
              <h4 className="font-medium text-foreground text-sm leading-tight">
                {stat?.label}
              </h4>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {stat?.description}
            </p>

            {/* Progress indicator for animated stats */}
            <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full bg-${stat?.color} rounded-full transition-all duration-100`}
                style={{
                  width: `${(animatedStats?.[stat?.key] / finalStats?.[stat?.key]) * 100}%`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      {/* Additional Metrics */}
      <div className="glass rounded-xl p-8 border border-border/50">
        <h4 className="text-xl font-heading font-semibold text-foreground mb-6 text-center">
          Performance Metrics
        </h4>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Clock" size={24} color="var(--color-primary)" />
            </div>
            <div className="text-2xl font-heading font-semibold text-foreground mb-1">24/7</div>
            <div className="text-sm text-muted-foreground">Uptime Availability</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Shield" size={24} color="var(--color-secondary)" />
            </div>
            <div className="text-2xl font-heading font-semibold text-foreground mb-1">100%</div>
            <div className="text-sm text-muted-foreground">Data Security</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Smartphone" size={24} color="var(--color-accent)" />
            </div>
            <div className="text-2xl font-heading font-semibold text-foreground mb-1">95%</div>
            <div className="text-sm text-muted-foreground">Mobile Usage</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="TrendingUp" size={24} color="var(--color-success)" />
            </div>
            <div className="text-2xl font-heading font-semibold text-foreground mb-1">+127%</div>
            <div className="text-sm text-muted-foreground">Growth Rate</div>
          </div>
        </div>
      </div>
      {/* Real-time Updates Indicator */}
      <div className="flex items-center justify-center space-x-2 mt-8 text-sm text-muted-foreground">
        <div className="w-2 h-2 bg-success rounded-full animate-pulse-gentle"></div>
        <span>Statistics updated in real-time</span>
        <span>•</span>
        <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default StatsDashboard;