package in.gov.lsgkerala.user.contract;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {

    private String phoneNumber;
    private String email;
    private String otp;
    private String aadhaarNo;
}
