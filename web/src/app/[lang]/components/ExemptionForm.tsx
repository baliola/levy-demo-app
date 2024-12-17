"use client";

import React, { useState } from "react";

interface Applicant {
  passportNumber: string;
  name: string;
  email: string;
}

const ExemptionForm: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([
    { passportNumber: "", name: "", email: "" },
  ]);

  const [country, setCountry] = useState("Other");
  const [arrivalDate, setArrivalDate] = useState("");
  const [categoryOfExemption, setCategoryOfExemption] = useState(
    "Holders of golden visas"
  );
  const [purpose, setPurpose] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleAddApplicant = () => {
    if (applicants.length < 9) {
      setApplicants([
        ...applicants,
        { passportNumber: "", name: "", email: "" },
      ]);
    }
  };

  const handleRemoveApplicant = (index: number) => {
    const updatedApplicants = [...applicants];
    updatedApplicants.splice(index, 1);
    setApplicants(updatedApplicants);
  };

  const handleApplicantChange = (
    index: number,
    field: keyof Applicant,
    value: string
  ) => {
    const updatedApplicants = [...applicants];
    updatedApplicants[index][field] = value;
    setApplicants(updatedApplicants);
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Exemption Form</h1>
      <div className="mb-4">
        {`Please enter the applicant's detail.`}
        <br />
        {`For multiple applicants, click "Add More Applicant". (Max 9 applicants)`}
      </div>

      <div className="flex xl:flex-row flex-col flex-wrap w-full mt-14">
        {applicants.map((applicant, index) => (
          <div
            key={index}
            className="bg-white xl:w-1/4 w-full  rounded-lg shadow-md p-4 mr-10 mb-10"
          >
            <h2 className="text-lg font-bold mb-2">Applicant Detail</h2>

            <div className="mb-4">
              <label
                htmlFor={`passport-number-${index}`}
                className="block font-medium mb-1"
              >
                Passport Number
              </label>
              <input
                type="text"
                id={`passport-number-${index}`}
                placeholder="Axxxxxx"
                value={applicant.passportNumber}
                onChange={(e) =>
                  handleApplicantChange(index, "passportNumber", e.target.value)
                }
                className="border rounded-md px-3 py-2 w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor={`name-${index}`}
                className="block font-medium mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id={`name-${index}`}
                placeholder="Same as Passport"
                value={applicant.name}
                onChange={(e) =>
                  handleApplicantChange(index, "name", e.target.value)
                }
                className="border rounded-md px-3 py-2 w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor={`email-${index}`}
                className="block font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id={`email-${index}`}
                placeholder="example@gmail.com"
                value={applicant.email}
                onChange={(e) =>
                  handleApplicantChange(index, "email", e.target.value)
                }
                className="border rounded-md px-3 py-2 w-full"
              />
            </div>

            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveApplicant(index)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md"
              >
                Remove Applicant
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddApplicant}
        className="border-2 border-blue-500 hover:bg-blue-600 text-blue-500 hover:text-white px-3 py-2 rounded-full"
      >
        Add More Applicant
      </button>

      <div className="space-y-4 mt-6">
        <div className="mb-10">
          <h1 className="text-2xl font-bold mb-4">Additional Information</h1>
          <div className="mb-4">
            {`Provide detailed information explaining the reasons for your exemption request.`}
            <br />
            <div className="text-xs">
              {`When filling out the form, please note that fields marked with a red asterisk * are mandatory.`}
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between space-x-10">
          <div className="w-full">
            <label htmlFor="country" className="block font-medium mb-1">
              Country*
            </label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border rounded-md px-3 py-2 w-full"
            >
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="w-full">
            <label htmlFor="arrival-date" className="block font-medium mb-1">
              Arrival Date*
            </label>
            <input
              type="date"
              id="arrival-date"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              className="border rounded-md px-3 py-2 w-full"
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="category-of-exemption"
              className="block font-medium mb-1"
            >
              Category of Exemption*
            </label>
            <select
              id="category-of-exemption"
              value={categoryOfExemption}
              onChange={(e) => setCategoryOfExemption(e.target.value)}
              className="border rounded-md px-3 py-2 w-full"
            >
              <option value="Holders of golden visas">
                Holders of golden visas
              </option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="purpose" className="block font-medium mb-1">
            Purpose to Bali
          </label>
          <textarea
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="border rounded-md px-3 py-2 w-full h-24"
          />
        </div>

        <div>
          <label htmlFor="attachment" className="block font-medium mb-1">
            Attachment*
          </label>
          <div className="flex items-center">
            <input
              type="file"
              id="attachment"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="border rounded-md px-3 py-2 w-full mr-2"
            />
            {file && <span>{file.name}</span>}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExemptionForm;
