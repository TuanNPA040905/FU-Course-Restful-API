package com.fu.courseplatform.service;

import com.fu.courseplatform.domain.Cart;
import com.fu.courseplatform.domain.CartDetail;
import com.fu.courseplatform.domain.Course;
import com.fu.courseplatform.repository.CartDetailRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartDetailService {
    private final CartDetailRepository cartDetailRepository;

    public CartDetailService(CartDetailRepository cartDetailRepository) {
        this.cartDetailRepository = cartDetailRepository;
    }

    public Optional<CartDetail> findByCartAndCourse(Cart cart, Course course) {
        return this.cartDetailRepository.findByCartAndCourse(cart, course);
    }

    public CartDetail save(CartDetail cartDetail) {
        return this.cartDetailRepository.save(cartDetail);
    }
}
