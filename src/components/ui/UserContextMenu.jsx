import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const UserContextMenu = ({ user = { name: 'John Educator', email: 'john@school.edu', plan: 'Premium' } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const menuItems = [
    {
      section: 'Account',
      items: [
        { label: 'Profile Settings', icon: 'User', action: () => console.log('Profile'), shortcut: '⌘P' },
        { label: 'Account Preferences', icon: 'Settings', action: () => console.log('Settings'), shortcut: '⌘,' },
        { label: 'Billing & Plans', icon: 'CreditCard', action: () => console.log('Billing') }
      ]
    },
    {
      section: 'Workspace',
      items: [
        { label: 'Project Templates', icon: 'FileTemplate', action: () => console.log('Templates') },
        { label: 'Language Preferences', icon: 'Languages', action: () => console.log('Languages') },
        { label: 'Export Settings', icon: 'Download', action: () => console.log('Export') }
      ]
    },
    {
      section: 'Support',
      items: [
        { label: 'Help & Documentation', icon: 'HelpCircle', action: () => console.log('Help'), shortcut: '⌘?' },
        { label: 'Keyboard Shortcuts', icon: 'Keyboard', action: () => console.log('Shortcuts'), shortcut: '⌘K' },
        { label: 'Contact Support', icon: 'MessageCircle', action: () => console.log('Support') }
      ]
    }
  ];

  const systemItems = [
    { label: 'Sign Out', icon: 'LogOut', action: () => console.log('Logout'), variant: 'destructive' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef?.current && !menuRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event?.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const getPlanBadgeColor = (plan) => {
    switch (plan?.toLowerCase()) {
      case 'premium': return 'bg-primary/20 text-primary';
      case 'pro': return 'bg-secondary/20 text-secondary';
      case 'basic': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-muted/50"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <span className="text-sm font-medium text-white">
            {user?.name?.split(' ')?.map(n => n?.[0])?.join('')}
          </span>
        </div>
        <Icon 
          name="ChevronDown" 
          size={14} 
          className={`ml-1 transition-smooth ${isOpen ? 'rotate-180' : ''}`} 
        />
      </Button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 glass rounded-lg shadow-xl border border-border/50 animate-scale-in z-50">
          {/* User Info Header */}
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-lg font-medium text-white">
                  {user?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">{user?.name}</h4>
                <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs mt-1 ${getPlanBadgeColor(user?.plan)}`}>
                  <Icon name="Shield" size={12} className="mr-1" />
                  {user?.plan} Plan
                </div>
              </div>
            </div>
          </div>

          {/* Menu Sections */}
          <div className="py-2 max-h-96 overflow-y-auto">
            {menuItems?.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <div className="px-4 py-2">
                  <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {section?.section}
                  </h5>
                </div>
                <div className="space-y-1 px-2">
                  {section?.items?.map((item, itemIndex) => (
                    <button
                      key={itemIndex}
                      onClick={() => {
                        item?.action();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-smooth focus-ring"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={item?.icon} size={16} />
                        <span>{item?.label}</span>
                      </div>
                      {item?.shortcut && (
                        <span className="text-xs text-muted-foreground font-mono">
                          {item?.shortcut}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                {sectionIndex < menuItems?.length - 1 && (
                  <div className="my-2 border-t border-border/50" />
                )}
              </div>
            ))}

            {/* System Actions */}
            <div className="mt-2 pt-2 border-t border-border/50">
              <div className="space-y-1 px-2">
                {systemItems?.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      item?.action();
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-smooth focus-ring ${
                      item?.variant === 'destructive' ?'text-error hover:text-error-foreground hover:bg-error/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-border/50 bg-muted/20">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>EduLingua AI v2.1.0</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-gentle"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserContextMenu;