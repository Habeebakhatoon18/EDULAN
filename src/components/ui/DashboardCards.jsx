import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const DashboardCards = ({ userRole = 'educator' }) => {
  const quickActions = [
    {
      title: 'Text Translation',
      description: 'Translate documents and text content with AI assistance',
      path: '/text-translation-workspace',
      icon: 'FileText',
      color: 'primary',
      stats: '24 documents processed',
      action: 'Start Translating'
    },
    {
      title: 'Video Studio',
      description: 'Create subtitles and translate video content',
      path: '/video-translation-studio',
      icon: 'Video',
      color: 'secondary',
      stats: '8 videos completed',
      action: 'Open Studio'
    },
    {
      title: 'Audio Lab',
      description: 'Process audio files and generate translations',
      path: '/audio-translation-lab',
      icon: 'Headphones',
      color: 'accent',
      stats: '12 audio files',
      action: 'Launch Lab'
    },
    {
      title: 'Learning Hub',
      description: 'Access translated materials and learning resources',
      path: '/language-learning-hub',
      icon: 'GraduationCap',
      color: 'success',
      stats: '156 resources available',
      action: 'Explore Hub'
    }
  ];

  const recentActivity = [
    {
      title: 'Spanish Literature Chapter 3',
      type: 'Text Translation',
      status: 'completed',
      time: '2 hours ago',
      icon: 'FileText'
    },
    {
      title: 'Math Tutorial Video',
      type: 'Video Subtitles',
      status: 'processing',
      time: '4 hours ago',
      icon: 'Video'
    },
    {
      title: 'French Pronunciation Guide',
      type: 'Audio Translation',
      status: 'completed',
      time: '1 day ago',
      icon: 'Headphones'
    },
    {
      title: 'History Lesson Materials',
      type: 'Learning Resources',
      status: 'updated',
      time: '2 days ago',
      icon: 'GraduationCap'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'processing': return 'text-warning';
      case 'updated': return 'text-secondary';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'processing': return 'Clock';
      case 'updated': return 'RefreshCw';
      default: return 'Circle';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="glass rounded-lg p-6 border border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
              Welcome back, John! 👋
            </h2>
            <p className="text-muted-foreground">
              {userRole === 'educator' ?'Ready to create multilingual educational content?' :'Continue your language learning journey today.'
              }
            </p>
          </div>
          <div className="hidden sm:flex items-center space-x-4 text-center">
            <div>
              <div className="text-2xl font-heading font-semibold text-primary">24</div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </div>
            <div>
              <div className="text-2xl font-heading font-semibold text-secondary">156</div>
              <div className="text-xs text-muted-foreground">Resources</div>
            </div>
            <div>
              <div className="text-2xl font-heading font-semibold text-accent">8</div>
              <div className="text-xs text-muted-foreground">Languages</div>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions Grid */}
      <div>
        <h3 className="text-lg font-heading font-medium text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions?.map((action, index) => (
            <div key={index} className="glass rounded-lg p-6 border border-border/50 hover-lift group">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-${action?.color}/10 flex items-center justify-center group-hover:scale-110 transition-smooth`}>
                  <Icon name={action?.icon} size={24} color={`var(--color-${action?.color})`} />
                </div>
                <Icon name="ArrowUpRight" size={16} className="text-muted-foreground group-hover:text-foreground transition-smooth" />
              </div>
              
              <h4 className="font-heading font-medium text-foreground mb-2">{action?.title}</h4>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{action?.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{action?.stats}</span>
                <Link to={action?.path}>
                  <Button variant="ghost" size="sm" className="text-xs">
                    {action?.action}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-medium text-foreground">Recent Activity</h3>
          <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="right">
            View All
          </Button>
        </div>
        
        <div className="glass rounded-lg border border-border/50">
          <div className="divide-y divide-border/50">
            {recentActivity?.map((item, index) => (
              <div key={index} className="p-4 hover:bg-muted/30 transition-smooth">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Icon name={item?.icon} size={18} className="text-muted-foreground" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-foreground truncate">{item?.title}</h4>
                      <Icon 
                        name={getStatusIcon(item?.status)} 
                        size={14} 
                        className={getStatusColor(item?.status)}
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-muted-foreground">{item?.type}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{item?.time}</span>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" iconName="MoreHorizontal" className="opacity-0 group-hover:opacity-100 transition-smooth">
                    <span className="sr-only">More options</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;