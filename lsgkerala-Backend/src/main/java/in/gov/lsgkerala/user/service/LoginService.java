package in.gov.lsgkerala.user.service;

import in.gov.lsgkerala.user.contract.LoginRequest;
import in.gov.lsgkerala.user.model.User;
import in.gov.lsgkerala.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class LoginService {
    private final UserRepository userRepository;

    public String verifyLogin(LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String phoneNumber = loginRequest.getPhoneNumber();
        Optional<User> user = Optional.empty();

        if (email != null && !email.isEmpty()) {
            user = userRepository.findByEmail(email);
        } else if (phoneNumber != null && !phoneNumber.isEmpty()) {
            user = userRepository.findByPhoneNumber(phoneNumber);
        }

        if (user.isEmpty()) {
            throw new RuntimeException("No user found with this id");
        }

        return "Please enter OTP";
    }

}





