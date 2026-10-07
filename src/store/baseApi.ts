import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import { logout, setToken } from './authSlice';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'http://localhost:8000/api';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // cố gắng lấy refresh token (gửi kèm httpOnly cookie)
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // lưu access token mới
      const newToken = (refreshResult.data as any).data?.accessToken || (refreshResult.data as any).accessToken;
      if (newToken) {
        api.dispatch(setToken(newToken));
        // retry api vừa nãy bị 401
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
