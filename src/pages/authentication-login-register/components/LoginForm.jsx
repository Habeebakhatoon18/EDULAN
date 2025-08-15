import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock credentials for demonstration
  const mockCredentials = {
    educator: { email: 'educator@school.edu', password: 'EduPass123!' },
    student: { email: 'student@university.edu', password: 'StudyPass456!' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const isValidEducator = formData?.email === mockCredentials?.educator?.email && 
                             formData?.password === mockCredentials?.educator?.password;
      const isValidStudent = formData?.email === mockCredentials?.student?.email && 
                            formData?.password === mockCredentials?.student?.password;
      
      if (isValidEducator || isValidStudent) {
        // Store user info in localStorage
        localStorage.setItem('userRole', isValidEducator ? 'educator' : 'student');
        localStorage.setItem('userEmail', formData?.email);
        navigate('/dashboard-role-based');
      } else {
        setErrors({
          general: `Invalid credentials. Try:\nEducator: ${mockCredentials?.educator?.email} / ${mockCredentials?.educator?.password}\nStudent: ${mockCredentials?.student?.email} / ${mockCredentials?.student?.password}`
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = (e) => {
    e?.preventDefault();
    if (forgotEmail) {
      alert(`Password reset link sent to ${forgotEmail}`);
      setShowForgotPassword(false);
      setForgotEmail('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors?.general && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg animate-fade-in">
          <div className="flex items-start space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error mt-0.5" />
            <div className="text-sm text-error whitespace-pre-line">{errors?.general}</div>
          </div>
        </div>
      )}
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        required
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth focus-ring rounded p-1"
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleInputChange}
        />
        
        <button
          type="button"
          onClick={() => setShowForgotPassword(!showForgotPassword)}
          className="text-sm text-primary hover:text-primary/80 transition-smooth focus-ring rounded px-1 py-1"
        >
          Forgot password?
        </button>
      </div>
      {showForgotPassword && (
        <div className="p-4 bg-muted/30 rounded-lg animate-slide-down">
          <form onSubmit={handleForgotPassword} className="space-y-3">
            <Input
              label="Reset Password Email"
              type="email"
              placeholder="Enter email for password reset"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e?.target?.value)}
              required
            />
            <div className="flex space-x-2">
              <Button type="submit" size="sm" variant="outline">
                Send Reset Link
              </Button>
              <Button 
                type="button" 
                size="sm" 
                variant="ghost"
                onClick={() => setShowForgotPassword(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
      <Button
        type="submit"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;