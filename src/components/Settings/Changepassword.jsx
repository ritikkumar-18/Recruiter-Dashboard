
import { ShieldCheck, KeyRound, Lock, Mail, Smartphone } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import Settingpage1 from './Settingpage1';
import { EyeIcon, EyeOffIcon, Loader2, CheckCircle, XCircle } from 'lucide-react';

const ChangePassword = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: select method, 2: verify, 3: change password
  const [verificationMethod, setVerificationMethod] = useState(''); // 'email' or 'phone'
  const [contactInfo, setContactInfo] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });

  // Check password strength in real-time
  useEffect(() => {
    if (newPassword) {
      const requirements = {
        length: newPassword.length >= 8,
        uppercase: /[A-Z]/.test(newPassword),
        number: /\d/.test(newPassword),
        special: /[@$!%*?&]/.test(newPassword),
      };
      setPasswordRequirements(requirements);
      setPasswordStrength(Object.values(requirements).filter(Boolean).length);
    } else {
      setPasswordStrength(0);
    }
  }, [newPassword]);

  const handleSendCode = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!verificationMethod) {
      newErrors.verificationMethod = 'Please select a verification method';
    }
    
    if (!contactInfo) {
      newErrors.contactInfo = verificationMethod === 'email' 
        ? 'Email is required' 
        : 'Phone number is required';
    } else if (verificationMethod === 'email' && !/^\S+@\S+\.\S+$/.test(contactInfo)) {
      newErrors.contactInfo = 'Please enter a valid email';
    } else if (verificationMethod === 'phone' && !/^\d{10,15}$/.test(contactInfo)) {
      newErrors.contactInfo = 'Please enter a valid phone number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // Simulate sending verification code
    setTimeout(() => {
      setLoading(false);
      setCodeSent(true);
      setStep(2);
      setErrors({});
    }, 1500);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (!verificationCode) {
      setErrors({ verificationCode: 'Verification code is required' });
      return;
    }
    setLoading(true);
    // Simulate verification
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      setErrors({});
    }, 1500);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!newPassword) newErrors.newPassword = 'New password is required';
    if (newPassword.length < 8) newErrors.newPassword = 'Password must be at least 8 characters';
    if (newPassword !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // Simulate password change
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Password changed successfully!');
      setErrors({});
      setTimeout(() => {
        resetForm();
      }, 2000);
    }, 1500);
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setStep(1);
    setVerificationMethod('');
    setContactInfo('');
    setVerificationCode('');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({});
    setSuccessMessage('');
    setCodeSent(false);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0: return 'bg-gray-200';
      case 1: return 'bg-red-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-200';
    }
  };

  const getStrengthText = () => {
    switch (passwordStrength) {
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Medium';
      case 3: return 'Strong';
      case 4: return 'Very Strong';
      default: return '';
    }
  };

  return (
    <Settingpage1 icon={ShieldCheck} title={"Change Password"}>
      <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg border border-gray-700">
        <div className="space-y-4">
          <div className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700 group">
            <div className="flex items-center space-x-3">
              <Lock className="text-blue-400 group-hover:text-blue-300 transition-colors" />
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full text-left font-medium text-gray-100 focus:outline-none hover:text-white transition-colors"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0  bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm ">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl w-full max-w-md border border-gray-700 animate-fade-in">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <KeyRound className="mr-2 text-blue-400" />
                    {step === 1 ? 'Select Verification Method' : 
                     step === 2 ? 'Verify Your Identity' : 'Create New Password'}
                  </h3>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                {/* Animated Stepper */}
                <div className="flex justify-between mb-6 relative">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 -translate-y-1/2 z-0"></div>
                  <div className="flex justify-between w-full relative z-10">
                    {[1, 2, 3].map((stepNumber) => (
                      <div key={stepNumber} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= stepNumber ? 'border-blue-500 bg-blue-500' : 'border-gray-600 bg-gray-800'} transition-all duration-300`}>
                          <span className={`text-sm ${step >= stepNumber ? 'text-white' : 'text-gray-400'}`}>
                            {stepNumber}
                          </span>
                        </div>
                        <span className={`text-xs mt-1 ${step >= stepNumber ? 'text-blue-400' : 'text-gray-500'}`}>
                          {stepNumber === 1 ? 'Method' : stepNumber === 2 ? 'Verify' : 'Change'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {successMessage ? (
                  <div className="p-4 mb-4 bg-green-900/50 border border-green-700 rounded-lg flex items-center">
                    <CheckCircle className="text-green-400 mr-2" />
                    <span className="text-green-300">{successMessage}</span>
                  </div>
                ) : (
                  <form onSubmit={
                    step === 1 ? handleSendCode : 
                    step === 2 ? handleVerify : 
                    handleChangePassword
                  }>
                    {step === 1 ? (
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">
                            How would you like to receive your verification code?
                          </label>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <button
                              type="button"
                              onClick={() => setVerificationMethod('email')}
                              className={`p-3 border rounded-lg flex flex-col items-center transition-colors ${verificationMethod === 'email' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:bg-gray-700'}`}
                            >
                              <Mail className={`w-5 h-5 mb-1 ${verificationMethod === 'email' ? 'text-blue-400' : 'text-gray-400'}`} />
                              <span className="text-sm">Email</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setVerificationMethod('phone')}
                              className={`p-3 border rounded-lg flex flex-col items-center transition-colors ${verificationMethod === 'phone' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:bg-gray-700'}`}
                            >
                              <Smartphone className={`w-5 h-5 mb-1 ${verificationMethod === 'phone' ? 'text-blue-400' : 'text-gray-400'}`} />
                              <span className="text-sm">Phone</span>
                            </button>
                          </div>
                          {errors.verificationMethod && (
                            <p className="mt-1 text-sm text-red-400 flex items-center">
                              <XCircle className="w-4 h-4 mr-1" /> {errors.verificationMethod}
                            </p>
                          )}
                        </div>

                        {verificationMethod && (
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              {verificationMethod === 'email' ? 'Email Address' : 'Phone Number'}
                            </label>
                            <div className="relative">
                              <input
                                type={verificationMethod === 'email' ? 'email' : 'tel'}
                                value={contactInfo}
                                onChange={(e) => setContactInfo(e.target.value)}
                                className={`w-full px-4 py-3 bg-gray-800 border ${errors.contactInfo ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                placeholder={verificationMethod === 'email' ? 'your@email.com' : '+1 (123) 456-7890'}
                              />
                            </div>
                            {errors.contactInfo && (
                              <p className="mt-1 text-sm text-red-400 flex items-center">
                                <XCircle className="w-4 h-4 mr-1" /> {errors.contactInfo}
                              </p>
                            )}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={loading || !verificationMethod || !contactInfo}
                          className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors duration-300 mt-4 ${(!verificationMethod || !contactInfo) ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                        >
                          {loading ? (
                            <>
                              <Loader2 className="animate-spin mr-2" />
                              Sending...
                            </>
                          ) : (
                            'Send Verification Code'
                          )}
                        </button>
                      </div>
                    ) : step === 2 ? (
                      <div className="space-y-5">
                        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-4">
                          <p className="text-sm text-gray-300">
                            We've sent a 6-digit verification code to{' '}
                            <span className="font-medium text-blue-400">
                              {verificationMethod === 'email' ? contactInfo : `••••••${contactInfo.slice(-4)}`}
                            </span>
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Verification Code
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={verificationCode}
                              onChange={(e) => setVerificationCode(e.target.value)}
                              className={`w-full px-4 py-3 bg-gray-800 border ${errors.verificationCode ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                              placeholder="Enter 6-digit code"
                              maxLength={6}
                            />
                          </div>
                          {errors.verificationCode && (
                            <p className="mt-1 text-sm text-red-400 flex items-center">
                              <XCircle className="w-4 h-4 mr-1" /> {errors.verificationCode}
                            </p>
                          )}
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="text-sm text-blue-400 hover:text-blue-300"
                          >
                            Change verification method
                          </button>
                          <button
                            type="button"
                            onClick={handleSendCode}
                            className="text-sm text-blue-400 hover:text-blue-300"
                          >
                            Resend code
                          </button>
                        </div>

                        <button
                          type="submit"
                          disabled={loading || !verificationCode}
                          className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors duration-300 mt-4 ${!verificationCode ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                        >
                          {loading ? (
                            <>
                              <Loader2 className="animate-spin mr-2" />
                              Verifying...
                            </>
                          ) : (
                            'Continue'
                          )}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-5">
                        {['currentPassword', 'newPassword', 'confirmPassword'].map((field) => (
                          <div key={field}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              {field === 'currentPassword' ? 'Current Password' : 
                               field === 'newPassword' ? 'New Password' : 'Confirm New Password'}
                            </label>
                            <div className="relative">
                              <input
                                type={showPasswords[field] ? "text" : "password"}
                                value={field === 'currentPassword' ? currentPassword : 
                                      field === 'newPassword' ? newPassword : confirmPassword}
                                onChange={(e) => {
                                  field === 'currentPassword'
                                    ? setCurrentPassword(e.target.value)
                                    : field === 'newPassword'
                                    ? setNewPassword(e.target.value)
                                    : setConfirmPassword(e.target.value);
                                }}
                                className={`w-full px-4 py-3 bg-gray-800 border ${errors[field] ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                              />
                              <button
                                type="button"
                                onClick={() => togglePasswordVisibility(field)}
                                className="absolute right-3 top-3 text-gray-400 hover:text-white"
                              >
                                {showPasswords[field] ? <EyeOffIcon /> : <EyeIcon />}
                              </button>
                            </div>
                            {errors[field] && (
                              <p className="mt-1 text-sm text-red-400 flex items-center">
                                <XCircle className="w-4 h-4 mr-1" /> {errors[field]}
                              </p>
                            )}
                            {field === 'newPassword' && newPassword && (
                              <div className="mt-3 space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-400">Password Strength</span>
                                  <span className={`text-xs font-medium ${
                                    passwordStrength === 0 ? 'text-gray-400' :
                                    passwordStrength === 1 ? 'text-red-400' :
                                    passwordStrength === 2 ? 'text-yellow-400' :
                                    passwordStrength === 3 ? 'text-blue-400' : 'text-green-400'
                                  }`}>
                                    {getStrengthText()}
                                  </span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-1.5">
                                  <div 
                                    className={`h-1.5 rounded-full ${getStrengthColor()}`} 
                                    style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                  ></div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                  {Object.entries(passwordRequirements).map(([key, met]) => (
                                    <div key={key} className="flex items-center">
                                      {met ? (
                                        <CheckCircle className="w-3 h-3 text-green-400 mr-1" />
                                      ) : (
                                        <XCircle className="w-3 h-3 text-red-400 mr-1" />
                                      )}
                                      <span className={`text-xs ${met ? 'text-green-400' : 'text-gray-400'}`}>
                                        {key === 'length' ? '8+ characters' :
                                         key === 'uppercase' ? 'Uppercase' :
                                         key === 'number' ? 'Number' : 'Special char'}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors duration-300 mt-4"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="animate-spin mr-2" />
                              Updating...
                            </>
                          ) : (
                            'Update Password'
                          )}
                        </button>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Settingpage1>
  );
};

export default ChangePassword;