package com.example.TechnoShark.SchoolRanking.Utils;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ApiResult<T> {
    private final T data;
    private String message;
    private HttpStatus status = HttpStatus.OK;

    private ApiResult(T data) {
        this.data = data;
    }

    public static <T> ApiResult<T> of(T data) {
        return new ApiResult<>(data);
    }

    public ApiResult<T> withMessage(String message) {
        this.message = message;
        return this;
    }

    public ApiResult<T> withStatus(HttpStatus status) {
        this.status = status;
        return this;
    }

    // ? Spring automatically calls toResponse() method
    public ResponseEntity<ApiResponse<T>> toResponse() {
        ApiResponse<T> response = ApiResponse.<T>builder()
                .success(true)
                .message(message != null ? message : "Operation completed successfully")
                .data(data)
                .timestamp(LocalDateTime.now())
                .status(status)
                .build();
        return ResponseEntity.status(status).body(response);
    }
}