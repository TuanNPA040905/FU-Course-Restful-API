package com.fu.courseplatform.repository;

import com.fu.courseplatform.domain.Course;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long>, JpaSpecificationExecutor<Course> {
    // Repository
    @Query("SELECT c FROM Course c WHERE c.price > 500000 AND c.active = true ORDER BY c.createdAt DESC")
    List<Course> findHotCourses(Pageable pageable);

    @Query("SELECT c FROM Course c WHERE c.price = 0 AND c.active = true ORDER BY c.createdAt DESC")
    List<Course> findFreeCourses(Pageable pageable);
}
