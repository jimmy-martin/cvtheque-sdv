package com.example.cv_service.service;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface CloudinaryService {
    String uploadPdf(MultipartFile file) throws IOException;

    void deleteFile(String fileUrl) throws Exception;
}
