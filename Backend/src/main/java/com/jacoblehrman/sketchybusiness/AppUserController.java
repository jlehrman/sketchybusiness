package com.jacoblehrman.sketchybusiness;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppUserController {
    @GetMapping("/hello")
    public String hello(){
        return "hello";
    }
}
