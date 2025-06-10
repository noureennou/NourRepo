package in.gov.lsgkerala.user.service;

import com.sun.jdi.connect.Connector;
import in.gov.lsgkerala.user.contract.UserRequest;
import in.gov.lsgkerala.user.model.User;
import in.gov.lsgkerala.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public UserRequest saveUser(UserRequest request) {
        Boolean isAbroad = request.getCountryType();

            User user = modelMapper.map(request, User.class);
            if (isAbroad) {
            if (request.getEmail() == null || request.getEmail().isEmpty()) {
                throw new IllegalArgumentException("Email is required for users abroad.");
            }
         if (userRepository.existsByEmail(user.getEmail())){
             throw new IllegalArgumentException("User already exists with this Email Id.");
         }

        }
        else {
            if (request.getPhoneNumber() == null || request.getPhoneNumber().isEmpty()) {
                throw new IllegalArgumentException("Phone number is required for users in India.");}
                if (userRepository.existsByPhoneNumber(user.getPhoneNumber())){
                    throw new IllegalArgumentException("User  already exists with This Phone Number.");
                }

        }

            User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserRequest.class);

        }

    public UserRequest saveAadhaar(UserRequest aadhaar) {
        if (aadhaar.getAadhaarNo() != null && userRepository.existsByValidAadhaarNo(aadhaar.getAadhaarNo())) {
            throw new RuntimeException("Aadhaar Already Present");
        }

        User user;

        if (aadhaar.getId() != null && userRepository.findById(aadhaar.getId()).isPresent()) {

            user = userRepository.findById(aadhaar.getId()).get();
            user.setAadhaarNo(aadhaar.getAadhaarNo());

        } else {

            user = modelMapper.map(aadhaar, User.class);
        }

        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserRequest.class);
    }
        }
