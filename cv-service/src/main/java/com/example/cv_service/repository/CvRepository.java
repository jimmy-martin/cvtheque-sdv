package com.example.cv_service.repository;

import com.example.cv_service.entity.Cv;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CvRepository extends JpaRepository<Cv, Long> {
    List<Cv> findByProfileId(Long profileId);

    @Modifying
    @Query("DELETE FROM Cv c WHERE c.profile.id = :profileId")
    void deleteByProfileId(@Param("profileId") Long profileId);
}
