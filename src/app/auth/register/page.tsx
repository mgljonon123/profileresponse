"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Register: React.FC = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: `${firstName} ${lastName}`.trim(),
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Registration successful
      router.push("/auth/login?registered=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-0 min-h-screen">
        <div className="flex flex-col items-center w-full max-w-xs sm:max-w-sm md:max-w-md px-4 py-8 md:py-0">
          <h2 className="text-3xl font-bold mb-2 text-left w-full">
            Шинэ бүртгэл үүсгэх
          </h2>
          <p className="text-gray-500 mb-6 text-left w-full">
            Хэцүү биш ээ, чи ердөө хэдхэн мэдээлэл оруулаад л бүртгэл чинь бэлэн
            болно.
          </p>
          {error && (
            <div className="w-full mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 mb-4">
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium mb-1">
                  Бүтэн нэр
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Fullname"
                  required
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium mb-1 invisible">
                  Бүтэн нэр
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Nickname"
                  required
                />
              </div>
            </div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full mb-4 px-4 py-2 border rounded-lg bg-gray-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              required
            />
            <label className="block text-sm font-medium mb-1">Нууц үг</label>
            <input
              type="password"
              className="w-full mb-6 px-4 py-2 border rounded-lg bg-gray-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••••"
              required
              minLength={6}
            />
            <div className="text-xs text-gray-500 mb-6 flex flex-col items-start sm:flex-row sm:items-center gap-2">
              <span>
                Бүртгүүлснээр та Start Up.com-ийн үйлчилгээний нөхцөл ба
                нууцлалын бодлогыг хүлээн зөвшөөрч байна
              </span>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-black text-white rounded-lg font-semibold text-lg shadow-md hover:bg-gray-900 transition mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Бүртгэж байна..." : "Бүртгүүлэх"}
            </button>
            <div className="text-center text-gray-500 mt-2 flex flex-col items-center">
              <span>
                Шууд нэвтрэх үү?
                <button
                  type="button"
                  onClick={() => router.push("/auth/login")}
                  className="text-black font-semibold  text-sm hover:text-gray-700 transition ml-1"
                >
                  Нэвтрэх
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
      {/* Right Side - Image & Quote */}
      <div className="hidden md:flex w-1/2 bg-black items-center justify-center relative">
        <Image
          src="/be5f80d22cb68f27eeb93bcb65fcf1a2.jpg"
          alt="Start Up Visual"
          fill
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white p-20 flex flex-col justify-end h-full">
          <div className="mb-2 text-xs tracking-widest opacity-80">
            neoisneo07@gmail.com
          </div>
          <div className="text-2xl font-semibold leading-snug">
            "Бүртгүүлээд өөрт таарсан мэргэжлээ ол.""
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
