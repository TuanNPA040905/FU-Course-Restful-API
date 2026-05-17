package com.fu.courseplatform.repository;

import com.fu.courseplatform.domain.Cart;
import com.fu.courseplatform.domain.CartDetail;
import com.fu.courseplatform.domain.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartDetailRepository extends JpaRepository<CartDetail, Long>, JpaSpecificationExecutor<CartDetail> {
    Optional<CartDetail> findByCartAndCourse(Cart cart, Course course);

    List<CartDetail> findByCart(Cart cart);
}
