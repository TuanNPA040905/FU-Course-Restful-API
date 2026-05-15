package com.fu.courseplatform.service;

import com.fu.courseplatform.domain.Course;
import com.fu.courseplatform.domain.Order;
import com.fu.courseplatform.domain.User;
import com.fu.courseplatform.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getOrderByUser(User user) {
        return this.orderRepository.findByUser(user);
    }

    public Optional<Course> getOwnCourseByOrderAndCourseId(Order order, Long id) {
        return this.orderRepository.getOwnCourseByOrderAndCourseId(order, id);
    }
}
