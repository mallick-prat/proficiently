import React, { useState } from "react";
import { motion } from "framer-motion";

const ResumeGenerator: React.FC = () => {
  const defaultSections = ["Contact", "Experience", "Education", "Coursework", "Involvement", "Skills"];
  const [sections, setSections] = useState<string[]>(defaultSections);
  const [section, setSection] = useState<string>(sections[0]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newSectionName, setNewSectionName] = useState<string>("");
  const [newSectionContent, setNewSectionContent] = useState<string>("");

  const handleNextSection = () => {
    const currentIndex = sections.indexOf(section);
    if (currentIndex < sections.length - 1) {
      setSection(sections[currentIndex + 1]);
    }
  };

  const handlePreviousSection = () => {
    const currentIndex = sections.indexOf(section);
    if (currentIndex > 0) {
      setSection(sections[currentIndex - 1]);
    }
  };

  const handleAddSection = () => {
    if (newSectionName.trim() !== "" && newSectionContent.trim() !== "") {
      setSections([...sections, newSectionName]);
      setNewSectionName("");
      setNewSectionContent("");
      setModalOpen(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      {/* Navigation bar */}
      <div className="flex justify-between space-x-2 mb-8">
        {sections.map((sec, index) => (
          <button
            key={index}
            className={`text-xl md:text-2xl ${sec === section ? "font-bold" : ""}`}
            onClick={() => setSection(sec)}
          >
            {sec}
          </button>
        ))}
        <button
          className="bg-black text-white px-2 py-1 hover:bg-white hover:text-black transition-colors duration-500"
          onClick={() => setModalOpen(true)}
        >
          Add Section
        </button>
      </div>

      {/* Section contents omitted for brevity */}

      {/* Navigation buttons */}
      <div className="flex justify-between items-center mt-8">
        {section !== "Contact" && (
          <motion.button
            className="text-2xl md:text-3xl"
            onClick={handlePreviousSection}
            whileHover={{ x: [-3, 5, -3, 5, -3] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            &#8592; Previous
          </motion.button>
        )}

        {section !== newSectionName && (
          <motion.button
            className="text-2xl md:text-3xl"
            onClick={handleNextSection}
            whileHover={{ x: [3, -5, 3, -5, 3] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            Next &#8594;
          </motion.button>
        )}
      </div>

      {/* Add Section Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-2xl mb-4">Add a new section</h2>
            <input
              type="text"
              placeholder="Section Name"
              className="mb-4 p-2 border rounded-md w-full"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
            />
            <textarea
              placeholder="Section Content"
              className="mb-4 p-2 border rounded-md w-full"
              value={newSectionContent}
              onChange={(e) => setNewSectionContent(e.target.value)}
            />
            <button className="bg-blue-500 text-white p-2 rounded-md" onClick={handleAddSection}>
              Add Section
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeGenerator;
