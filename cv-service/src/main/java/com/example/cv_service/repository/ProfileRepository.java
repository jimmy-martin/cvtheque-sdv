package com.example.cv_service.repository;

import com.example.cv_service.entity.Profile;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    @Query("SELECT p FROM Profile p WHERE " +
            "(:city IS NULL OR LOWER(p.city) LIKE LOWER(CONCAT('%', :city, '%'))) AND " +
            "(:firstName IS NULL OR LOWER(p.firstName) LIKE LOWER(CONCAT('%', :firstName, '%'))) " +
            "AND (p.firstName IS NOT NULL AND p.firstName <> '') " +
            "AND (p.lastName IS NOT NULL AND p.lastName <> '')")
    List<Profile> searchProfiles(String city, String firstName, Pageable pageable);

    Optional<Profile> findByUserId(Long userId);
}
