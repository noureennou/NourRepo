import { useState } from "react";
import AccountCreated from "./AccountCreated";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function OTPVerification({ contact, countryType, phoneNumber, email , mode}) {

    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [step, setStep] = useState("verify"); 
    const [userId, setUserId] = useState(null);

     const navigate = useNavigate();
      const handleVerify = async () => {
        setMessage('');
        setError('');

setUserId(userId);
        try{


      const payload = countryType
  ? { email, otp }
  : { phoneNumber, otp };
    
            
    console.log("Payload being sent to /otp_verify:", payload);
            
        const response = await axios.post('http://localhost:8088/demo-service/otp_verify',payload)
            
    
          if (response.data === "OTP verified successfully.") {


        const saveRes = await axios.post("http://localhost:8088/demo-service/signup", {
          phoneNumber,
          email,
          countryType        });

          const userId = saveRes.data.id;
          
            setUserId(userId);
         setStep("done");
         setMessage("User registered successfully!");
        console.log("Saved user:", saveRes.data);
        
      } else {
        setError("Invalid OTP.");
      }
    } catch {
      setError("Verification failed.");
    }
  
  };
         
      
    
  
    return (
      
   <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col md:flex-row items-center justify-center font-sans">
     {step === "verify" ? (
    <div className="w-full md:w-[100%] max-w-md p-6 bg-white shadow-xl rounded-xl">
      <button className="text-gray-400 text-2xl mb-4">←</button>
      <h2 className="text-2xl font-semibold mb-1"style={{textAlign:"center"}}>Sign Up <span className="text-pink-600">K-SMART</span></h2>
      <h2 className="text-blue-1000 text-xl mb-4" style={{textAlign:"center"}}> Registration</h2>
      <p className="text-gray-600 text-sm  mb-4">To complete your registration, please fill in all the fields below</p>
   
      <div className="flex items-center space-x-4 mb-4">
        <label className="flex items-center space-x-2"style={{marginLeft:250}}>
          <input
            type="radio"
            name="country" 
            
          />
          <span >India</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="country"
            
          />
          <span>Abroad</span>
        </label>
      </div>

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
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      {message && <p className="text-green-600 text-sm mb-2">{message}</p>}
      <p className="text-sm text-center text-gray-600 mt-6">
        If you have an account? <span className="text-black font-semibold cursor-pointer"onClick={() => setStep("login")}>Login</span>
      </p>
    </div>
    
    ):(
   
         <AccountCreated contact={phoneNumber || email} userId={userId} />
         
         
               )}
               {step  === "login" && (
                         <Login />
                 )}
              
     </div>
     
    )   
   
  } 
     
   
  