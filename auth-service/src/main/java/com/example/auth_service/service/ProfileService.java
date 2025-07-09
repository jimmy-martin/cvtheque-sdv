package com.example.auth_service.service;

import com.example.auth_service.dto.CreateProfileDto;
import com.example.auth_service.dto.UpdateProfileDto;
import com.example.auth_service.entity.Profile;
import com.example.auth_service.entity.User;

public interface ProfileService {

    Profile createProfile(CreateProfileDto dto, User user);
    Profile getProfileByUserId(Long userId);
    Profile updateProfileByUserId(Long userId, UpdateProfileDto dto);
}
