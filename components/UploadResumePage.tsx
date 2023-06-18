import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';

type UploadResumePageProps = {
  setDocumentType: React.Dispatch<React.SetStateAction<string>>;
};

const acceptedFileTypes = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'text/plain'
];

const UploadResumePage = ({ setDocumentType }: UploadResumePageProps) => {
  const [jobRole, setJobRole] = useState("");
  const jobRoles = ["Management Consulting", "Investment Banking"];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Role");
  const [firmName, setFirmName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [progressBarColor, setProgressBarColor] = useState<string>("bg-green-800"); // New state for progress bar color

  useEffect(() => {
    if(uploadError) {
      setProgressBarColor("bg-red-600");
    } else {
      setProgressBarColor("bg-green-800");
    }
  }, [uploadError]);

  const uploadFile = (file: File, valid: boolean) => {
    let progress = 0;
    setIsUploaded(false);
    setUploadProgress(0); // Reset progress bar whenever a new file is uploaded
    const uploadInterval = setInterval(() => {
      progress += 0.5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(uploadInterval);
        if(valid){
          setIsUploaded(true);
          setUploadedFile(file);
          setUploadError(null);
        } else {
          setUploadError('Invalid file type. Only PDF, DOCX, DOC, and TXT files are allowed.');
        }
      }
    }, 1);
}

const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      if (file && acceptedFileTypes.includes(file.type)) {
        uploadFile(file, true);
      } else {
        uploadFile(file, false);
      }
    }
  });

  const canGenerateResume = isUploaded && selectedRole !== "Role" && !uploadError;

  return (
<div className="flex flex-col items-center justify-center bg-[#FAF2D2] rounded-lg border-2 border-black p-10 md:px-20 md:py-16 lg:px-28 lg:py-24">

<h1 className="text-2xl sm:text-4xl md:text-6xl font-bold py-10 text-center">Upload Your Resume</h1>

<div className="flex flex-col items-center justify-center bg-white rounded-lg border-2 border-black p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 mx-2 sm:mx-8 max-w-screen-md">
  
      
      <div className="w-full h-2  mb-2 rounded-full">
      <div className={`h-full text-xs text-center text-white ${progressBarColor} rounded-full`} style={{ width: `${uploadProgress}%` }}></div>
    </div>
        <div className="flex items-center justify-center w-full">
          <div {...getRootProps()} className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-100 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-200 dark:hover:bg-gray-300">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
</svg>

              
{uploadedFile ? (
  <>
{!uploadError ? (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: .5 }} // delay the animation until the progress bar is filled
  >
    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
      <span className="font-semibold">{uploadedFile.name}</span>
    </p>
    <p className="text-xs text-green-700 dark:text-green-500 flex items-center">
      Resume uploaded successfully!
      <a href={URL.createObjectURL(uploadedFile)} download={uploadedFile.name} className="ml-1">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
</svg>

      </a>
    </p>
  </motion.div>
) : (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
  >
    <p className="text-xs text-red-600 dark:text-red-800">
      {uploadError}
    </p>
  </motion.div>
)}
  </>
) : (
  <>
    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
      <span className="font-semibold">Click to upload</span> or drag and drop<span className="text-red-500">*</span>
    </p>
    <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOCX, DOC, TXT</p>
    {uploadError && (
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-xs text-red-600 dark:text-red-800">
          {uploadError}
        </p>
      </motion.div>
    )}
  </>
)}




            </div>
            <input {...getInputProps()} id="dropzone-file" type="file" className="hidden" accept={acceptedFileTypes.join(',')} />
          </div>
        </div>
        <div className="relative w-full md:w-auto flex justify-center">
        <button
    onClick={() => setIsOpen(!isOpen)}
    className="relative justify-left inline-block px-4 py-2 font-medium group m-2 w-full sm:w-60 bg-[#FAF2D2] rounded-lg"
    tabIndex={0} 
    style={{ maxWidth: '350px' }}
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
    <div className="absolute left-0 min-w-full justify-center rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 text-gray-700 z-50">
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
            className="block justify-center items-center w-full text-center px-4 py-2 text-sm hover:bg-gray-100"
          >
            {role}
          </a>
        ))}
      </div>
    </div>
  )}
</div>

        <div className="mt-4 w-full md:w-2/3 lg:w-full">
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

        <AnimatePresence>
          {canGenerateResume && (
            <motion.button
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className="mt-4 px-4 py-2 font-medium group m-4 w-full sm:w-3/4 md:w-1/2 lg:w-full xl:w-full bg-[#FAF2D2] rounded-lg"
            >
                Generate Resume Edits
            </motion.button>
          )}
        </AnimatePresence>
        <motion.button 
  className="text-2xl md:text-3xl mt-4 left-1/2 p-2" 
  onClick={() => setDocumentType("Resume")}
  whileHover={{ x: [3, -5, 3, -5, 3] }}
  transition={{ duration:2, repeat: Infinity, repeatType: "loop" }}
>
  &#8592;
</motion.button>
        
      </div>
    </div>
  );
};

export default UploadResumePage;
