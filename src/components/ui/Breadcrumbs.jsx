import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumbs = () => {
  const location = useLocation();
  
  const routeMap = {
    '/dashboard-role-based': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/text-translation-workspace': { label: 'Text Translation', icon: 'FileText' },
    '/video-translation-studio': { label: 'Video Studio', icon: 'Video' },
    '/audio-translation-lab': { label: 'Audio Lab', icon: 'Headphones' },
    '/language-learning-hub': { label: 'Learning Hub', icon: 'GraduationCap' },
    '/authentication-login-register': { label: 'Authentication', icon: 'Lock' }
  };

  const currentRoute = routeMap?.[location?.pathname];
  
  if (!currentRoute || location?.pathname === '/dashboard-role-based') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      <Link
        to="/dashboard-role-based"
        className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-smooth focus-ring rounded px-2 py-1"
      >
        <Icon name="LayoutDashboard" size={16} />
        <span>Dashboard</span>
      </Link>
      <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
      <div className="flex items-center space-x-1 text-foreground font-medium">
        <Icon name={currentRoute?.icon} size={16} className="text-primary" />
        <span>{currentRoute?.label}</span>
      </div>
    </nav>
  );
};

export default Breadcrumbs;