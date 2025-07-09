package com.example.auth_service.controller;

import com.example.auth_service.dto.CreateProfileDto;
import com.example.auth_service.dto.UpdateProfileDto;
import com.example.auth_service.entity.Profile;
import com.example.auth_service.entity.User;
import com.example.auth_service.repository.UserRepository;
import com.example.auth_service.service.JwtService;
import com.example.auth_service.service.ProfileService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profiles")
@AllArgsConstructor
public class ProfileController {
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final ProfileService profileService;

    @PostMapping
    public ResponseEntity<Profile> createProfile(@RequestBody CreateProfileDto dto,
            @RequestHeader("Authorization") String authHeader) {
        Long userId = extractUserId(authHeader);
        User user = userRepository.findById(userId).orElseThrow();
        Profile profile = profileService.createProfile(dto, user);
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/me")
    public ResponseEntity<Profile> getMyProfile(@RequestHeader("Authorization") String authHeader) {
        Long userId = extractUserId(authHeader);
        Profile profile = profileService.getProfileByUserId(userId);
        return ResponseEntity.ok(profile);
    }

    @PatchMapping("/me")
    public ResponseEntity<Profile> updateMyProfile(@RequestBody UpdateProfileDto dto,
            @RequestHeader("Authorization") String authHeader) {
        Long userId = extractUserId(authHeader);
        Profile updated = profileService.updateProfileByUserId(userId, dto);
        return ResponseEntity.ok(updated);
    }

    private Long extractUserId(String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        return jwtService.extractUserId(token);
    }

}
