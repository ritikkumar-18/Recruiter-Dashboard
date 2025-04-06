import { useState } from "react"

import toast from "react-hot-toast"
import Header from "../Common/Header"

const Profile = () => {
  
  const [companyDetails, setCompanyDetails] = useState({
    logo: "",
    name: "Tech Innovators Inc.",
    company_description:
      "Leading technology solutions provider specializing in AI and cloud computing. We help businesses transform their operations through innovative tech solutions and strategic consulting services.",
    industry: "Information Technology",
    company_type: "Public Limited Company",
    company_size: "501-1000 employees",
    company_location: "San Francisco, CA",
    address: "123 Tech Park, Innovation Drive, San Francisco, CA 94105",
    website_url: "www.techinnovators.com",
    founded_year: "2010",
    isVerified: false,
  })

  // Main person details state
  const [personDetails, setPersonDetails] = useState({
    person_name: "John Doe",
    person_position: "CEO",
    country_code: "+1",
    mobile: "5551234567",
    email: "john.doe@techinnovators.com",
    user_name: "johndoe_ceo",
    strng_password: "********",
    password: "securepassword123",
  })

  // Verification documents state
  const [verificationDocs, setVerificationDocs] = useState({
    goverment_certificate: null,
    bank_statement: null,
    tax_certificate: null,
  })

  // Edit states for different sections
  const [editCompany, setEditCompany] = useState(false)
  const [editPerson, setEditPerson] = useState(false)
  const [editPassword, setEditPassword] = useState(false)

  // Temporary states for editing
  const [tempCompanyDetails, setTempCompanyDetails] = useState({ ...companyDetails })
  const [tempPersonDetails, setTempPersonDetails] = useState({ ...personDetails })
  const [tempPassword, setTempPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  // Handle file upload for company logo
  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setTempCompanyDetails((prev) => ({ ...prev, logo: event.target.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle file upload for verification documents
  const handleFileUpload = (e, docType) => {
    const file = e.target.files[0]
    if (file) {
      setVerificationDocs((prev) => ({
        ...prev,
        [docType]: file,
      }))

      // Check if all documents are uploaded for verification
      const updatedDocs = { ...verificationDocs, [docType]: file }
      const allDocsUploaded = Object.values(updatedDocs).every((doc) => doc !== null)

      if (allDocsUploaded && !companyDetails.isVerified) {
        setCompanyDetails((prev) => ({ ...prev, isVerified: true }))
        // Show toast notification (could be implemented with a simple state-based notification)
        toast.success("All documents verified successfully!")
      }
    }
  }

  // Handle input changes for company details
  const handleCompanyChange = (e) => {
    const { name, value } = e.target
    setTempCompanyDetails((prev) => ({ ...prev, [name]: value }))
  }

  // Handle input changes for person details
  const handlePersonChange = (e) => {
    const { name, value } = e.target
    setTempPersonDetails((prev) => ({ ...prev, [name]: value }))
  }

  // Handle password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setTempPassword((prev) => ({ ...prev, [name]: value }))
  }

  // Save company details
  const saveCompanyDetails = () => {
    setCompanyDetails({ ...tempCompanyDetails })
    setEditCompany(false)
    toast.success("Company details saved successfully!")
  }

  // Save person details
  const savePersonDetails = () => {
    setPersonDetails({ ...tempPersonDetails })
    setEditPerson(false)
    toast.success("Personal details saved successfully!")
  }

  // Save password
  const savePassword = () => {
    if (tempPassword.new !== tempPassword.confirm) {
      toast.error("New passwords don't match.")
      return
    }

    if (tempPassword.current !== personDetails.password) {
      toast.error("Current password is incorrect.")
      return
    }

    setPersonDetails((prev) => ({
      ...prev,
      password: tempPassword.new,
      strng_password: "********",
    }))

    setEditPassword(false)
    setTempPassword({
      current: "",
      new: "",
      confirm: "",
    })

    toast.success("Password updated successfully!")
  }

  // Cancel editing
  const cancelCompanyEdit = () => {
    setTempCompanyDetails({ ...companyDetails })
    setEditCompany(false)
  }

  const cancelPersonEdit = () => {
    setTempPersonDetails({ ...personDetails })
    setEditPerson(false)
  }

  const cancelPasswordEdit = () => {
    setTempPassword({
      current: "",
      new: "",
      confirm: "",
    })
    setEditPassword(false)
  }

  
  const removeDocument = (docType) => {
    setVerificationDocs((prev) => ({ ...prev, [docType]: null }))

    
    const updatedDocs = { ...verificationDocs, [docType]: null }
    const allDocsUploaded = Object.values(updatedDocs).every((doc) => doc !== null)

    if (!allDocsUploaded && companyDetails.isVerified) {
      setCompanyDetails((prev) => ({ ...prev, isVerified: false }))
      toast.error("Your company is no longer verified.")
    }
  }

  const renderField = (label, value, name, section, type = "text", options = null) => {
    const isEditing = section === "company" ? editCompany : editPerson
    const handleChange = section === "company" ? handleCompanyChange : handlePersonChange
    const currentValue =
      section === "company"
        ? editCompany
          ? tempCompanyDetails[name]
          : companyDetails[name]
        : editPerson
          ? tempPersonDetails[name]
          : personDetails[name]

    return isEditing ? (
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-medium mb-1">{label}</label>
        {type === "select" && options ? (
          <select
            name={name}
            value={currentValue}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200"
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : type === "textarea" ? (
          <textarea
            name={name}
            value={currentValue}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200"
            rows={4}
          ></textarea>
        ) : (
          <input
            type={type}
            name={name}
            value={currentValue}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200"
          />
        )}
      </div>
    ) : (
      <div className="mb-4">
        <p className="text-gray-400 text-sm font-medium">{label}</p>
        <p className="text-gray-200">{value || "Not provided"}</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900 scroll-hidden">
            <Header title={"Profile"} />
              <div className="max-w-7xl mx-auto md:p-8 sm:p-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Company Profile</h1>
            <p className="text-gray-500 mt-1">Manage your company information and verification status</p>
          </div>
          <div className="flex items-center space-x-3">
            <span
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${companyDetails.isVerified ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}
            >
              {companyDetails.isVerified ? "Verified" : "Not Verified"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 ">
          {/* Left Column - Company Info */}
          <div className="lg:col-span-2">
            {/* Company Details Card */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6">
              <div className="flex justify-between items-center p-6 border-b border-gray-700">
                <div>
                  <h2 className="text-2xl font-bold">Company Details</h2>
                  <p className="text-gray-400 text-sm mt-1">Manage your company's basic information</p>
                </div>
                {!editCompany ? (
                  <button
                    onClick={() => setEditCompany(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
                  >
                    Edit Details
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={cancelCompanyEdit}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveCompanyDetails}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md transition duration-200"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6 max-h-[600px] overflow-y-auto scroll-hidden ">
                {/* Logo and Name */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                  <div className="relative">
                    {(editCompany ? tempCompanyDetails.logo : companyDetails.logo) ? (
                      <img
                        src={editCompany ? tempCompanyDetails.logo : companyDetails.logo}
                        alt="Company Logo"
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-blue-900 flex items-center justify-center text-3xl font-bold">
                        {(editCompany ? tempCompanyDetails.name : companyDetails.name).charAt(0)}
                      </div>
                    )}
                    {editCompany && (
                      <div className="absolute -bottom-2 -right-2 w-full">
                        <label htmlFor="logo-upload" className="cursor-pointer">
                          <div className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
                              />
                            </svg>
                          </div>
                        </label>
                        <input
                          id="logo-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleLogoUpload}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    {editCompany ? (
                      <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-medium mb-1">Company Name</label>
                        <input
                          type="text"
                          name="name"
                          value={tempCompanyDetails.name}
                          onChange={handleCompanyChange}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200"
                        />
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-xl font-semibold">{companyDetails.name}</h3>
                        <span className="inline-block mt-1 px-2 py-1 bg-gray-700 rounded-md text-sm">
                          {companyDetails.industry}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-700 my-6"></div>

                {/* Description */}
                <div className="mb-6">
                  <label className="block text-gray-300 text-sm font-medium mb-1">Company Description</label>
                  {editCompany ? (
                    <textarea
                      name="company_description"
                      value={tempCompanyDetails.company_description}
                      onChange={handleCompanyChange}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200"
                      rows={4}
                    ></textarea>
                  ) : (
                    <p className="text-gray-300 leading-relaxed">{companyDetails.company_description}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Industry */}
                  {renderField("Industry", companyDetails.industry, "industry", "company", "select", [
                    "Information Technology",
                    "Healthcare",
                    "Finance",
                    "Education",
                    "Manufacturing",
                    "Retail",
                    "Other",
                  ])}

                  {/* Company Type */}
                  {renderField("Company Type", companyDetails.company_type, "company_type", "company", "select", [
                    "Public Limited Company",
                    "Private Limited Company",
                    "Partnership",
                    "Sole Proprietorship",
                    "Non-profit",
                    "Other",
                  ])}

                  {/* Company Size */}
                  {renderField("Company Size", companyDetails.company_size, "company_size", "company", "select", [
                    "1-10 employees",
                    "11-50 employees",
                    "51-200 employees",
                    "201-500 employees",
                    "501-1000 employees",
                    "1001+ employees",
                  ])}

                  {/* Founded Year */}
                  {renderField("Founded Year", companyDetails.founded_year, "founded_year", "company")}

                  {/* Location */}
                  {renderField("Location", companyDetails.company_location, "company_location", "company")}

                  {/* Website */}
                  {renderField("Website", companyDetails.website_url, "website_url", "company")}
                </div>

                {/* Address */}
                {renderField("Full Address", companyDetails.address, "address", "company", "textarea")}
              </div>
            </div>
          </div>

          {/* Right Column - Person Info & Verification */}
          <div>
            {/* Person Details Card */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6 ">
              <div className="flex justify-between items-center p-6 border-b border-gray-700">
                <div>
                  <h2 className="text-xl font-bold">Main Contact</h2>
                  <p className="text-gray-400 text-sm mt-1">Primary contact information</p>
                </div>
                {!editPerson ? (
                  <button
                    onClick={() => setEditPerson(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
                  >
                    Edit Contact
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={cancelPersonEdit}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={savePersonDetails}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md transition duration-200"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6 max-h-[400px] overflow-y-auto scroll-hidden">
                {/* Name */}
                {renderField("Full Name", personDetails.person_name, "person_name", "person")}

                {/* Position */}
                {renderField("Position", personDetails.person_position, "person_position", "person")}

                {/* Email */}
                {renderField("Email", personDetails.email, "email", "person", "email")}

                {/* Phone */}
                <div className="mb-4">
                  <p className="text-gray-400 text-sm font-medium">Phone Number</p>
                  {editPerson ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="country_code"
                        value={tempPersonDetails.country_code}
                        onChange={handlePersonChange}
                        className="w-20 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200"
                      />
                      <input
                        type="text"
                        name="mobile"
                        value={tempPersonDetails.mobile}
                        onChange={handlePersonChange}
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-200">
                      {personDetails.country_code} {personDetails.mobile}
                    </p>
                  )}
                </div>

                {/* Username */}
                {renderField("Username", personDetails.user_name, "user_name", "person")}

                {/* Password */}
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm font-medium">Password</p>
                    {!editPassword && !editPerson && (
                      <button
                        onClick={() => setEditPassword(true)}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        Change
                      </button>
                    )}
                  </div>

                  {!editPassword ? (
                    <p className="text-gray-200">{personDetails.strng_password}</p>
                  ) : (
                    <div className="space-y-3 mt-2">
                      <div>
                        <label className="block text-gray-300 text-xs mb-1">Current Password</label>
                        <input
                          type="password"
                          name="current"
                          value={tempPassword.current}
                          onChange={handlePasswordChange}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-xs mb-1">New Password</label>
                        <input
                          type="password"
                          name="new"
                          value={tempPassword.new}
                          onChange={handlePasswordChange}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-xs mb-1">Confirm Password</label>
                        <input
                          type="password"
                          name="confirm"
                          value={tempPassword.confirm}
                          onChange={handlePasswordChange}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200"
                        />
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={cancelPasswordEdit}
                          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-sm transition duration-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={savePassword}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-md text-sm transition duration-200"
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Verification Card */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold">Verification</h2>
                <p className="text-gray-400 text-sm mt-1">Upload documents to verify your company</p>
              </div>

              <div className="p-6 max-h-[400px] overflow-y-auto scroll-hidden">
                {!companyDetails.isVerified && (
                  <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg">
                    <h3 className="text-lg font-medium text-red-400 mb-2">Verification Required</h3>
                    <p className="text-gray-300 text-sm">
                      Please upload all required documents to verify your company. Verification typically takes 2-3
                      business days.
                    </p>
                  </div>
                )}

                {companyDetails.isVerified && (
                  <div className="mb-6 p-4 bg-green-900/30 border border-green-800 rounded-lg">
                    <h3 className="text-lg font-medium text-green-400 mb-2">Verification Complete</h3>
                    <p className="text-gray-300 text-sm">
                      Your company has been verified. All documents have been reviewed and approved.
                    </p>
                  </div>
                )}

                {/* Document Cards */}
                <div className="space-y-4">
                  {/* Government Certificate */}
                  <div
                    className={`border rounded-lg p-4 ${verificationDocs.goverment_certificate ? "border-green-500" : "border-gray-700"}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm">Government Certificate</h3>
                        {verificationDocs.goverment_certificate ? (
                          <div className="text-green-400 text-sm mt-1">
                            <p className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {verificationDocs.goverment_certificate.name}
                            </p>
                          </div>
                        ) : (
                          <p className="text-gray-500 text-xs mt-1">Upload your government registration certificate</p>
                        )}
                      </div>
                      <div>
                        {verificationDocs.goverment_certificate ? (
                          <button
                            onClick={() => removeDocument("goverment_certificate")}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-md transition duration-200"
                          >
                            Remove
                          </button>
                        ) : (
                          <div>
                            <label htmlFor="gov-cert" className="cursor-pointer">
                              <div className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md flex items-center transition duration-200">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3.5 w-3.5 mr-1.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
                                  />
                                </svg>
                                Upload
                              </div>
                            </label>
                            <input
                              id="gov-cert"
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, "goverment_certificate")}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bank Statement */}
                  <div
                    className={`border rounded-lg p-4 ${verificationDocs.bank_statement ? "border-green-500" : "border-gray-700"}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm">Bank Statement</h3>
                        {verificationDocs.bank_statement ? (
                          <div className="text-green-400 text-sm mt-1">
                            <p className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {verificationDocs.bank_statement.name}
                            </p>
                          </div>
                        ) : (
                          <p className="text-gray-500 text-xs mt-1">Upload a recent bank statement (last 3 months)</p>
                        )}
                      </div>
                      <div>
                        {verificationDocs.bank_statement ? (
                          <button
                            onClick={() => removeDocument("bank_statement")}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-md transition duration-200"
                          >
                            Remove
                          </button>
                        ) : (
                          <div>
                            <label htmlFor="bank-stmt" className="cursor-pointer">
                              <div className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md flex items-center transition duration-200">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3.5 w-3.5 mr-1.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
                                  />
                                </svg>
                                Upload
                              </div>
                            </label>
                            <input
                              id="bank-stmt"
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, "bank_statement")}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tax Certificate */}
                  <div
                    className={`border rounded-lg p-4 ${verificationDocs.tax_certificate ? "border-green-500" : "border-gray-700"}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm">Tax Certificate</h3>
                        {verificationDocs.tax_certificate ? (
                          <div className="text-green-400 text-sm mt-1">
                            <p className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {verificationDocs.tax_certificate.name}
                            </p>
                          </div>
                        ) : (
                          <p className="text-gray-500 text-xs mt-1">Upload your tax registration certificate</p>
                        )}
                      </div>
                      <div>
                        {verificationDocs.tax_certificate ? (
                          <button
                            onClick={() => removeDocument("tax_certificate")}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-md transition duration-200"
                          >
                            Remove
                          </button>
                        ) : (
                          <div>
                            <label htmlFor="tax-cert" className="cursor-pointer">
                              <div className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md flex items-center transition duration-200">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3.5 w-3.5 mr-1.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
                                  />
                                </svg>
                                Upload
                              </div>
                            </label>
                            <input
                              id="tax-cert"
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, "tax_certificate")}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

