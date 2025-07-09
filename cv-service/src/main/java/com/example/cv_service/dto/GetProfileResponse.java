package com.example.cv_service.dto;

import com.example.cv_service.entity.Profile;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class GetProfileResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String city;
    private String phone;
    private String cvUrl;

    public GetProfileResponse(Profile profile) {
        this.id = profile.getId();
        this.firstName = profile.getFirstName();
        this.lastName = profile.getLastName();
        this.city = profile.getCity();
        this.phone = profile.getPhone();
        this.cvUrl = profile.getCv() != null ? profile.getCv().getFileUrl() : null;
    }
}
