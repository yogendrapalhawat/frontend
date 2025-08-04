// Register.js
import React, { useState } from 'react';
import './Register.css';
import { UserPlus, User, AtSign, Mail, Lock, Shield, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert('❌ Password and Confirm Password do not match!');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Registration data:', formData);
      setIsSuccess(true);
    } catch (err) {
      alert('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const passwordMatch = formData.password === formData.confirmPassword;
  const isFormValid = Object.values(formData).every(Boolean) && passwordMatch;

  return (
    <div className="bg-gradient-register register-container">
      <div className="bg-blur-blob blob-top-right"></div>
      <div className="bg-blur-blob blob-bottom-left"></div>
      <div className="bg-blur-blob blob-center-left"></div>

      <div className="register-card">
        <div className="register-header">
          <div className="register-header-icon">
            <UserPlus size={32} color="white" />
          </div>
          <h1>Create Account</h1>
          <p>Join our community today</p>
        </div>

        <div className="register-form-group">
          <label className="register-label"><User size={16} /> Full Name</label>
          <input type="text" className="register-input" placeholder="Enter your full name" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
        </div>

        <div className="register-form-group">
          <label className="register-label"><AtSign size={16} /> Username</label>
          <input type="text" className="register-input" placeholder="Choose a username" value={formData.username} onChange={(e) => handleInputChange('username', e.target.value)} />
        </div>

        <div className="register-form-group">
          <label className="register-label"><Mail size={16} /> Email Address</label>
          <input type="email" className="register-input" placeholder="Enter your email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
        </div>

        <div className="register-form-group">
          <label className="register-label"><Lock size={16} /> Password</label>
          <div style={{ position: 'relative' }}>
            <input type={showPassword ? "text" : "password"} className="register-input" placeholder="Create a strong password" value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} />
            <span className="toggle-eye" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </span>
          </div>
        </div>

        <div className="register-form-group">
          <label className="register-label"><Lock size={16} /> Confirm Password</label>
          <div style={{ position: 'relative' }}>
            <input type={showConfirmPassword ? "text" : "password"} className="register-input" placeholder="Confirm your password" value={formData.confirmPassword} onChange={(e) => handleInputChange('confirmPassword', e.target.value)} />
            <span className="toggle-eye" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </span>
          </div>
          {formData.confirmPassword && (
            <div className={`register-status ${passwordMatch ? 'status-green' : 'status-red'}`}>
              {passwordMatch ? (
                <><CheckCircle size={14} /> Passwords match</>
              ) : (
                <><AlertCircle size={14} /> Passwords don't match</>
              )}
            </div>
          )}
        </div>

        <div className="register-form-group">
          <label className="register-label"><Shield size={16} /> Account Type</label>
          <select className="register-select" value={formData.role} onChange={(e) => handleInputChange('role', e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button className="register-button" disabled={!isFormValid || isLoading} onClick={handleRegister}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>

        <div className="register-footer">
          Already have an account? <a href="#">Sign in here</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
