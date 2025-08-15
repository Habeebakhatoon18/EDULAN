import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingActionButton = ({ userRole = 'educator' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const educatorActions = [
    {
      label: 'Translate Text',
      path: '/text-translation-workspace',
      icon: 'FileText',
      color: 'primary',
      description: 'Quick text translation'
    },
    {
      label: 'Upload Video',
      path: '/video-translation-studio',
      icon: 'Video',
      color: 'secondary',
      description: 'Add video content'
    },
    {
      label: 'Audio Lab',
      path: '/audio-translation-lab',
      icon: 'Headphones',
      color: 'accent',
      description: 'Process audio files'
    }
  ];

  const studentActions = [
    {
      label: 'Quick Translate',
      path: '/text-translation-workspace',
      icon: 'Zap',
      color: 'primary',
      description: 'Instant translation'
    },
    {
      label: 'Browse Resources',
      path: '/language-learning-hub',
      icon: 'Search',
      color: 'secondary',
      description: 'Find learning materials'
    },
    {
      label: 'My Progress',
      path: '/language-learning-hub',
      icon: 'TrendingUp',
      color: 'success',
      description: 'View achievements'
    }
  ];

  const actions = userRole === 'educator' ? educatorActions : studentActions;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Expanded Actions */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-scale-in">
          {actions?.map((action, index) => (
            <Link
              key={index}
              to={action?.path}
              onClick={() => setIsExpanded(false)}
              className="group flex items-center space-x-3 glass rounded-full pl-4 pr-6 py-3 border border-border/50 hover-lift transition-smooth"
            >
              <div className={`w-10 h-10 rounded-full bg-${action?.color}/20 flex items-center justify-center group-hover:scale-110 transition-smooth`}>
                <Icon name={action?.icon} size={18} color={`var(--color-${action?.color})`} />
              </div>
              <div className="text-left">
                <div className="font-medium text-foreground text-sm group-hover:text-primary transition-smooth">
                  {action?.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {action?.description}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {/* Main FAB */}
      <Button
        variant="default"
        size="lg"
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 ${
          isExpanded ? 'rotate-45' : 'hover:scale-110'
        }`}
        iconName={isExpanded ? 'X' : 'Plus'}
        iconSize={24}
      >
        <span className="sr-only">Quick actions menu</span>
      </Button>
      {/* Backdrop */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default FloatingActionButton;