package com.fu.courseplatform.controller.admin;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class DashboardController {
//    private final UserService userService;
//    private final CourseService courseService;
//    private final OrderService orderService;
//    private final OrderCourseService orderCourseService;
//
//    // Constructor injection giữ nguyên...
//
//    @GetMapping("/dashboard")
//    @Secured("ADMIN") // ← Thay cho việc check session thủ công
//    public ResponseEntity<RestResponse<DashboardDTO>> getDashboard() {
//
//        // Gom data vào 1 DTO
//        DashboardDTO data = new DashboardDTO();
//        data.setTotalUsers(this.userService.findAll().size());
//        data.setTotalCourses(this.courseService.getAllCourse().size());
//        data.setTotalOrders(this.orderService.getAllOrders().size());
//        data.setTotalRevenue(this.orderService.totalRevenue());
//        data.setTopCourses(this.orderCourseService.getTopFiveSellCourse());
//
//        // Wrap vào RestResponse
//        RestResponse<DashboardDTO> res = new RestResponse<>();
//        res.setStatusCode(200);
//        res.setMessage("Lấy dữ liệu dashboard thành công");
//        res.setData(data);
//
//        return ResponseEntity.ok(res);
//    }

}
