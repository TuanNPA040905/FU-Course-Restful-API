package com.fu.courseplatform.repository;

import com.fu.courseplatform.domain.Course;
import com.fu.courseplatform.domain.Order;
import com.fu.courseplatform.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);

    @Query("SELECT c FROM Order o JOIN o.courses c WHERE o = :order AND c.id = :courseId")
    Optional<Course> getOwnCourseByOrderAndCourseId(
            @Param("order") Order order,
            @Param("courseId") Long courseId
    );
}
