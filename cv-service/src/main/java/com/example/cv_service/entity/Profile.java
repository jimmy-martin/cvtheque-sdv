package com.example.cv_service.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "profile")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "city")
    private String city;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "user_id")
    private Long userId;

    @OneToOne(mappedBy = "profile")
    private Cv cv;
}
