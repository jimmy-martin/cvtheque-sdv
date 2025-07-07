package com.example.cv_service.repository;

import com.example.cv_service.entity.Cv;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CvRepository extends JpaRepository<Cv, Long> {
    List<Cv> findByProfileId(Long profileId);
}
