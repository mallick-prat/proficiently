import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

export let downloadUrl: string = "";
export let file: File | null = null;

const UploadBox: React.FC<{ onFileUpload: (file: File, downloadUrl: string) => void }> = ({ onFileUpload }) => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState<string>('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx'],
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const uploadedFile = acceptedFiles[0];
      setFileName(uploadedFile.name);
      const url = URL.createObjectURL(uploadedFile);
      try {
        onFileUpload(uploadedFile, url);
        setUploadStatus('success');
      } catch (error) {
        setUploadStatus('error');
      }
    },
  });

  const dropzoneVariants = {
    idle: {
      borderColor: "#gray-300",
      backgroundColor: "#gray-50",
    },
    success: {
      borderColor: "green-400",
      backgroundColor: "#gray-50",
    },
    error: {
      borderColor: "red-400",
      backgroundColor: "#gray-50",
    },
  };

  const dropzoneTransition = {
    duration: 0.5,
    ease: "easeInOut",
  };

  const svgVariants = {
    idle: {
      color: "#gray-400",
    },
    success: {
      color: "green-700",
    },
    error: {
      color: "red-500",
    },
  };

  const textVariants = {
    idle: {
      color: "#gray-500",
    },
    success: {
      color: "green-700",
    },
    error: {
      color: "red-500",
    },
  };

  return (
    <motion.div
      className="flex items-center justify-center w-full"
      variants={dropzoneVariants}
      initial="idle"
      animate={uploadStatus}
      transition={dropzoneTransition}
    >
      <div {...getRootProps({ className: "dropzone flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-all duration-500 ease-in-out", style: { width: "200px", height: "200px" } })}>
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center w-100 h-40">
          <motion.svg
            aria-hidden="true"
            className="w-10 h-10 mb-3 text-gray-400 transition-all duration-500 ease-in-out"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            variants={svgVariants}
            animate={uploadStatus}
            transition={dropzoneTransition}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </motion.svg>
          {uploadStatus === 'idle' && (
            <>
              <motion.p
                className="mb-2 mt-2 text-sm text-gray-500 dark:text-gray-400 transition-all duration-500 ease-in-out text-center"
                variants={textVariants}
              >
                <span className="font-semibold">Click to upload</span> or drag and drop
              </motion.p>
              <motion.p
                className="text-xs text-gray-500 dark:text-gray-400 transition-all duration-500 ease-in-out text-center"
                variants={textVariants}
              >
                PDF, TXT, DOCX, or DOC
              </motion.p>
            </>
          )}
          {uploadStatus === 'success' && (
            <motion.p
              className="text-xs text-green-700 dark:text-green-400 transition-all duration-500 ease-in-out text-center"
              variants={textVariants}
            >
              {fileName}
            </motion.p>
          )}
          {uploadStatus === 'error' && (
            <motion.p
              className="text-xs text-red-500 dark:text-red-400 transition-all duration-500 ease-in-out text-center"
              variants={textVariants}
            >
              Upload failed
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UploadBox;
