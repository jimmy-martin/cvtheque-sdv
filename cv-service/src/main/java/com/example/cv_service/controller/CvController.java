package com.example.cv_service.controller;

import com.example.cv_service.dto.CvUploadResponse;
import com.example.cv_service.dto.UserResponseDto;
import com.example.cv_service.entity.Cv;
import com.example.cv_service.entity.Profile;
import com.example.cv_service.repository.CvRepository;
import com.example.cv_service.repository.ProfileRepository;
import com.example.cv_service.service.AuthClientService;
import com.example.cv_service.service.CloudinaryService;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cvs")
public class CvController {
    private final CloudinaryService cloudinaryService;
    private final CvRepository cvRepository;
    private final ProfileRepository profileRepository;
    private final AuthClientService authClientService;

    public CvController(
            CloudinaryService cloudinaryService,
            CvRepository cvRepository,
            ProfileRepository profileRepository,
            AuthClientService authClientService) {
        this.cloudinaryService = cloudinaryService;
        this.cvRepository = cvRepository;
        this.profileRepository = profileRepository;
        this.authClientService = authClientService;
    }

    @GetMapping("/profile/{profileId}")
    public ResponseEntity<List<Cv>> getCvsByProfile(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long profileId) {
        String token = authHeader.replace("Bearer ", "");
        UserResponseDto user = authClientService.getCurrentUser(token);
        Optional<Profile> profileOpt = profileRepository.findById(profileId);
        if (profileOpt.isEmpty() || !profileOpt.get().getUserId().equals(user.getId())) {
            return ResponseEntity.status(403).build(); // Forbidden
        }

        return ResponseEntity.ok(cvRepository.findByProfileId(profileId));
    }

    @PostMapping("/upload")
    @Transactional
    public ResponseEntity<CvUploadResponse> uploadCv(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam("file") MultipartFile file,
            @RequestParam("profileId") Long profileId) throws IOException {
        String token = authHeader.replace("Bearer ", "");
        UserResponseDto user = authClientService.getCurrentUser(token);
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        Optional<Profile> profile = profileRepository.findById(profileId);
        if (profile.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        // Supprimer l'ancien CV s'il existe
        List<Cv> existingCvs = cvRepository.findByProfileId(profile.get().getId());
        for (Cv existingCv : existingCvs) {
            // Supprimer le fichier de Cloudinary si nécessaire
            if (existingCv.getFileUrl() != null && !existingCv.getFileUrl().isEmpty()) {
                try {
                    cloudinaryService.deleteFile(existingCv.getFileUrl());
                } catch (Exception e) {
                    // Log l'erreur mais continue le processus
                    System.err.println("Erreur lors de la suppression du fichier Cloudinary: " + e.getMessage());
                }
            }
        }

        // Supprimer tous les CVs existants de la base de données
        cvRepository.deleteByProfileId(profile.get().getId());

        // Uploader le nouveau CV
        String url = cloudinaryService.uploadPdf(file);

        Cv cv = new Cv();
        cv.setFileUrl(url);
        cv.setProfile(profile.get());
        cv.setUploadedAt(LocalDateTime.now());
        cv.setOriginalFilename(file.getOriginalFilename());
        cvRepository.save(cv);

        return ResponseEntity.ok(
                new CvUploadResponse(
                        url,
                        profile.get().getId(),
                        cv.getUploadedAt(),
                        cv.getOriginalFilename()));
    }

    @GetMapping("/check-user")
    public ResponseEntity<UserResponseDto> checkUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        UserResponseDto user = authClientService.getCurrentUser(token);
        return ResponseEntity.ok(user);
    }
}