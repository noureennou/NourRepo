package in.gov.lsgkerala.user.service;

import org.springframework.stereotype.Service;

@Service
public class OtpService {

    private static final String HARDCODED_OTP = "123456";

    public String sendOtp(String phoneOrEmail) {
        System.out.println("Sending OTP to " + phoneOrEmail + ": " + HARDCODED_OTP);
        return HARDCODED_OTP;
    }

    public boolean validateOtp(String phoneOrEmail, String otp) {

        return HARDCODED_OTP.equals(otp);
    }

    public String sendOtpadhaar(String adhaar) {
        System.out.println("Sending OTP to  your phone Number: " + HARDCODED_OTP);
        return HARDCODED_OTP;
    }

    public boolean validateOtpAdhaar(String aadhaarNo, String otp) {

        return HARDCODED_OTP.equals(otp);
    }
}

