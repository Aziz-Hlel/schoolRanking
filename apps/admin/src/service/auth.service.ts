import type { sigInSchema } from '@/schemas/signInSchema';
import type { signUpSchema } from '@/schemas/signUpSchema';
import type { User } from '@/types/user';
import { apiService } from './Api/apiService';
import apiRoutes from './Api/apiRoutes';
import type { SigInApiResponse, SignUpApiResponse } from '@/types/Apis/auth';

const authService = {
  login: (data: sigInSchema) =>
    apiService.postThrowable<SigInApiResponse>(apiRoutes.auth.login, data),

  signUp: (data: signUpSchema) =>
    apiService.postThrowable<SignUpApiResponse>(apiRoutes.auth.signUp, data),

  me: () => apiService.get<User>(apiRoutes.auth.me),

  refresh: (refreshToken: string) =>
    apiService.post<{ accessToken: string; refreshToken: string }>(apiRoutes.auth.refresh, {
      refreshToken,
    }),
} as const;

export default authService;
