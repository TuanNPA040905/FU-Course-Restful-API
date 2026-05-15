package com.fu.courseplatform.repository;

import com.fu.courseplatform.domain.Cart;
import com.fu.courseplatform.domain.CartDetail;
import com.fu.courseplatform.domain.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartDetailRepository extends JpaRepository<CartDetail, Long> {
    Optional<CartDetail> findByCartAndCourse(Cart cart, Course course);
}
