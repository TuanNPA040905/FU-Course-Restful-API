package com.fu.courseplatform.controller.client;

import com.fu.courseplatform.domain.CartDetail;
import com.fu.courseplatform.domain.Course;
import com.fu.courseplatform.domain.DTO.response.ClientPage.MessageDTO;
import com.fu.courseplatform.domain.DTO.response.ResultPaginationDTO;
import com.fu.courseplatform.domain.Order;
import com.fu.courseplatform.service.*;
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
    private final CartDetailService cartDetailService;

    public ItemController(CourseService courseService, UserService userService, SecurityUtil securityUtil, CartService cartService,  OrderService orderService, CartDetailService cartDetailService) {
        this.courseService = courseService;
        this.userService = userService;
        this.cartService = cartService;
        this.orderService = orderService;
        this.cartDetailService = cartDetailService;
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
    public ResponseEntity<MessageDTO> addCourseToCart(
            @PathVariable Long id
    ) {
        MessageDTO messageDTO = new MessageDTO();
        Optional<String> optionalUserName= SecurityUtil.getCurrentUserLogin();
        if(!optionalUserName.isPresent()) {
            messageDTO.setSuccess(false);
            messageDTO.setMessage("Xin vui lòng đăng nhập");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageDTO);
        }
        String username = optionalUserName.get();
        if(this.courseService.findById(id) == null) {
            messageDTO.setSuccess(false);
            messageDTO.setMessage("Khóa học không tồn tại");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageDTO);
        }

        List<Order> orders = this.orderService.getOrderByUser(this.userService.handleGetUserByUsername(username));
        for (Order order : orders) {
            Optional<Course> course = this.orderService.getOwnCourseByOrderAndCourseId(order, id);

            if(course.isPresent()) {
                messageDTO.setSuccess(false);
                messageDTO.setMessage("Bạn đã sở hữu khóa học");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(messageDTO);
            }
        }

        boolean checkAdd = this.cartService.handleAddCourseToCart(username, id);
        if(!checkAdd) {
            messageDTO.setSuccess(false);
            messageDTO.setMessage("Thêm khóa học thất bại!");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(messageDTO);
        }
        messageDTO.setSuccess(true);
        messageDTO.setMessage("Thêm khóa học thành công");
        return ResponseEntity.status(HttpStatus.OK).body(messageDTO);
    }

    @GetMapping("/cart")
    @ApiMessage("Open cart")
    public ResponseEntity<List<CartDetail>> getCartDetail() {
        Optional<String> username = SecurityUtil.getCurrentUserLogin();
        if(!username.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        List<CartDetail> cartDetails = this.cartDetailService.findAllByUser(this.userService.handleGetUserByUsername(username.get()));
        return ResponseEntity.status(HttpStatus.OK).body(cartDetails);
    }
}
