import { useState } from "react";
import "./signup.css";
import { registerUser } from "../../lib/api";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      avatar: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["name", "email", "password"];
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `Please enter ${field}.`;
      }
    });

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    const emailRegex = /^(.+)@(stud\.noroff\.no|noroff\.no)$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email =
        "Invalid email address. Use stud.noroff.no or noroff.no.";
    }

    const nameRegex = /^[^\W_]+$/;
    if (!nameRegex.test(formData.name)) {
      newErrors.name =
        "Name should not contain punctuation symbols apart from underscore.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setErrors({
      name: "",
      email: "",
      password: "",
    });

    try {
      const response = await registerUser({
        username: formData.name,
        email: formData.email,
        password: formData.password,
      });
      if (response.id) {
        // If response have id, it was a success.
        console.log("Registration successful");
      } else {
        console.log("helluu");
        const errorData = await response.errors[0].message;
        console.error("Registration failed:", errorData.message);
      }
    } catch (error) {
      console.log(error);
      console.error("Error during registration:");
    }
  };

  return (
    <form
      className="signup-form"
      method="post"
      action="/auth/register"
      onSubmit={handleSubmit}
    >
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </label>

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </label>

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </label>

      <label>
        Avatar:
        <input type="file" accept="image/*" onChange={handleAvatarChange} />
      </label>

      <button className="submit-btn" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
