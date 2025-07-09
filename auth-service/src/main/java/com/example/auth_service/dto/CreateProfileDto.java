package com.example.auth_service.dto;

import lombok.Data;

@Data
public class CreateProfileDto {
    private String firstName;
    private String lastName;
    private String city;
    private String phone;
}
