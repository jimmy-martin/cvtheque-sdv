package com.example.cv_service.repository;

import com.example.cv_service.entity.Profile;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    List<Profile> findAllByCityContainingIgnoreCaseAndFirstNameContainingIgnoreCase(String city, String firstName, Pageable pageable);
}
