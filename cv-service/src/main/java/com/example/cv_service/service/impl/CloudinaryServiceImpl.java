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
                "public_id", publicId);

        return (String) cloudinary.uploader().upload(file.getBytes(), uploadOptions).get("secure_url");
    }

    @Override
    public void deleteFile(String fileUrl) throws Exception {
        if (fileUrl == null || fileUrl.isEmpty()) {
            return;
        }

        // Extraire le public_id de l'URL Cloudinary
        String publicId = extractPublicIdFromUrl(fileUrl);
        if (publicId != null) {
            Map<String, Object> deleteOptions = Map.of(
                    "resource_type", "image");
            cloudinary.uploader().destroy(publicId, deleteOptions);
        }
    }

    private String extractPublicIdFromUrl(String fileUrl) {
        try {
            // Exemple d'URL Cloudinary:
            // https://res.cloudinary.com/dfqxbwfnc/image/upload/v1751963279/image_kviu2s.png
            // On extrait la partie après "upload/" et avant le dernier "/"
            String[] parts = fileUrl.split("/upload/");
            if (parts.length > 1) {
                String afterUpload = parts[1];
                // Supprimer la version si présente (v1751963279/)
                if (afterUpload.contains("/")) {
                    String[] versionAndFile = afterUpload.split("/", 2);
                    if (versionAndFile.length > 1) {
                        // Supprimer l'extension du fichier
                        String fileName = versionAndFile[1];
                        int lastDotIndex = fileName.lastIndexOf('.');
                        if (lastDotIndex > 0) {
                            return fileName.substring(0, lastDotIndex);
                        }
                        return fileName;
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Erreur lors de l'extraction du public_id: " + e.getMessage());
        }
        return null;
    }
}
