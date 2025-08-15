import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivityList = ({ userRole = 'educator' }) => {
  const [viewMode, setViewMode] = useState('list');

  const educatorActivity = [
    {
      id: 1,
      title: 'Spanish Literature Chapter 3',
      type: 'Text Translation',
      status: 'completed',
      time: '2 hours ago',
      icon: 'FileText',
      progress: 100,
      languages: ['English', 'Spanish'],
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      title: 'Math Tutorial Video',
      type: 'Video Subtitles',
      status: 'processing',
      time: '4 hours ago',
      icon: 'Video',
      progress: 65,
      languages: ['English', 'Hindi'],
      thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      title: 'French Pronunciation Guide',
      type: 'Audio Translation',
      status: 'completed',
      time: '1 day ago',
      icon: 'Headphones',
      progress: 100,
      languages: ['English', 'French'],
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop'
    },
    {
      id: 4,
      title: 'History Lesson Materials',
      type: 'Bulk Upload',
      status: 'updated',
      time: '2 days ago',
      icon: 'Upload',
      progress: 100,
      languages: ['English', 'Tamil', 'Telugu'],
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    }
  ];

  const studentActivity = [
    {
      id: 1,
      title: 'Physics Chapter 5 - Motion',
      type: 'Learning Resource',
      status: 'completed',
      time: '1 hour ago',
      icon: 'BookOpen',
      progress: 100,
      languages: ['Hindi', 'English'],
      thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      title: 'Chemistry Lab Video',
      type: 'Video Content',
      status: 'in-progress',
      time: '3 hours ago',
      icon: 'Play',
      progress: 45,
      languages: ['English', 'Bengali'],
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      title: 'Math Problem Solutions',
      type: 'Practice Set',
      status: 'bookmarked',
      time: '5 hours ago',
      icon: 'Calculator',
      progress: 80,
      languages: ['English', 'Gujarati'],
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=100&h=100&fit=crop'
    },
    {
      id: 4,
      title: 'Biology Audio Notes',
      type: 'Audio Content',
      status: 'downloaded',
      time: '1 day ago',
      icon: 'Download',
      progress: 100,
      languages: ['English', 'Marathi'],
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop'
    }
  ];

  const activity = userRole === 'educator' ? educatorActivity : studentActivity;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'processing': return 'text-warning';
      case 'in-progress': return 'text-warning';
      case 'updated': return 'text-secondary';
      case 'bookmarked': return 'text-accent';
      case 'downloaded': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'processing': return 'Clock';
      case 'in-progress': return 'Play';
      case 'updated': return 'RefreshCw';
      case 'bookmarked': return 'Bookmark';
      case 'downloaded': return 'Download';
      default: return 'Circle';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'completed': return 'bg-success/10';
      case 'processing': return 'bg-warning/10';
      case 'in-progress': return 'bg-warning/10';
      case 'updated': return 'bg-secondary/10';
      case 'bookmarked': return 'bg-accent/10';
      case 'downloaded': return 'bg-primary/10';
      default: return 'bg-muted/10';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-heading font-semibold text-foreground">Recent Activity</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-muted/50 rounded-lg p-1">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              iconName="List"
              className="px-3"
            />
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              iconName="Grid3x3"
              className="px-3"
            />
          </div>
          <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="right">
            View All
          </Button>
        </div>
      </div>
      <div className="glass rounded-lg border border-border/50">
        {viewMode === 'list' ? (
          <div className="divide-y divide-border/50">
            {activity?.map((item) => (
              <div key={item?.id} className="p-4 hover:bg-muted/20 transition-smooth group">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div 
                      className="w-12 h-12 rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${item?.thumbnail})` }}
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-background rounded-full flex items-center justify-center border-2 border-background">
                      <Icon name={item?.icon} size={12} className="text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground truncate group-hover:text-primary transition-smooth">
                        {item?.title}
                      </h4>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusBg(item?.status)} ${getStatusColor(item?.status)}`}>
                        <Icon name={getStatusIcon(item?.status)} size={12} className="mr-1" />
                        {item?.status?.replace('-', ' ')}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{item?.type}</span>
                      <span>•</span>
                      <span>{item?.time}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Icon name="Languages" size={12} />
                        <span>{item?.languages?.join(' → ')}</span>
                      </div>
                    </div>
                    
                    {item?.progress < 100 && (
                      <div className="mt-2">
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div 
                            className="bg-primary h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${item?.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">{item?.progress}% complete</span>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    iconName="MoreHorizontal" 
                    className="opacity-0 group-hover:opacity-100 transition-smooth"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activity?.map((item) => (
                <div key={item?.id} className="bg-background/50 rounded-lg p-4 hover:bg-muted/20 transition-smooth group">
                  <div className="relative mb-3">
                    <div 
                      className="w-full h-24 rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${item?.thumbnail})` }}
                    />
                    <div className="absolute top-2 right-2">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusBg(item?.status)} ${getStatusColor(item?.status)} backdrop-blur-sm`}>
                        <Icon name={getStatusIcon(item?.status)} size={12} className="mr-1" />
                        {item?.status?.replace('-', ' ')}
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-foreground mb-1 group-hover:text-primary transition-smooth line-clamp-1">
                    {item?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">{item?.type}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{item?.time}</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Languages" size={12} />
                      <span>{item?.languages?.length}</span>
                    </div>
                  </div>
                  
                  {item?.progress < 100 && (
                    <div className="mt-2">
                      <div className="w-full bg-muted rounded-full h-1">
                        <div 
                          className="bg-primary h-1 rounded-full transition-all duration-300"
                          style={{ width: `${item?.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivityList;