package com.fu.courseplatform.controller.client;

import com.fu.courseplatform.domain.Course;
import com.fu.courseplatform.domain.DTO.response.ResultPaginationDTO;
import com.fu.courseplatform.domain.Order;
import com.fu.courseplatform.service.CartService;
import com.fu.courseplatform.service.CourseService;
import com.fu.courseplatform.service.OrderService;
import com.fu.courseplatform.service.UserService;
import com.fu.courseplatform.util.SecurityUtil;
import com.fu.courseplatform.util.annotation.ApiMessage;
import com.turkraft.springfilter.boot.Filter;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class ItemController {
    private final CourseService courseService;
    private final UserService userService;
    private final CartService cartService;
    private final OrderService orderService;

    public ItemController(CourseService courseService, UserService userService, SecurityUtil securityUtil, CartService cartService,  OrderService orderService) {
        this.courseService = courseService;
        this.userService = userService;
        this.cartService = cartService;
        this.orderService = orderService;
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

    @PostMapping("/add-course-to-cart/{id}")
    @ApiMessage("Add course to cart")
    public ResponseEntity<String> addCourseToCart(
            @PathVariable Long id
    ) {
        String username = SecurityUtil.getCurrentUserLogin().get();
        if(username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Xin vui lòng đăng nhập");
        }
        if(this.courseService.findById(id) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Khóa học không tồn tại");
        }

        List<Order> orders = this.orderService.getOrderByUser(this.userService.handleGetUserByUsername(username));
        for (Order order : orders) {
            Optional<Course> course = this.orderService.getOwnCourseByOrderAndCourseId(order, id);

            if(course.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bạn đã sở hữu khóa học");
            }
        }

        boolean checkAdd = this.cartService.handleAddCourseToCart(username, id);
        if(!checkAdd) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Thêm khóa học thất bại!");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Thêm khóa học thành công");
    }
}
