package com.example.auth_service.dto;

import lombok.Data;

@Data

public class UpdateProfileDto {
    private String firstName;
    private String lastName;
    private String city;
    private String phone;
}
