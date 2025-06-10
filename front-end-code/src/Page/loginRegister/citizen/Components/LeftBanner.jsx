import peopleImage from "../../../../assets/people.png";
import govtlogo from "../../../../assets/govtOfKerala.png";

export default function LeftBanner() {
    return (

       < div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col md:flex-row items-left font-sans">
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 p-10 text-center">
        <img
          src={govtlogo}
          alt="Kerala Seal"
          className="h-12 mb-4"
        />
        <h2 className="text-gray-700 text-lg mb-2">Welcome to</h2>
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-pink-600">K</span>
          <span className="text-blue-600">✔</span>
          <span className="text-blue-800">smart</span>
        
        </h1>
        <img 
        src={peopleImage }
          alt="Office people"
          className="rounded-md mt-2 shadow-md"
        />
        {/* Dots for carousel mimic */}
      <div className="flex space-x-1 mt-4">
        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
        <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
        <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
        <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
      </div>
        <p className="text-gray-500 mt-6 text-sm">
          One integrated platform for all the services you need
        </p>
        <p className="text-xs text-gray-400 mt-10">
          Copyright © 2024, Ksuite, Government of Kerala. | Designed & Developed by Information Kerala Mission
        </p>
      </div>
      </div>
    );
  }
  