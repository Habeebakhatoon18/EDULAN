import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsGrid = ({ userRole = 'educator' }) => {
  const educatorActions = [
    {
      title: 'Text Translation',
      description: 'Translate documents and text content with AI assistance',
      path: '/text-translation-workspace',
      icon: 'FileText',
      color: 'primary',
      stats: '24 documents processed',
      action: 'Start Translating',
      gradient: 'from-red-100 to-pink-100'
    },
    {
      title: 'Video Studio',
      description: 'Create subtitles and translate video content',
      path: '/video-translation-studio',
      icon: 'Video',
      color: 'secondary',
      stats: '8 videos completed',
      action: 'Open Studio',
      gradient: 'from-green-100 to-emerald-100'
    },
    {
      title: 'Audio Lab',
      description: 'Process audio files and generate translations',
      path: '/audio-translation-lab',
      icon: 'Headphones',
      color: 'accent',
      stats: '12 audio files',
      action: 'Launch Lab',
      gradient: 'from-yellow-100 to-orange-100'
    },
    {
      title: 'Bulk Upload',
      description: 'Upload multiple files for batch translation',
      path: '/text-translation-workspace',
      icon: 'Upload',
      color: 'success',
      stats: '5 batches pending',
      action: 'Upload Files',
      gradient: 'from-blue-100 to-cyan-100'
    }
  ];

  const studentActions = [
    {
      title: 'Learning Hub',
      description: 'Access translated materials and learning resources',
      path: '/language-learning-hub',
      icon: 'GraduationCap',
      color: 'primary',
      stats: '156 resources available',
      action: 'Explore Hub',
      gradient: 'from-purple-100 to-indigo-100'
    },
    {
      title: 'My Progress',
      description: 'Track your learning journey and achievements',
      path: '/language-learning-hub',
      icon: 'TrendingUp',
      color: 'success',
      stats: '12 lessons completed',
      action: 'View Progress',
      gradient: 'from-green-100 to-teal-100'
    },
    {
      title: 'Quick Translate',
      description: 'Translate text quickly for instant understanding',
      path: '/text-translation-workspace',
      icon: 'Zap',
      color: 'accent',
      stats: 'Instant results',
      action: 'Translate Now',
      gradient: 'from-yellow-100 to-amber-100'
    },
    {
      title: 'Saved Content',
      description: 'Access your bookmarked and downloaded materials',
      path: '/language-learning-hub',
      icon: 'Bookmark',
      color: 'secondary',
      stats: '23 items saved',
      action: 'View Saved',
      gradient: 'from-pink-100 to-rose-100'
    }
  ];

  const actions = userRole === 'educator' ? educatorActions : studentActions;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-heading font-semibold text-foreground">Quick Actions</h3>
        <Button variant="ghost" size="sm" iconName="Grid3x3" iconPosition="left">
          Customize
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions?.map((action, index) => (
          <Link key={index} to={action?.path} className="group">
            <div className={`glass rounded-lg p-6 border border-border/50 hover-lift transition-smooth bg-gradient-to-br ${action?.gradient}`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-${action?.color}/20 flex items-center justify-center group-hover:scale-110 transition-smooth`}>
                  <Icon name={action?.icon} size={24} color={`var(--color-${action?.color})`} />
                </div>
                <Icon 
                  name="ArrowUpRight" 
                  size={16} 
                  className="text-muted-foreground group-hover:text-foreground group-hover:scale-110 transition-smooth" 
                />
              </div>
              
              <h4 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-smooth">
                {action?.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {action?.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">{action?.stats}</span>
                <Button variant="ghost" size="sm" className="text-xs opacity-0 group-hover:opacity-100 transition-smooth">
                  {action?.action}
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsGrid;