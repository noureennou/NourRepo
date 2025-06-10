package in.gov.lsgkerala.user.controller;

import in.gov.lsgkerala.user.contract.LoginRequest;
import in.gov.lsgkerala.user.contract.UserRequest;
import in.gov.lsgkerala.user.service.LoginService;
import in.gov.lsgkerala.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
@RequestMapping
@RestController
public class UserController {
    private final UserService userService;
    private final LoginService loginService;
    @PostMapping("/signup")
    public UserRequest saveUserPhoneNumber(@RequestBody UserRequest request){
        return userService.saveUser(request);
    }

@PostMapping("/signin")
public ResponseEntity<String> checkLoginId(@RequestBody LoginRequest loginId) {
    String response = loginService.verifyLogin(loginId);
    return ResponseEntity.ok(response);
}


    @PostMapping("/saveAadhaar")
    public UserRequest saveAdhaar(@RequestBody UserRequest adhaar){
        return userService.saveAadhaar(adhaar);
    }
}
