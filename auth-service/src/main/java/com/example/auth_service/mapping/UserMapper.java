package com.example.auth_service.mapping;

import com.example.auth_service.dto.UserResponseDto;
import com.example.auth_service.entity.User;

import java.util.List;

public class UserMapper {
    public static UserResponseDto mapToDto(User user) {
        List<String> roles = user.getRoles()
                .stream()
                .map(role -> role.getName())
                .toList();

        return new UserResponseDto(user.getId(), user.getEmail(), roles);
    }
}
