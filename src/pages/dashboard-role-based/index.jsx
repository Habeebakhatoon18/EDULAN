import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import WelcomeSection from './components/WelcomeSection';
import QuickActionsGrid from './components/QuickActionsGrid';
import RecentActivityList from './components/RecentActivityList';
import FloatingActionButton from './components/FloatingActionButton';
import NotificationPanel from './components/NotificationPanel';
import ProgressTracker from './components/ProgressTracker';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DashboardRoleBased = () => {
  const [userRole, setUserRole] = useState('educator');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const toggleRole = () => {
    setUserRole(prev => prev === 'educator' ? 'student' : 'educator');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <Breadcrumbs />
              <div className="flex items-center space-x-4 mb-2">
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Dashboard
                </h1>
                <div className="flex items-center space-x-2">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    userRole === 'educator' ?'bg-primary/20 text-primary' :'bg-secondary/20 text-secondary'
                  }`}>
                    <Icon 
                      name={userRole === 'educator' ? 'GraduationCap' : 'BookOpen'} 
                      size={14} 
                      className="inline mr-1" 
                    />
                    {userRole === 'educator' ? 'Educator' : 'Student'}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleRole}
                    iconName="RefreshCw"
                    className="text-xs"
                  >
                    Switch Role
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground">
                {formatDate(currentTime)} • {formatTime(currentTime)}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 lg:mt-0 flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-heading font-semibold text-primary">98%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-semibold text-success">24/7</div>
                <div className="text-xs text-muted-foreground">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-semibold text-accent">50+</div>
                <div className="text-xs text-muted-foreground">Languages</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Welcome Section */}
            <WelcomeSection userRole={userRole} userName="John" />

            {/* Notifications */}
            <NotificationPanel userRole={userRole} />

            {/* Quick Actions */}
            <QuickActionsGrid userRole={userRole} />

            {/* Progress Tracker */}
            <ProgressTracker userRole={userRole} />

            {/* Recent Activity */}
            <RecentActivityList userRole={userRole} />

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tips Card */}
              <div className="glass rounded-lg p-6 border border-border/50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Icon name="Lightbulb" size={20} color="var(--color-accent)" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground">
                    {userRole === 'educator' ? 'Teaching Tips' : 'Learning Tips'}
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  {userRole === 'educator' ?'Use batch translation for multiple documents to save time. Our AI maintains context across related materials.' :'Practice with translated content daily. Start with familiar topics to build confidence in new languages.'
                  }
                </p>
                <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
                  Learn More
                </Button>
              </div>

              {/* Support Card */}
              <div className="glass rounded-lg p-6 border border-border/50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <Icon name="HelpCircle" size={20} color="var(--color-secondary)" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground">Need Help?</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Our support team is available 24/7 to help you with any questions about translation features.
                </p>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" iconName="MessageCircle" iconPosition="left">
                    Chat Support
                  </Button>
                  <Button variant="ghost" size="sm" iconName="Book" iconPosition="left">
                    Documentation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton userRole={userRole} />
    </div>
  );
};

export default DashboardRoleBased;