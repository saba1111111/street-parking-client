import React, { useState } from "react";
import "./index.css";
import InputField from "../../components/common/input";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/use-fetch";

function LoginPage({ setUser }) {
  const { post } = useFetch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
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

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await post("/auth/login", {
          email: formData.email,
        });

        if (!response.success) {
          throw new Error("Network response was not ok");
        }

        setUser(response.data);
        navigate("/");
      } catch (error) {
        console.error("Error logging in:", error);
      }
    } else {
      console.log("Form has validation errors");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    <div>
      <button
        onClick={() => navigate("/register")}
        className="navigate-register-button"
      >
        Go to register
      </button>

      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <InputField
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
