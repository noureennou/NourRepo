import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./Login";
import KYCVerified from "./KYCVerified";
export default function OTPVerificationAdhaar ({ adhaarNo, contact,userId}) {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState("verifyUid");
  const [countryType, setCountryType] = useState("India");

  const navigate = useNavigate();

  const handleVerify = async () => {
  setMessage("");
  setError("");
 console.log(userId);
  try {

     
    const response = await axios.post(
      "http://localhost:8088/demo-service/otp_verifyAdhaar",
      null,
      {
        params: {
          aadhaarNo: adhaarNo,
          otpAdhaar: otp,
          
        },
      }
    );

    if (response.data === "OTP verified successfully.") {
     const payload = {
      aadhaarNo:adhaarNo,
        otp,
        id:userId,
        isKycVerified:"true",
        ...(contact.includes("@")
          ? { email: contact }
          : { phoneNumber: contact }),
      };

      console.log("Payload to be sent:", payload);

      const saveRes = await axios.post(
        "http://localhost:8088/demo-service/saveAadhaar",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setStep("kycverified");
      setMessage("KYC Verification Success!");
      console.log("Saved user:", saveRes.data);
    } else {
      setError("Invalid OTP.");
    }
  } catch (err) {
    console.error("Error during verification:", err.response?.data || err.message);
    setError("Verification failed.");
  }
};
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center font-sans">
      {step === "verifyUid" ? (
        <div className="w-full md:w-[100%] max-w-md p-6 bg-white shadow-xl rounded-xl">
          <button className="text-gray-400 text-2xl mb-4">←</button>
          <h2 className="text-2xl font-semibold mb-1 text-center">
            Sign Up <span className="text-pink-600">K-SMART</span>
          </h2>
          <h2 className="text-blue-1000 text-xl mb-4 text-center">Registration</h2>
          <p className="text-gray-600 text-sm mb-4">
            To complete your registration, please fill in all the fields below
          </p>

        
        
      

          <div className="mb-2">
            <label className="block text-gray-700 text-sm mb-1">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="xxxxxx"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <p className="text-red-600 text-sm mb-4">Please enter the OTP sent to your number</p>
          </div>

          <button
            onClick={handleVerify}
            className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded"
          >
            Verify OTP
          </button>

          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          {message && <p className="text-green-600 text-sm mt-2">{message}</p>}

          <p className="text-sm text-center text-gray-600 mt-6">
            If you have an account?{" "}
            <span className="text-black font-semibold cursor-pointer" onClick={() => setStep("login")}>Login</span>
          </p>
        </div>
      ):(

        <KYCVerified contact={contact} userId={userId}/>
      )}
      {step  === "login" && (
          <Login contact={contact} />
  )}
      </div>
  )
}

         