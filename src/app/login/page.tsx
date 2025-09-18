"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LoginContainer from "@/components/login/LoginContainer";
import '../../styles/globals.css';
import '../../styles/patient.css';


export default function LoginPage() {
  const router = useRouter();
  
  // All state management - exact same as original
  const [userType, setUserType] = useState<"patient" | "doctor">("patient");
  const [formType, setFormType] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  // All event handlers - exact same as original
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleContinue = () => {
    setStep(3);
    setTimeout(() => {
      if (userType === "patient") {
        router.push("/patient/profile");
      } else {
        router.push("/dashboard-doctor");
      }
    }, 2000);
  };

  return (
    <LoginContainer
      userType={userType}
      onUserTypeChange={setUserType}
      step={step}
      formType={formType}
      onFormTypeChange={setFormType}
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      showPassword={showPassword}
      onTogglePassword={() => setShowPassword(!showPassword)}
      onSubmit={handleSubmit}
      onContinue={handleContinue}
      isLoading={isLoading}
    />
  );
}