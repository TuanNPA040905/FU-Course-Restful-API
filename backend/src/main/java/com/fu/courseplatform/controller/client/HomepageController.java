package com.fu.courseplatform.controller.client;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomepageController {

    @GetMapping("/")
    public String getHomePage() {
        return "Hello World!";
    }
}
