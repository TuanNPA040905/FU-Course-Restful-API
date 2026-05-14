package com.fu.courseplatform.controller.client;

import com.fu.courseplatform.domain.Course;
import com.fu.courseplatform.domain.DTO.response.ResultPaginationDTO;
import com.fu.courseplatform.service.CourseService;
import com.fu.courseplatform.service.UserService;
import com.fu.courseplatform.util.annotation.ApiMessage;
import com.turkraft.springfilter.boot.Filter;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class ItemController {
    private final CourseService courseService;
    private final UserService userService;

    public ItemController(CourseService courseService, UserService userService) {
        this.courseService = courseService;
        this.userService = userService;
    }

    @GetMapping("/client/courses")
    @ApiMessage("Get all courses")
    public ResponseEntity<ResultPaginationDTO> getAllCourses(
            @Filter Specification<Course> spec,
            Pageable pageable
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(this.courseService.fetchAllCourse(spec, pageable));
    }

    @GetMapping("/client/courses/{id}")
    @ApiMessage("View detail course")
    public ResponseEntity<Course> getCouresDetail(
            @PathVariable Long id
    ) {
        Course course = this.courseService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(course);
    }
}
