import { api } from '@/store/baseApi';
import type {
  LoginRequest,
  LoginResult,
  RegisterRequest,
  RegisterResult,
  ResendOtpRequest,
  UserProfile,
  VerifyEmailRequest,
  VerifyEmailResult,
  ForgotPasswordRequest,
  VerifyResetPasswordRequest,
  ResetPasswordRequest,
} from '@/features/auth/types/auth.types';

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResult, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: any) => response.data,
    }),
    register: builder.mutation<RegisterResult, RegisterRequest>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => response.data,
    }),
    verifyEmail: builder.mutation<VerifyEmailResult, VerifyEmailRequest>({
      query: (data) => ({
        url: '/auth/verify-email',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => response.data,
    }),
    getProfile: builder.query<UserProfile, void>({
      query: () => '/auth/me',
      transformResponse: (response: any) => response.data,
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      transformResponse: (response: any) => response.data,
    }),
    resendOtp: builder.mutation<{ message: string }, ResendOtpRequest>({
      query: (data) => ({
        url: '/auth/resend-verification-otp',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => response.data,
    }),
    forgotPassword: builder.mutation<{ message: string }, ForgotPasswordRequest>({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => response.data,
    }),
    verifyResetPassword: builder.mutation<{ message: string }, VerifyResetPasswordRequest>({
      query: (data) => ({
        url: '/auth/verify-reset-password',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => response.data,
    }),
    resetPassword: builder.mutation<{ message: string }, ResetPasswordRequest>({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useLogoutMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useVerifyResetPasswordMutation,
  useResetPasswordMutation,
} = authApiSlice;
