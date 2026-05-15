package com.fu.courseplatform.service;

import com.fu.courseplatform.domain.Cart;
import com.fu.courseplatform.domain.CartDetail;
import com.fu.courseplatform.domain.Course;
import com.fu.courseplatform.domain.User;
import com.fu.courseplatform.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {
    private final CartRepository cartRepository;
    private final UserService userService;
    private final CourseService courseService;
    private final CartDetailService cartDetailService;

    public CartService(CartRepository cartRepository,  UserService userService, CourseService courseService,  CartDetailService cartDetailService) {
        this.cartRepository = cartRepository;
        this.userService = userService;
        this.courseService = courseService;
        this.cartDetailService = cartDetailService;
    }

    public Cart getCartByUser(User user) {
        return this.cartRepository.findByUser(user);
    }

    public boolean handleAddCourseToCart(String username, Long id) {
        User user = this.userService.handleGetUserByUsername(username);
        Cart cart = this.getCartByUser(user);
        if(cart == null) {
            Cart newCart = new Cart();
            newCart.setUser(user);
            newCart.setSum(0);
            newCart = this.cartRepository.save(newCart);
            cart = newCart;
        }
        Course course = this.courseService.findById(id);
        if(course == null) {
            Optional<CartDetail> oldDetail = this.cartDetailService.findByCartAndCourse(cart, course);
            if(!oldDetail.isPresent()) {
                CartDetail cd = new CartDetail();
                cd.setCart(cart);
                cd.setCourse(course);
                cd.setPrice(course.getPrice());
                this.cartDetailService.save(cd);

                int s = cart.getSum() + 1;
                cart.setSum(s);
                this.cartRepository.save(cart);
                return true;
            } else {
                this.cartDetailService.save(oldDetail.get());
                return true;
            }
        }
        return false;
    }
}
