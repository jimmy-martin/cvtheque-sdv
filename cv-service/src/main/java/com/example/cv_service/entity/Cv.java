package com.example.cv_service.entity;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "cvs")
public class Cv {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "profile_id", nullable = false, referencedColumnName = "id")
    private Profile profile;

    @Column(name = "file_url", nullable = false)
    private String fileUrl;

    @Column(name = "uploaded_at")
    private LocalDateTime uploadedAt = LocalDateTime.now();

    @Column(name = "original_filename")
    private String originalFilename;
}