import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLogin = () => {
  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Simulate social login
    alert(`${provider} login would be implemented here`);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={() => handleSocialLogin('Google')}
          className="w-full border-border/50 hover:border-primary/50 hover:bg-primary/5"
        >
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <span>Google</span>
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={() => handleSocialLogin('Microsoft')}
          className="w-full border-border/50 hover:border-secondary/50 hover:bg-secondary/5"
        >
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 bg-gradient-to-r from-blue-600 to-blue-800 rounded-sm flex items-center justify-center">
              <Icon name="Square" size={12} color="white" />
            </div>
            <span>Microsoft</span>
          </div>
        </Button>
      </div>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our{' '}
          <button className="text-primary hover:text-primary/80 transition-smooth underline">
            Terms of Service
          </button>{' '}
          and{' '}
          <button className="text-primary hover:text-primary/80 transition-smooth underline">
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
};

export default SocialLogin;