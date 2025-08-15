import React from 'react';
import Button from '../../../components/ui/Button';

const AuthToggle = ({ activeMode, onModeChange }) => {
  return (
    <div className="flex bg-muted/30 rounded-lg p-1 mb-6">
      <Button
        variant={activeMode === 'login' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onModeChange('login')}
        className="flex-1 transition-smooth"
      >
        Sign In
      </Button>
      <Button
        variant={activeMode === 'register' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onModeChange('register')}
        className="flex-1 transition-smooth"
      >
        Create Account
      </Button>
    </div>
  );
};

export default AuthToggle;