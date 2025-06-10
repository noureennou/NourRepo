package in.gov.lsgkerala.user.repository;

import in.gov.lsgkerala.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    boolean existsByEmail(String email);

    boolean existsByPhoneNumber(String phoneNumber);

    Optional<User> findByEmail(String loginId);

    Optional<User> findByPhoneNumber(String loginId);


    @Query("SELECT COUNT(u) > 0 FROM User u WHERE u.aadhaarNo IS NOT NULL AND u.aadhaarNo = :aadhaarNo")
    boolean existsByValidAadhaarNo(@Param("aadhaarNo") String aadhaarNo);

}

