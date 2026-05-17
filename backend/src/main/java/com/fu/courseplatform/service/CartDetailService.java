package com.fu.courseplatform.service;

import com.fu.courseplatform.domain.Cart;
import com.fu.courseplatform.domain.CartDetail;
import com.fu.courseplatform.domain.Course;
import com.fu.courseplatform.domain.DTO.response.ResultPaginationDTO;
import com.fu.courseplatform.domain.User;
import com.fu.courseplatform.repository.CartDetailRepository;
import com.fu.courseplatform.repository.CartRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartDetailService {
    private final CartDetailRepository cartDetailRepository;
    private final CartRepository cartRepository;

    public CartDetailService(CartDetailRepository cartDetailRepository, CartRepository cartRepository) {
        this.cartDetailRepository = cartDetailRepository;
        this.cartRepository = cartRepository;
    }

    public Optional<CartDetail> findByCartAndCourse(Cart cart, Course course) {
        return this.cartDetailRepository.findByCartAndCourse(cart, course);
    }

    public CartDetail save(CartDetail cartDetail) {
        return this.cartDetailRepository.save(cartDetail);
    }

    public List<CartDetail> findAllByUser(User user) {
        Cart cart = this.cartRepository.findByUser(user);
        return this.cartDetailRepository.findByCart(cart);
    }
}
