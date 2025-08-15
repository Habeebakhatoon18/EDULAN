import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard-role-based',
      icon: 'LayoutDashboard',
      tooltip: 'Role-based dashboard and project overview'
    },
    {
      label: 'Text Translate',
      path: '/text-translation-workspace',
      icon: 'FileText',
      tooltip: 'Text translation workspace'
    },
    {
      label: 'Video Studio',
      path: '/video-translation-studio',
      icon: 'Video',
      tooltip: 'Video translation and subtitling'
    },
    {
      label: 'Audio Lab',
      path: '/audio-translation-lab',
      icon: 'Headphones',
      tooltip: 'Audio translation and voice processing'
    },
    {
      label: 'Learning Hub',
      path: '/language-learning-hub',
      icon: 'GraduationCap',
      tooltip: 'Language learning resources and materials'
    }
  ];

  const userMenuItems = [
    { label: 'Profile Settings', icon: 'User', action: () => console.log('Profile') },
    { label: 'Account Preferences', icon: 'Settings', action: () => console.log('Settings') },
    { label: 'Help & Support', icon: 'HelpCircle', action: () => console.log('Help') },
    { label: 'Sign Out', icon: 'LogOut', action: () => console.log('Logout') }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef?.current && !userMenuRef?.current?.contains(event?.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const Logo = () => (
    <Link to="/dashboard-role-based" className="flex items-center space-x-3 focus-ring rounded-lg">
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-md">
          <Icon name="Languages" size={24} color="white" strokeWidth={2.5} />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
          <Icon name="Sparkles" size={10} color="var(--color-accent-foreground)" strokeWidth={3} />
        </div>
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-heading font-semibold text-foreground">EduLingua AI</h1>
        <p className="text-xs font-caption text-muted-foreground -mt-1">Smart Translation Platform</p>
      </div>
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`group relative px-4 py-2 rounded-lg transition-smooth focus-ring ${
                  isActiveRoute(item?.path)
                    ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                title={item?.tooltip}
              >
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={item?.icon} 
                    size={18} 
                    color="currentColor"
                    className={`transition-smooth ${isActiveRoute(item?.path) ? 'scale-110' : 'group-hover:scale-105'}`}
                  />
                  <span className="font-medium text-sm">{item?.label}</span>
                </div>
                {isActiveRoute(item?.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="relative p-2"
                iconName="User"
                iconSize={20}
              >
                <span className="sr-only">User menu</span>
              </Button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 glass rounded-lg shadow-xl border border-border/50 animate-scale-in">
                  <div className="p-3 border-b border-border/50">
                    <p className="font-medium text-sm text-foreground">John Educator</p>
                    <p className="text-xs text-muted-foreground">john@school.edu</p>
                    <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary/20 text-secondary-foreground">
                      <Icon name="Shield" size={12} className="mr-1" />
                      Premium Plan
                    </div>
                  </div>
                  <div className="py-2">
                    {userMenuItems?.map((item, index) => (
                      <button
                        key={index}
                        onClick={item?.action}
                        className="w-full flex items-center px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth focus-ring"
                      >
                        <Icon name={item?.icon} size={16} className="mr-3" />
                        {item?.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2"
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              iconSize={20}
            >
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border/50 animate-slide-down">
            <nav className="py-4 space-y-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-lg transition-smooth focus-ring ${
                    isActiveRoute(item?.path)
                      ? 'bg-primary/10 text-primary border-l-4 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={item?.icon} size={20} className="mr-3" />
                  <div>
                    <div className="font-medium text-sm">{item?.label}</div>
                    <div className="text-xs text-muted-foreground">{item?.tooltip}</div>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;