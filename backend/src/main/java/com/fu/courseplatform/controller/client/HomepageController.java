package com.fu.courseplatform.controller.client;

import com.fu.courseplatform.domain.Course;
import com.fu.courseplatform.domain.DTO.response.ClientPage.HomeCoursesResponse;
import com.fu.courseplatform.domain.DTO.response.ResultPaginationDTO;
import com.fu.courseplatform.service.CourseService;
import com.fu.courseplatform.util.annotation.ApiMessage;
import com.turkraft.springfilter.boot.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class HomepageController {

    private final CourseService courseService;

    public HomepageController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/home")
    @ApiMessage("Get homepage data")
    public ResponseEntity<HomeCoursesResponse> getHomePage() {
        List<Course> hotCourses = this.courseService.findHotCourses(4);
        List<Course> freeCourses = this.courseService.findFreeCourses(4);
        HomeCoursesResponse homeCoursesResponse = new HomeCoursesResponse();
        homeCoursesResponse.setFreeCourse(freeCourses);
        homeCoursesResponse.setHotCourse(hotCourses);
        return ResponseEntity.ok(homeCoursesResponse);
    }

    @GetMapping("/client/courses")
    @ApiMessage("Get all courses")
    public ResponseEntity<ResultPaginationDTO> getAllCourses(
            @Filter Specification<Course> spec,
            Pageable pageable
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(this.courseService.fetchAllCourse(spec, pageable));
    }

}
