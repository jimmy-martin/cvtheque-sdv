package com.example.cv_service.service.impl;

import com.cloudinary.Cloudinary;
import com.example.cv_service.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryServiceImpl implements CloudinaryService {
    private final Cloudinary cloudinary;

    public CloudinaryServiceImpl(@Value("${CLOUDINARY_URL}") String cloudinaryUrl) {
        this.cloudinary = new Cloudinary(cloudinaryUrl);
    }

    @Override
    public String uploadPdf(MultipartFile file) throws IOException {
        if (!"application/pdf".equals(file.getContentType())) {
            throw new IllegalArgumentException("Only PDF files are allowed");
        }

        String originalFilename = file.getOriginalFilename();
        String publicId = originalFilename != null && originalFilename.contains(".")
                ? originalFilename.substring(0, originalFilename.lastIndexOf('.'))
                : "file";

        Map<String, Object> uploadOptions = Map.of(
                "resource_type", "image",
                "use_filename", true,
                "unique_filename", false,
                "public_id", publicId
        );

        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), uploadOptions);

        return (String) uploadResult.get("secure_url");
    }
}
