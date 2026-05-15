package com.fu.courseplatform.repository;

import com.fu.courseplatform.domain.Cart;
import com.fu.courseplatform.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart,Long> {

    Cart findByUser(User user);
}
