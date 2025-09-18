"use client";

import React from "react";
import { Eye, EyeOff } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface AuthFormProps {
  formType: "login" | "register";
  onFormTypeChange: (type: "login" | "register") => void;
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  userType: "patient" | "doctor";
}

export default function AuthForm({
  formType,
  onFormTypeChange,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  showPassword,
  onTogglePassword,
  onSubmit,
  isLoading,
  userType
}: AuthFormProps) {
  return (
    <div className="glass-card bg-white/10 rounded-2xl p-8 shadow-xl border border-white/20 backdrop-blur-sm">
      {/* Form Type Toggle */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => onFormTypeChange("login")}
          className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 ${
            formType === "login"
              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
              : "bg-white/20 text-white hover:bg-white/10"
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => onFormTypeChange("register")}
          className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 ${
            formType === "register"
              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
              : "bg-white/20 text-white hover:bg-white/10"
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-5">
        <Input
          type="email"
          label="Email"
          required
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder={
            userType === "patient" 
              ? "you@example.com" 
              : "doctor@hospital.com"
          }
        />

        <div className="space-y-2">
          <label className="block text-sm text-white">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            />
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-white/70 hover:text-white transition-colors duration-200"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full"
          size="lg"
        >
          {formType === "login" ? "Sign In" : "Create Account"}
        </Button>
      </form>
    </div>
  );
}