import { createContext, useContext, useMemo, useCallback } from 'react';
import type { signUpSchema } from '../schemas/signUpSchema';
import type { sigInSchema } from '../schemas/signInSchema';
import { jwtTokenManager } from '../service/token/JwtTokenManager.class';
import type { SigInApiResponse, SignUpApiResponse } from '../types/Apis/auth';
import type { User } from '../types/user';
import type { ApiResponse } from '@/service/Api/ApiResponse';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import authService from '@/service/auth.service';

type AuthState =
  | { status: 'loading'; user: null }
  | { status: 'authenticated'; user: User }
  | { status: 'unauthenticated'; user: null };

type IAuthContext = {
  authState: AuthState;

  user: User | null | undefined;
  isLoading: boolean;
  signup: (data: signUpSchema) => Promise<ApiResponse<SignUpApiResponse>>;
  signin: (data: sigInSchema) => Promise<ApiResponse<SigInApiResponse>>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const CURRENT_USER_QUERY_KEY = ['auth', 'user'] as const;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const { data: currentUser, isLoading } = useQuery<User>({
    queryKey: CURRENT_USER_QUERY_KEY,
    queryFn: async () => {
      const accessToken = jwtTokenManager.getAccessToken();
      const refreshToken = jwtTokenManager.getRefreshToken();

      // No tokens at all - user is not authenticated
      if (!accessToken && !refreshToken) {
        throw new Error('No authentication tokens');
      }

      // Try to fetch user with access token
      if (accessToken) {
        try {
          const response = await authService.me();
          if (response.success) {
            return response.data;
          }
        } catch (error) {
          // Access token failed, will try refresh below
          console.warn('Access token invalid, attempting refresh');
        }
      }

      // Access token missing or invalid - try refresh token
      if (refreshToken) {
        const refreshResponse = await authService.refresh(refreshToken);

        if (refreshResponse.success === true) {
          jwtTokenManager.setTokens(
            refreshResponse.data.accessToken,
            refreshResponse.data.refreshToken,
          );
          // Fetch user data with new token
          const response = await authService.me();
          if (response.success) {
            return response.data;
          }
        }
      }

      // Both tokens failed
      jwtTokenManager.clearTokens();
      throw new Error('Authentication failed');
    },
    enabled: !!jwtTokenManager.getAccessToken() || !!jwtTokenManager.getRefreshToken(),
    retry: false, // Don't retry failed auth requests
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes (formerly cacheTime)
  });

  const authState: AuthState = useMemo(() => {
    if (isLoading) {
      return { status: 'loading', user: null };
    }
    if (currentUser) {
      return { status: 'authenticated', user: currentUser };
    }
    return { status: 'unauthenticated', user: null };
  }, [isLoading, currentUser]);

  const signUpMutation = useMutation({
    mutationFn: authService.signUp,
    onSuccess: (response) => {
      if (!response.success) return response;
      jwtTokenManager.setTokens(response.data.accessToken, response.data.refreshToken);

      const user = response.data.user;
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY, user);
    },
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: async (response) => {
      if (!response.success) return;
      jwtTokenManager.setTokens(response.data.accessToken, response.data.refreshToken);
      const userProfileResponse = await authService.me();
      const userProfileData = userProfileResponse.success ? userProfileResponse.data : null;
      await queryClient.setQueryData(CURRENT_USER_QUERY_KEY, userProfileData);
    },
  });

  const signup = useCallback(
    async (data: signUpSchema) => {
      try {
        return await signUpMutation.mutateAsync(data);
      } catch (error) {
        return error;
      }
    },
    [signUpMutation],
  );

  const signin = useCallback(
    async (data: sigInSchema) => {
      try {
        return await loginMutation.mutateAsync(data);
      } catch (error) {
        return {
          success: false as const,
          status: 401,
          error: '',
        };
      }
    },
    [loginMutation],
  );

  const logout = useCallback(async () => {
    jwtTokenManager.clearTokens();
    await queryClient.setQueryData(CURRENT_USER_QUERY_KEY, null);
    queryClient.removeQueries({ queryKey: CURRENT_USER_QUERY_KEY });
  }, [queryClient]);

  const contextValue: IAuthContext = {
    authState,
    user: authState.user,
    isLoading,
    signup,
    signin,
    logout,
    refreshUser: () => queryClient.refetchQueries({ queryKey: CURRENT_USER_QUERY_KEY }),
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
