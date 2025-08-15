import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({ userRole = 'educator' }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Translation Complete',
      message: 'Spanish Literature Chapter 3 has been successfully translated',
      time: '2 minutes ago',
      read: false,
      action: 'View Result'
    },
    {
      id: 2,
      type: 'info',
      title: 'New Feature Available',
      message: 'Bulk translation tool is now available for educators',
      time: '1 hour ago',
      read: false,
      action: 'Learn More'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Processing Delayed',
      message: 'Math Tutorial Video processing is taking longer than expected',
      time: '3 hours ago',
      read: true,
      action: 'Check Status'
    },
    {
      id: 4,
      type: 'info',
      title: 'Content Shared',
      message: 'John shared "Physics Notes" with your class',
      time: '1 day ago',
      read: true,
      action: 'View Content'
    }
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev?.map(notif => 
        notif?.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  if (unreadCount === 0) return null;

  return (
    <div className="mb-8">
      <div className="glass rounded-lg border border-border/50 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={20} className="text-primary" />
            <h3 className="font-heading font-medium text-foreground">Recent Notifications</h3>
            {unreadCount > 0 && (
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-white">{unreadCount}</span>
              </div>
            )}
          </div>
          <Button variant="ghost" size="sm" iconName="Settings">
            Settings
          </Button>
        </div>

        <div className="space-y-3">
          {notifications?.slice(0, 3)?.map((notification) => (
            <div 
              key={notification?.id}
              className={`p-3 rounded-lg border transition-smooth ${
                notification?.read 
                  ? 'bg-background/50 border-border/30' :'bg-primary/5 border-primary/20'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`mt-0.5 ${getNotificationColor(notification?.type)}`}>
                  <Icon name={getNotificationIcon(notification?.type)} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-medium text-sm ${
                      notification?.read ? 'text-muted-foreground' : 'text-foreground'
                    }`}>
                      {notification?.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">{notification?.time}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {notification?.message}
                  </p>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs h-7 px-3"
                      onClick={() => markAsRead(notification?.id)}
                    >
                      {notification?.action}
                    </Button>
                    {!notification?.read && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs h-7 px-3"
                        onClick={() => markAsRead(notification?.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {notifications?.length > 3 && (
          <div className="mt-4 text-center">
            <Button variant="ghost" size="sm" iconName="ChevronDown" iconPosition="right">
              View All Notifications
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;