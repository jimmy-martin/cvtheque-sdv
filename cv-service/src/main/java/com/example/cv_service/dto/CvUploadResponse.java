package com.example.cv_service.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CvUploadResponse {
    private String fileUrl;
    private Long profileId;
    private LocalDateTime uploadedAt;
    private String originalFilename;
}