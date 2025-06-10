package in.gov.lsgkerala.user.controller;

import in.gov.lsgkerala.user.repository.UserRepository;
import in.gov.lsgkerala.user.service.OtpService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
@AllArgsConstructor
@RequestMapping
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class otpControllerLogin {

    @Autowired
    private OtpService otpService;
    private final UserRepository userRepository;

    @PostMapping("/otp_sendLogin")
    public ResponseEntity<Map<String, String>> sendOtp(@RequestBody Map<String, String> payload) {
        String phoneNumber = payload.get("phoneNumber");
        String email = payload.get("email");

        Map<String, String> response = new HashMap<>();

        if (phoneNumber != null && !phoneNumber.isBlank()) {
            if (userRepository.existsByPhoneNumber(phoneNumber)) {
                otpService.sendOtp(phoneNumber); // You may want to implement sendOtpToEmail if needed
                response.put("status", "OTP_SENT");
                return ResponseEntity.ok(response);
            }
        }

        if (email != null && !email.isBlank()) {
            if (userRepository.existsByEmail(email)) {
                otpService.sendOtp(email);  // Ensure this method handles email OTPs
                response.put("status", "OTP_SENT");
                return ResponseEntity.ok(response);
            }
        }

        response.put("status", "No account present");
        return ResponseEntity.ok(response);
    }
}


