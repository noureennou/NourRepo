package in.gov.lsgkerala.user.controller;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import in.gov.lsgkerala.user.repository.UserRepository;
import in.gov.lsgkerala.user.service.OtpService;
import in.gov.lsgkerala.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping
@RestController
@AllArgsConstructor
public class OtpController {

    @Autowired
    private OtpService otpService;
    private final UserService userService;
    private final UserRepository userRepository;

    @PostMapping("/otp_send")
    public ResponseEntity<Map<String, String>> sendOtp(@RequestBody Map<String, String> payload) {
        String phoneNumber = payload.get("phoneNumber");
        String email = payload.get("email");

        String countryTypeStr = payload.get("countryType");  // "true" or "false"

        boolean isAbroad = Boolean.parseBoolean(countryTypeStr);


        Map<String, String> response = new HashMap<>();

        if (isAbroad) {
            if (email == null || email.isEmpty()) {
                response.put("status", "EMAIL_REQUIRED");
                return ResponseEntity.ok(response);
            }
            if (userRepository.existsByEmail(email)) {
                response.put("status", "ALREADY_REGISTERED");
                return ResponseEntity.ok(response);
            }
            otpService.sendOtp(email); // Send to email
        } else {
            if (phoneNumber == null || phoneNumber.isEmpty()) {
                response.put("status", "PHONE_REQUIRED");
                return ResponseEntity.ok(response);
            }
            if (userRepository.existsByPhoneNumber(phoneNumber)) {
                response.put("status", "ALREADY_REGISTERED");
                return ResponseEntity.ok(response);
            }
            otpService.sendOtp(phoneNumber); // Send to phone
        }

        response.put("status", "OTP_SENT");
        return ResponseEntity.ok(response);
    }


    @PostMapping("/otp_verify")
    public String verifyOtp(@RequestBody Map<String, String> payload) {
        String phoneOrEmail = payload.get("phoneNumber") != null
                ? payload.get("phoneNumber")
                : payload.get("email");
        String otp = payload.get("otp");

        boolean isValid = otpService.validateOtp(phoneOrEmail, otp);
        return isValid ? "OTP verified successfully." : "Invalid OTP.";
    }



    @PostMapping("/otp_sendAdhaar")
    public ResponseEntity<Map<String, String>> sendOtpAdhaar1(@RequestBody Map<String, String> request) {

        String aadhaarNo = request.get("aadhaarNo");
        Map<String, String> response = new HashMap<>();

        if (userRepository.existsByValidAadhaarNo(aadhaarNo)) {
            response.put("status", "AADHAAR Already Exist");
            return ResponseEntity.ok(response);
        }

        otpService.sendOtpadhaar(aadhaarNo);
        response.put("status", "OTP_SENT");
        return ResponseEntity.ok(response);
    }
    @PostMapping("/otp_verifyAdhaar")
    public String verifyOtpAadhaar(@RequestParam String aadhaarNo, @RequestParam String otpAdhaar) {

        boolean isValid = otpService.validateOtpAdhaar(aadhaarNo, otpAdhaar);
        return isValid ? "OTP verified successfully." : "Invalid OTP.";

    }



}