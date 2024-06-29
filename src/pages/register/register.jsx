import React, { useState } from "react";
import "./index.css";
import InputField from "../../components/common/input";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    address: "",
    fullName: "",
    carPlateNumber: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
      valid = false;
    }

    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
      valid = false;
    }

    if (!formData.carPlateNumber) {
      newErrors.carPlateNumber = "Car Plate Number is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:8080/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            address: formData.address,
            full_name: formData.fullName,
            car_plate_number: formData.carPlateNumber,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        navigate("/login");

        setFormData({
          email: "",
          address: "",
          fullName: "",
          carPlateNumber: "",
        });
        setErrors({});
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      console.log("Form has validation errors");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Name:", name); // Check if name is correctly logged
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setErrors({ ...errors, [name]: `${name} is required` });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <InputField
          type="email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />
        <InputField
          type="text"
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.address}
        />
        <InputField
          type="text"
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fullName}
        />
        <InputField
          type="text"
          label="Car Plate Number"
          name="carPlateNumber"
          value={formData.carPlateNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.carPlateNumber}
        />
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
