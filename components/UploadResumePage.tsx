import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion'; 

type UploadResumePageProps = {
    setDocumentType: React.Dispatch<React.SetStateAction<string>>;
}

const UploadResumePage = ({ setDocumentType }: UploadResumePageProps) => {
    const [jobRole, setJobRole] = useState("");
    const jobRoles = ["Management Consulting", "Investment Banking"];
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState("What job are you applying for?");
    const [firmName, setFirmName] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploaded, setIsUploaded] = useState(false);  
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);  // New state variable

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: acceptedFiles => {
        setUploadedFile(acceptedFiles[0]);
          let progress = 0;
          setIsUploaded(false);
          const uploadInterval = setInterval(() => {
            progress += .5;
            setUploadProgress(progress);
            if (progress >= 100) {
              clearInterval(uploadInterval);
              setIsUploaded(true);
              setUploadedFile(acceptedFiles[0]);  // Save the uploaded file
            }
          }, 1);
        }
    });

    const canGenerateResume = isUploaded && selectedRole !== "What job are you applying for?";

  return (
<div className="flex flex-col items-center justify-center bg-[#FAF2D2] rounded-lg border-2 border-black p-10">
      <button className="text-2xl md:text-3xl absolute left-5 top-5" onClick={() => setDocumentType("Resume")}>
        &#8592;
      </button>

      <h1 className="text-4xl md:text-6xl font-bold py-10 text-center">Upload Your Resume</h1>
      
      <div className="flex flex-col items-center justify-center bg-white rounded-lg border-2 border-black p-10">
      <div className="flex items-center justify-center w-full">
          <div {...getRootProps()} className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-100 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-200 dark:hover:bg-gray-300">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
    {uploadedFile ? (
        <>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">{uploadedFile.name}</span>
            </p>
            <p className="text-xs text-green-500 dark:text-green-800">
                Resume uploaded successfully <span>
                <a href={URL.createObjectURL(uploadedFile)} download={uploadedFile.name}>
                </a>
                </span>
            </p>
            {console.log(uploadedFile.name)}
        </>
    ) : (
        <>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PDF</p>
        </>
    )}
            </div>
            <input {...getInputProps()} id="dropzone-file" type="file" className="hidden" />
          </div>
        </div>

        <div className="relative inline-block">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="relative inline-block px-4 py-2 font-medium group m-4 w-50 bg-[#FAF2D2] rounded-lg" 
            tabIndex={0} // tabIndex should be a number
            style={{width: '400px'}}
          >
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-[#FAF2D2] border-2 border-black group-hover:bg-black"></span>
            <span className="relative text-black group-hover:text-white">
            <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
              {selectedRole}  
              <span className="text-red-500">*</span>      
            </span>
          </button>

          {isOpen && (
            <div className="absolute left-0 w-full justify-center rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 text-gray-700 z-50">
              <div className="py-1 flex flex-col items-center">
                {jobRoles.map((role, index) => (
                  <a
                    key={index}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedRole(role);
                      setIsOpen(false);
                    }}
                    className="block w-full text-center px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {role}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="firmName" className="text-xl">What firm are you applying for? (Optional)</label>
          <input
            id="firmName"
            type="text"
            placeholder="McKinsey, Goldman Sachs, BCG, etc."
            value={firmName}
            onChange={e => setFirmName(e.target.value)}
            className="mt-1 py-2 px-2 focus:ring-yellow-500 focus:yellow-indigo-500 block w-full shadow-sm sm:text-sm border-black rounded-md"
          />
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
          <div className="h-full text-xs text-center text-white bg-green-800 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
        </div>

        <AnimatePresence>
        {canGenerateResume && (
          <motion.button 
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="mt-4 px-4 py-2 font-medium group m-4 w-50 bg-[#FAF2D2] rounded-lg"
            style={{width: '400px'}}
          >
            Generate Your Resume
          </motion.button>
        )}
      </AnimatePresence>
      </div>
    </div>
  );

};

export default UploadResumePage;
