import { useEffect, ChangeEvent, useState } from "react";

type Contact = {
  name: string;
  email: string;
  phone: string;
  site: string;
  address: string;
};

type Experience = {
  title: string;
  company: string;
  location: string;
  currentRole: string;
  startDate: string;
  endDate: string;
  description: string;
};

type Education = {
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  graduationYear: string;
  description: string;
};

type Involvement = {
  title: "",
  organization: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
};

type AdditionalInfo = {
  info: "",
}

const ResumeGenerator = () => {
  const [step, setStep] = useState(0);
  const [contact, setContact] = useState<Contact>({
    name: "",
    email: "",
    phone: "",
    site: "",
    address: "",
  });
  const [additionalInfo, setadditionalInfo] = useState<AdditionalInfo>({
    info: "",
  });
  const [experience, setExperience] = useState<Experience>({
    title: "",
    company: "",
    location: "",
    currentRole: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [experienceList, setExperienceList] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education>({
    degree: "",
    institution: "",
    location: "",
    startYear: "",
    graduationYear: "",
    description: "",
  });
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [involvement, setInvolvement] = useState<Involvement>({
    title: "",
    organization: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [involvementList, setInvolvementList] = useState<Involvement[]>([]);

  const handleContactChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };
  const handleAdditionalInfoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setadditionalInfo({
      ...additionalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleExperienceChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setExperience({
      ...experience,
      [e.target.name]: e.target.value,
    });
  };

  const handleEducationChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setEducation({
      ...education,
      [e.target.name]: e.target.value,
    });
  };

  const handleInvolvementChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setInvolvement({
      ...involvement,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const data: Experience = {
      title: experience.title,
      company: experience.company,
      location: experience.location,
      currentRole: experience.currentRole,
      startDate: experience.startDate,
      endDate: experience.endDate,
      description: experience.description,
    };

    setExperienceList([...experienceList, data]);
    setExperience({
      title: "",
      company: "",
      location: "",
      currentRole: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const handleEducationSubmit = () => {
    const data: Education = {
      degree: education.degree,
      institution: education.institution,
      location: education.location,
      startYear: education.startYear,
      graduationYear: education.graduationYear,
      description: education.description,
    };

    setEducationList([...educationList, data]);
    setEducation({
      degree: "",
      institution: "",
      location: "",
      graduationYear: "",
      startYear: "",
      description: "",
    });
  };

  const handleInvolvementSubmit = () => {
    const data: Involvement = {
      title: involvement.title,
      organization: involvement.organization,
      location: involvement.location,
      startDate: involvement.startDate,
      endDate: involvement.endDate,
      description: involvement.description,
    };

    setInvolvementList([...involvementList, data]);
    setInvolvement({
      title: "",
      organization: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  useEffect(() => {
    const allData = {
      contact,
      experienceList,
      educationList,
      involvementList,
      additionalInfo,
    };
    console.log(JSON.stringify(allData, null, 2));
  }, [contact, experienceList, educationList, involvementList]);

  const goNext = () => {
    setStep((s) => s + 1);
  };

  const goPrev = () => {
    setStep((s) => s - 1);
  };


  return (
    <div>
      {/* Use the step state to conditionally render form steps */}
      {/* Use the step state to conditionally render form steps */}
      {step === 0 && (
        <div className="flex flex-col items-center">
          <button
            className="text-lg font-semibold text-black rounded-lg px-6 py-3 mb-4"
            onClick={goNext}
          >
            NEXT →
          </button>
          <div className="text-center font-semibold text-black">
            Contact Information
          </div>
          <div className="mx-auto max-w-lg">
            <div className="py-2">
              <span className="px-1 text-sm text-gray-600">Name</span>
              <input
                name="name"
                value={contact.name}
                onChange={handleContactChange}
                placeholder="Enter your name"
                className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              />
            </div>
            <div className="py-2">
              <span className="px-1 text-sm text-gray-600">Email</span>
              <input
                name="email"
                value={contact.email}
                onChange={handleContactChange}
                placeholder="Enter your email"
                className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              />
            </div>
            <div className="py-2">
              <span className="px-1 text-sm text-gray-600">Phone</span>
              <input
                name="phone"
                value={contact.phone}
                onChange={handleContactChange}
                placeholder="Enter your phone"
                className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              />
            </div>
            <div className="py-2">
            <span className="px-1 text-sm text-gray-600">Website</span>
              <input
                name="site"
                value={contact.site}
                onChange={handleContactChange}
                placeholder="LinkedIn or Website"
                className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              />
            </div>
            <div className="py-2">
              <span className="px-1 text-sm text-gray-600">Address</span>
              <input
                name="address"
                value={contact.address}
                onChange={handleContactChange}
                placeholder="79 JFK St."
                className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              />
            </div>
            <div className="py-2">
              <button
                onClick={goNext}
                className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
{step === 1 && (
  <div className="mx-12">
    <div
      className={`flex justify-between mb-3 ${step > 0 ? "" : "hidden"}`}
    >
      {step > 0 && (
        <button
          className="text-lg font-semibold text-black rounded-lg px-6 py-3"
          onClick={goPrev}
        >
          ← PREV
        </button>
      )}
      {step >= 1 && (
        <button
          className="text-lg font-semibold text-black rounded-lg px-6 py-3"
          onClick={goNext}
        >
          NEXT →
        </button>
      )}
    </div>

    <div className="flex justify-between mb-3">
      <div className="text-center mx-auto font-semibold text-black">
        Education
      </div>
    </div>
    <div className="max-w-lg">
      <div className="py-2">
        <span className="px-1 text-sm text-gray-600">Degree</span>
        <input
          name="degree"
          value={education.degree}
          onChange={handleEducationChange}
          placeholder="Enter your degree"
          className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
        />
      </div>
      <div className="py-2">
        <span className="px-1 text-sm text-gray-600">
          Institution name
        </span>
        <input
          name="institution"
          value={education.institution}
          onChange={handleEducationChange}
          placeholder="Enter institution name"
          className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="px-1 text-sm text-gray-600">Start Year</span>
          <input
            type="month"
            name="startYear"
            value={education.startYear}
            onChange={handleEducationChange}
            placeholder="Enter start year"
            className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
          />
        </div>
        <div>
          <span className="px-1 text-sm text-gray-600">
            Graduation Year
          </span>
          <input
            type="month"
            name="graduationYear"
            value={education.graduationYear}
            onChange={handleEducationChange}
            placeholder="Enter graduation year"
            className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
          />
        </div>
      </div>
      <div className="py-2">
        <span className="px-1 text-sm text-gray-600">Location</span>
        <input
          name="location"
          value={education.location}
          onChange={handleEducationChange}
          placeholder="City, State"
          className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
        />
      </div>
      <div className="py-2">
        <span className="px-1 text-xs text-gray-600">Description</span>
        <textarea
          name="description"
          value={education.description}
          onChange={handleEducationChange}
          placeholder="Add any additional info like GPA, awards, relevant coursework, achievements, etc. Don't worry about formatting or style!"
          className="text-xs block px-3 py-2 rounded-lg w-full h-24 bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
        />
      </div>
      <div className="py-2">
        <button
          onClick={handleEducationSubmit}
          className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block hover:text-white hover:bg-black"
        >
          Submit
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {educationList.map((edu, index) => (
          <div key={index} className="border-2 rounded-xl p-2 grid-3 gap-x-6">
            <div>
              <h4 className="mb-1 font-bold text">{edu.institution}</h4>
              <p className="mb-1 space-x-2 text-sm">
                <a href={edu.degree} target="_blank" rel="noreferrer">
                  {edu.degree}
                </a>
                <a href={edu.location} target="_blank" rel="noreferrer">
                  •
                </a>
                <a href={edu.location} target="_blank" rel="noreferrer">
                  {edu.location}
                </a>
              </p>
              <p className="text-sm">
                {edu.startYear} - {edu.graduationYear}
              </p>
            </div>
            <div className="lg:col-span-2 text-xs">
              <p className="break-words">{edu.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

      {/* Add more conditions for the remaining steps: Experience, Education, Coursework, Involvement, Skills */}
      {step === 2 && (
        <div className="mx-12">
          <div
            className={`flex justify-between mb-3 ${step > 0 ? "" : "hidden"}`}
          >
            {step > 0 && (
              <button
                className="text-lg font-semibold text-black rounded-lg px-6 py-3"
                onClick={goPrev}
              >
                ← PREV
              </button>
            )}
            {step >= 1 && (
              <button
                className="text-lg font-semibold text-black rounded-lg px-6 py-3"
                onClick={goNext}
              >
                NEXT →
              </button>
            )}
          </div>

          <div className="flex justify-between mb-3">
            <div className="text-center mx-auto font-semibold text-black">
              Experience
            </div>
          </div>
          <div className="max-w-lg">
            <div className="py-2">
              <span className="px-1 text-sm text-gray-600">Title</span>
              <input
                name="title"
                value={experience.title}
                onChange={handleExperienceChange}
                placeholder="Enter your role"
                className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              />
            </div>
            <div className="py-2">
              <span className="px-1 text-sm text-gray-600">Company name</span>
              <input
                name="company"
                value={experience.company}
                onChange={handleExperienceChange}
                placeholder="Enter company name"
                className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              />
            </div>
            <div className="py-2">
              <span className="px-1 text-sm text-gray-600">Location</span>
              <input
                name="location"
                value={experience.location}
                onChange={handleExperienceChange}
                placeholder="City, State"
                className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              />
            </div>
            <div className="py-2">
              <span className="px-1 text-sm text-gray-600">
                Are you currently working in this role?
              </span>
              <select
                name="currentRole"
                value={experience.currentRole}
                onChange={handleExperienceChange}
                className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>







            <div className="py-2">
              <span className="px-1 text-sm text-gray-600">Start Date</span>
              <input
                type="month"
                name="startDate"
                value={experience.startDate}
                onChange={handleExperienceChange}
                className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              />
            </div>
            {experience.currentRole === "no" && (
              <div className="py-2">
                <span className="px-1 text-sm text-gray-600">End Date</span>
                <input
                  type="month"
                  name="endDate"
                  value={experience.endDate}
                  onChange={handleExperienceChange}
                  className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                />
              </div>
            )}
            <div className="py-2">
              <span className="px-1 text-xs text-gray-600">Description</span>
              <textarea
                name="description"
                value={experience.description}
                onChange={handleExperienceChange}
                placeholder="Write a paragraph about what you did, any metrics (developed 32+ KPIs), and any important accomplishments. Don't worry about formatting or style!"
                className="text-xs block px-3 py-2 rounded-lg w-full h-24 bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              />
            </div>
            <div className="py-2">
              <button
                onClick={handleSubmit}
                className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block  hover:text-white hover:bg-black"
              >
                Submit
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {experienceList.map((exp, index) => (
                <div key={index} className="border-2 rounded-xl p-2 grid-3 gap-x-6">
                  <div>
                    <h4 className="mb-1 font-bold text">{exp.company}</h4>
                    <p className="mb-1 space-x-2 text-sm">
                      <a href={exp.title} target="_blank" rel="noreferrer">
                        {exp.title}
                      </a>
                      <a href={exp.title} target="_blank" rel="noreferrer">
                      •
                      </a>
                      <a href={exp.location} target="_blank" rel="noreferrer">
                        {exp.location}
                      </a>
                    </p>
                    <p className="text-sm">
                      {exp.startDate} -{" "}
                      {exp.currentRole === "yes" ? "Present" : exp.endDate}
                    </p>
                  </div>
                  <div className="lg:col-span-2 text-xs">
                    <p className="break-words">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

{step === 3 && (
  <div className="mx-12">
    <div
      className={`flex justify-between mb-3 ${step > 0 ? "" : "hidden"}`}
    >
      {step > 0 && (
        <button
          className="text-lg font-semibold text-black rounded-lg px-6 py-3"
          onClick={goPrev}
        >
          ← PREV
        </button>
      )}
      {step >= 1 && (
        <button
          className="text-lg font-semibold text-black rounded-lg px-6 py-3"
          onClick={goNext}
        >
          NEXT →
        </button>
      )}
    </div>

    <div className="flex justify-between mb-3">
      <div className="text-center mx-auto font-semibold text-black">
        Involvement
      </div>
    </div>
    <div className="max-w-lg">
      <div className="py-2">
        <span className="px-1 text-sm text-gray-600">Role/Title</span>
        <input
          name="title"
          value={involvement.title}
          onChange={handleInvolvementChange}
          placeholder="Enter your role/title"
          className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
        />
      </div>
      <div className="py-2">
        <span className="px-1 text-sm text-gray-600">Organization</span>
        <input
          name="organization"
          value={involvement.organization}
          onChange={handleInvolvementChange}
          placeholder="Enter organization name"
          className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
        />
      </div>
      <div className="py-2">
        <span className="px-1 text-sm text-gray-600">Location</span>
        <input
          name="location"
          value={involvement.location}
          onChange={handleInvolvementChange}
          placeholder="City, State"
          className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
        />
      </div>
      <div className="py-2">
        <span className="px-1 text-sm text-gray-600">Start Date</span>
        <input
          type="month"
          name="startDate"
          value={involvement.startDate}
          onChange={handleInvolvementChange}
          className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
        />
      </div>
      <div className="py-2">
        <span className="px-1 text-sm text-gray-600">End Date</span>
        <input
          type="month"
          name="endDate"
          value={involvement.endDate}
          onChange={handleInvolvementChange}
          className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
        />
      </div>
      <div className="py-2">
        <span className="px-1 text-xs text-gray-600">Description</span>
        <textarea
          name="description"
          value={involvement.description}
          onChange={handleInvolvementChange}
          placeholder="Write a paragraph about your involvement, responsibilities, achievements, etc. Don't worry about formatting or style!"
          className="text-xs block px-3 py-2 rounded-lg w-full h-24 bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
        />
      </div>
      <div className="py-2">
        <button
          onClick={handleInvolvementSubmit}
          className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block hover:text-white hover:bg-black"
        >
          Submit
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {involvementList.map((inv, index) => (
          <div key={index} className="border-2 rounded-xl p-2 grid-3 gap-x-6">
            <div>
              <h4 className="mb-1 font-bold text">{inv.organization}</h4>
              <p className="mb-1 space-x-2 text-sm">
                <a href={inv.title} target="_blank" rel="noreferrer">
                  {inv.title}
                </a>
                <a href={inv.location} target="_blank" rel="noreferrer">
                  •
                </a>
                <a href={inv.location} target="_blank" rel="noreferrer">
                  {inv.location}
                </a>
              </p>
              <p className="text-sm">
                {inv.startDate} - {inv.endDate}
              </p>
            </div>
            <div className="lg:col-span-2 text-xs">
              <p className="break-words">{inv.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}


{step === 4 && (
  <div className="mx-12">
    <div className={`flex justify-between mb-3 ${step > 0 ? "" : "hidden"}`}>
      {step > 0 && (
        <button
          className="text-lg font-semibold text-black rounded-lg px-6 py-3"
          onClick={goPrev}
        >
          ← PREV
        </button>
      )}
      {step >= 1 && (
        <button
          className="text-lg font-semibold text-black rounded-lg px-6 py-3"
          onClick={goNext}
        >
          NEXT →
        </button>
      )}
    </div>

    <div className="flex justify-between mb-3">
      <div className="text-center mx-auto font-semibold text-black">
        Additional Information
      </div>
    </div>

    <div className="max-w-lg">
      <div className="py-2">
        <span className="px-1 text-sm text-gray-600">
          Please provide any additional information:
        </span>
        <textarea
          name="info"
          value={additionalInfo.info}
          onChange={handleAdditionalInfoChange}
          placeholder="Enter additional information"
          className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
        />
      </div>
    </div>
    <button
        className="text-lg font-semibold text-black rounded-lg px-6 py-3"
        onClick={() => setStep(5)}
      >
        Submit
      </button>
  </div>
)}


{step === 5 && (
  <div>
  <pre>{JSON.stringify(
    {
      contact,
      experienceList,
      educationList,
      involvementList,
      additionalInfo,
    },
    null,
    2
  )}</pre>
</div>
)}











    </div>
  );
};

export default ResumeGenerator;
