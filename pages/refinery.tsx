import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import UploadBox, { downloadUrl, file } from "@/components//uploadBox";
import ResumeGenerator from "@/components/resumeGenerator";

export default function RefineryPage() {
  const [file, setFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [data, setData] = useState(null);

  // jsonData.content contains the text of the resume
  const parsePDF = async (file: File) => {
    try {
      let data = new FormData();
      data.append('pdf', file);

      let response = await fetch('http://localhost:5000/api/parsePDF', {
        method: 'post',
        body: data,
      });

      const jsonData = await response.json();
      if (jsonData.status === 0) {
        alert("There was an error processing your pdf file. Please try again.")
        return;
      }
      setData(jsonData);
      // TODO: do stuff with the parsed text and display it on frontend
      //  more specifically, if "Get Resume Edits" is pressed --> prompt GPT for edits and display them
      //                     if "Create Resume from Scratch" is pressed --> generate resume with GPT...
    } catch (error) {
      console.log('Error:', error);
      // display error message to user
      alert("There was an error processing your pdf file. Please try again.")
    }
  };

  const handleFileUpload = (uploadedFile: File, url: string) => {
    setFile(uploadedFile);
    setDownloadUrl(url);
    parsePDF(uploadedFile);
  };

  const router = useRouter();
  const [documentType, setDocumentType] = useState("");
  const documentTypes = ["Resume", "Cover Letter"];
  const resumeOptions = [
    "Get Resume Edits",
    "Create Resume from Scratch",
    "Create Resume with LinkedIn",
  ];
  const buttonStyle =
    "relative inline-block px-4 py-2 font-medium group m-2 w-full md:w-50 bg-[#FAF2D2] rounded-lg";

  const backButton = (
    <div
      className="flex items-center cursor-pointer text-white hover:text-gray-300 transition-all"
      onClick={() => setDocumentType("")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
        />
      </svg>
    </div>
  );

  return (
    <div className="min-h-[100vh] w-screen flex flex-col items-start justify-center relative bg-[#FAF2D2] font-inter overflow-hidden">
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
              className="flex flex-col items-center justify-center bg-white rounded-lg border-2 border-black p-10"
            >
              {documentTypes.map((type) => (
                <motion.button
                  key={type}
                  className={buttonStyle}
                  onClick={() => setDocumentType(type)}
                  style={{ width: "100%", maxWidth: "200px" }}
                  disabled={type === "Cover Letter"}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                  <span className="absolute inset-0 w-full h-full bg-[#FAF2D2] border-2 border-black group-hover:bg-black"></span>
                  <span className="relative text-black group-hover:text-white">
                    {type}
                  </span>
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
              className="flex flex-col items-center justify-center bg-white rounded-lg border-2 border-black p-10"
            >
              {resumeOptions.map((option, i) => (
                <motion.button
                  key={option}
                  className={buttonStyle}
                  style={{ width: "100%", maxWidth: "400px" }}
                  onClick={() => setDocumentType(option)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -i * 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -i * 20 }}
                >
                  <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                  <span className="absolute inset-0 w-full h-full bg-[#FAF2D2] border-2 border-black group-hover:bg-black"></span>
                  <span className="relative text-black group-hover:text-white">
                    {option}
                  </span>
                </motion.button>
              ))}

              <motion.button
                className="text-2xl md:text-3xl mt-4 left-1/2 p-2"
                onClick={() => setDocumentType("")}
                whileHover={{ x: [3, -5, 3, -5, 3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                &#8592;
              </motion.button>
            </motion.div>
          )}

          {documentType === "Get Resume Edits" && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.15,
                  ease: [0.23, 1, 0.82, 1],
                }}
                className="flex flex-col items-center justify-center bg-white rounded-lg border-2 border-black p-10 pb-4"
              >
                <UploadBox onFileUpload={handleFileUpload} />

                <motion.button
                  key="generate-resume-edits"
                  className="relative inline-block px-4 py-2 group m-2 w-full md:w-50 bg-[#FAF2D2] rounded-lg"
                  onClick={() => {
                    if (file) {
                      setDocumentType("Edits");
                    } else {
                      // Display an error message or perform any other action you want
                      console.log("Please upload a file before generating edits");
                    }
                  }}
                  style={{ width: "100%", maxWidth: "200px" }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                  <span className="absolute inset-0 w-full h-full bg-[#FAF2D2] border-2 border-black group-hover:bg-black"></span>
                  <span className="relative text-black group-hover:text-white">
                    Generate Edits{!file && <span className="text-red-500">*</span>}
                  </span>
                </motion.button>

                <motion.button
                  className="text-2xl md:text-3xl left-1/2"
                  onClick={() => setDocumentType("Resume")}
                  whileHover={{ x: [3, -5, 3, -5, 3] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                >
                  &#8592;
                </motion.button>
              </motion.div>
            </div>
          )}


          {documentType === "Create Resume from Scratch" && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.15,
                  ease: [0.23, 1, 0.82, 1],
                }}
                className="flex flex-col items-center justify-center bg-white rounded-lg border-2 border-black p-10 pb-4"
              >
                <ResumeGenerator />

                <motion.button
                  className="text-2xl md:text-3xl left-1/2"
                  onClick={() => setDocumentType("Resume")}
                  whileHover={{ x: [3, -5, 3, -5, 3] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                >
                  &#8592;
                </motion.button>
              </motion.div>
            </div>
          )}





















          {documentType === "Edits" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.15,
                ease: [0.23, 1, 0.82, 1],
              }}
              className="flex flex-col items-center justify-center bg-white rounded-lg border-2 border-black p-10"
            >
              {file && (
                <div>
                  <p>Uploaded File: {file.name}</p>
                  {downloadUrl && (
                    <a href={downloadUrl} download={file.name}>
                      Download Resume
                    </a>
                  )}
                </div>
              )}
              <motion.button
                className="text-2xl md:text-3xl left-1/2"
                onClick={() => setDocumentType("Get Resume Edits")}
                whileHover={{ x: [3, -5, 3, -5, 3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                &#8592;
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
