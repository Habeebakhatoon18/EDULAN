import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ userRole = 'educator', userName = 'John' }) => {
  const stats = {
    educator: [
      { value: 24, label: 'Projects', icon: 'FolderOpen', color: 'primary' },
      { value: 156, label: 'Resources', icon: 'BookOpen', color: 'secondary' },
      { value: 8, label: 'Languages', icon: 'Languages', color: 'accent' }
    ],
    student: [
      { value: 12, label: 'Completed', icon: 'CheckCircle', color: 'success' },
      { value: 5, label: 'In Progress', icon: 'Clock', color: 'warning' },
      { value: 3, label: 'Languages', icon: 'Globe', color: 'accent' }
    ]
  };

  const welcomeMessages = {
    educator: 'Ready to create multilingual educational content?',
    student: 'Continue your language learning journey today.'
  };

  return (
    <div className="glass rounded-lg p-6 border border-border/50 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-6 lg:mb-0">
          <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-2">
            Welcome back, {userName}! 👋
          </h2>
          <p className="text-muted-foreground text-lg">
            {welcomeMessages?.[userRole]}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-6 lg:gap-8">
          {stats?.[userRole]?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className={`w-12 h-12 rounded-lg bg-${stat?.color}/10 flex items-center justify-center mr-3`}>
                  <Icon name={stat?.icon} size={20} color={`var(--color-${stat?.color})`} />
                </div>
                <div className={`text-3xl font-heading font-semibold text-${stat?.color}`}>
                  {stat?.value}
                </div>
              </div>
              <div className="text-sm text-muted-foreground font-medium">{stat?.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;