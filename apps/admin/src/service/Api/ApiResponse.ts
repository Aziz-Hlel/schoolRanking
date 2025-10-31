// ! not used anywhere idk i think this is the better and more accurate type for the api response but got into some type issues with it so decided to hold off for the moment




type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  status: number;
  data: T;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

type ApiErrorResponse = {
  success: false;
  status: number;
  error: string;
  timestamp?: string;
  metadata?: Record<string, unknown>;
}


export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
