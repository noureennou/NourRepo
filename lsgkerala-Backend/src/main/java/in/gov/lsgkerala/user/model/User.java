package in.gov.lsgkerala.user.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "k_smart_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id")
    private UUID id;
    @Column(unique = true)
    private String phoneNumber;
    private Integer tenantId;
    private String name;
    private Boolean isActive;
    private Boolean isKycVerified;
    private UUID aadhaarId;
    private String aadhaarNo;
    private Boolean isFirstLogin;
    private String email;
    private String whatsappNumber;
    private String userType;
    private Long regNo;
    @CreationTimestamp
    private LocalDateTime createdAt;
    private Boolean isDocumentVerified = false;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    private String dob;
    private String gender;
    private Boolean countryType;
}
