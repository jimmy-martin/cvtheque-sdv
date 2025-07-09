package com.example.cv_service.controller;

import com.example.cv_service.dto.GetProfileResponse;
import com.example.cv_service.entity.Profile;
import com.example.cv_service.repository.ProfileRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {
    private final ProfileRepository profileRepository;

    public ProfileController(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetProfileResponse> getProfileById(@PathVariable Long id) {
        Optional<Profile> profile = profileRepository.findById(id);

        return profile
                .map(value -> ResponseEntity.ok(new GetProfileResponse(value)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<GetProfileResponse>> getAllProfiles(
            @RequestParam(value = "city", required = false) String city,
            @RequestParam(value = "firstName", required = false) String firstName,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        List<Profile> profiles = profileRepository.searchProfiles(
                city != null ? city : "",
                firstName != null ? firstName : "",
                PageRequest.of(page, size));

        List<GetProfileResponse> response = profiles.stream()
                .map(GetProfileResponse::new)
                .toList();

        return ResponseEntity.ok(response);
    }
}
