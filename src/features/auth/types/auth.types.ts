export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  role: 'CUSTOMER' | 'ADMIN';
  authProvider: 'LOCAL' | 'GOOGLE' | 'FACEBOOK' | 'GITHUB' | 'APPLE';
  isActive: boolean;
  isEmailVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: string;
}

export interface RegisterResult {
  isEmailVerified: boolean;
  email: string;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResult {
  user: UserProfile;
  accessToken: string;
  expiresIn: number;
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface VerifyEmailResult {
  message: string;
  user: UserProfile;
  tokens: {
    accessToken: string;
    refreshToken?: string;
    expiresIn: number;
  };
}

export interface ResendOtpRequest {
  email: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyResetPasswordRequest {
  email: string;
  code: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  data: T;
  message?: string;
  errors?: any;
  timestamp: string;
}

export interface ForgotPasswordFormValues {
  email: string;
}

export interface VerifyOtpFormValues {
  code: string;
}

export interface ResetPasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordCriterion {
  id: string;
  label: string;
  isValid: boolean;
}

export interface PasswordStrength {
  score: number; // 0 to 4
  label: string;
  color: string;
  percent: number;
}

export interface PasswordStrengthMeterProps {
  password?: string;
  className?: string;
}

