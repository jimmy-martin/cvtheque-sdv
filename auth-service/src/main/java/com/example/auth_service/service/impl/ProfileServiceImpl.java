package com.example.auth_service.service.impl;

import com.example.auth_service.dto.CreateProfileDto;
import com.example.auth_service.dto.UpdateProfileDto;
import com.example.auth_service.entity.Profile;
import com.example.auth_service.entity.User;
import com.example.auth_service.repository.ProfileRepository;
import com.example.auth_service.service.ProfileService;
import org.springframework.stereotype.Service;

@Service
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository profileRepository;

    public ProfileServiceImpl(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @Override
    public Profile createProfile(CreateProfileDto dto, User user) {
        Profile profile = Profile.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .city(dto.getCity())
                .phone(dto.getPhone())
                .user(user)
                .build();
        return profileRepository.save(profile);
    }

    @Override
    public Profile getProfileByUserId(Long userId) {
        return profileRepository.findByUserId(userId).orElse(null);
    }

    @Override
    public Profile updateProfileByUserId(Long userId, UpdateProfileDto dto) {
        Profile profile = profileRepository.findByUserId(userId).orElseThrow();
        if (dto.getFirstName() != null) profile.setFirstName(dto.getFirstName());
        if (dto.getLastName() != null) profile.setLastName(dto.getLastName());
        if (dto.getCity() != null) profile.setCity(dto.getCity());
        if (dto.getPhone() != null) profile.setPhone(dto.getPhone());
        return profileRepository.save(profile);
    }
}
