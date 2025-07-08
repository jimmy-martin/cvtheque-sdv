package com.example.cv_service.controller;

import com.example.cv_service.dto.CvUploadResponse;
import com.example.cv_service.entity.Cv;
import com.example.cv_service.repository.CvRepository;
import com.example.cv_service.service.CloudinaryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/cvs")
public class CvController {
    private final CloudinaryService cloudinaryService;
    private final CvRepository cvRepository;

    public CvController(CloudinaryService cloudinaryService, CvRepository cvRepository) {
        this.cloudinaryService = cloudinaryService;
        this.cvRepository = cvRepository;
    }

    @GetMapping("/profile/{profileId}")
    public List<Cv> getCvsByProfile(@PathVariable Long profileId) {
        return cvRepository.findByProfileId(profileId);
    }

    @PostMapping("/upload")
    public ResponseEntity<CvUploadResponse> uploadCv(
            @RequestParam("file") MultipartFile file,
            @RequestParam("profileId") Long profileId
    ) throws IOException {
        String url = cloudinaryService.uploadPdf(file);

        Cv cv = new Cv();
        cv.setFileUrl(url);
        cv.setProfileId(profileId);
        cv.setUploadedAt(LocalDateTime.now());
        cv.setOriginalFilename(file.getOriginalFilename());
        cvRepository.save(cv);

        return ResponseEntity.ok(
                new CvUploadResponse(
                        url,
                        profileId,
                        cv.getUploadedAt(),
                        cv.getOriginalFilename()
                )
        );
    }
}