package com.jacoblehrman.sketchybusiness.appuser;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AppUserController {

    @Autowired
    private AppUserService aus;

    @PostMapping("/signup")
    public Map<String, String> signUp(@RequestBody SignupRequest sr) {
        boolean status = aus.register(sr.username, sr.password, sr.email);
        Map<String, String> response = new HashMap<>();
        if (status == true) {
            response.put("status", "200");
        } else {
            response.put("status", "404");
        }
        return response;

    }
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest lr){
        Map<String, String> response = new HashMap<>();
        try{
            aus.login(lr.usernameEmail,lr.password);
        } catch (IllegalArgumentException e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/getuserexists")
    public ResponseEntity<Map<String, Boolean>> getUserExists(@RequestBody GetUserExistsRequest request){
        Map<String, Boolean> response = new HashMap<>();
        if(request.username!=null){
            response.put("exists",aus.AppUserExistsWithUsername(request.username));
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else if (request.email!=null){
            response.put("exists",aus.AppUserExistsWithEmail(request.email));
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

     

}
