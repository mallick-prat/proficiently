import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import UploadResumePage from '../components/UploadResumePage';


export default function RefineryPage() {
    const router = useRouter();
    const [documentType, setDocumentType] = useState("");
    const documentTypes = ["Resume", "Cover Letter"];
    const resumeOptions = ["Upload Your Resume", "Create Resume from Template", "Import Resume from LinkedIn", "Create Resume from Scratch"];
    const buttonStyle = "relative inline-block px-4 py-2 font-medium group m-2 w-50 bg-[#FAF2D2] rounded-lg";
  
    const backButton = (
        <div className="flex items-center cursor-pointer text-white hover:text-gray-300 transition-all" onClick={() => setDocumentType("")}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>
        </div>
      );


      return (
        <div className="min-h-[100vh] w-screen flex flex-col items-start justify-center relative bg-[#FAF2D2] font-inter overflow-hidden">
          {documentType !== "" && (
            <button className="text-2xl md:text-3xl absolute left-5 top-5" onClick={() => setDocumentType("")}>
              &#8592;
            </button>
          )}
    
          <div className="flex flex-col items-center w-full justify-center flex-grow">
            <AnimatePresence>
              {documentType === "" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.15,
                    ease: [0.23, 1, 0.82, 1],
                  }}
                  className="flex flex-col items-center justify-center bg-white rounded-lg border-2 border-black p-10">
                  {documentTypes.map((type) => (
                    <motion.button
                      key={type}
                      className={buttonStyle}
                      onClick={() => setDocumentType(type)}
                      style={{ width: '200px' }}
                      disabled={type === "Cover Letter"}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                    >
                      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                      <span className="absolute inset-0 w-full h-full bg-[#FAF2D2] border-2 border-black group-hover:bg-black"></span>
                      <span className="relative text-black group-hover:text-white">{type}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
    
              {documentType === "Resume" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.15,
                    ease: [0.23, 1, 0.82, 1],
                  }}
                  className="flex flex-col items-center justify-center bg-white rounded-lg border-2 border-black p-10">
                  {resumeOptions.map((option, i) => (
                    <motion.button
                      key={option}
                      className={buttonStyle}
                      style={{ width: '400px' }}
                      onClick={() => setDocumentType(option)}
                      disabled={option === "Create Resume from Template" || option === "Import Resume from LinkedIn" || option === "Create Resume from Scratch"}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: -i * 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -i * 20 }}
                    >
                      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                      <span className="absolute inset-0 w-full h-full bg-[#FAF2D2] border-2 border-black group-hover:bg-black"></span>
                      <span className="relative text-black group-hover:text-white">{option}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
    
              {documentType === "Upload Your Resume" && <UploadResumePage setDocumentType={setDocumentType} />}
              
            </AnimatePresence>
          </div>
        </div>
      );
}

