package com.app.repositry;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

}
