"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("yourpassword123");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/test");
        router.refresh();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-0">
        <div className="flex flex-col items-center w-full max-w-md">
          <div className="bg-gray-200 rounded-xl w-12 h-12 flex items-center justify-center mb-6 text-2xl font-bold text-gray-700 relative top-4 left-4">
            N
          </div>
          <h2 className="text-3xl font-bold mb-2 text-center">
            Өөрийн бүртгэл рүү нэвтрэх
          </h2>
          <p className="text-gray-500 mb-6 text-center">
            NeoHub.com сайтаар үнэгүй суралцаад, урагш байхаасаа мөрөөдсөн
            мэргэжлээ эхлүүлээрэй!
          </p>

          <form onSubmit={handleSubmit} className="w-full">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full mb-4 px-4 py-2 border rounded-lg bg-gray-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Таны имэйл"
              required
            />
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium">Нууц үг</label>
              <Link
                href="/auth/forgotpass"
                className="text-sm font-medium text-black"
              >
                Нууц үгээ мартсан уу?
              </Link>
            </div>
            <input
              type="password"
              className="w-full mb-4 px-4 py-2 border rounded-lg bg-gray-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••••"
              required
            />
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="mr-2"
                id="remember"
              />
              <label htmlFor="remember" className="text-sm">
                Сануулах
              </label>
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center mb-4">
                {error}
              </div>
            )}
            {success && (
              <div className="text-green-500 text-sm text-center mb-4">
                Амжилттай нэвтэрлээ! Шууд шилжиж байна...
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black text-white rounded-lg font-semibold text-lg mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
            </button>
          </form>
          <div className="text-center text-gray-500 mt-2">
            Одоо болтол бүртгэлгүй юу?{" "}
            <Link href="/auth/register" className="text-black font-semibold">
              бүртгүүлээрэй, үнэгүй
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden md:flex w-1/2 bg-black items-center justify-center relative">
        <img
          src="/4e659b59aabaf3fae230a92f49aede08 2.svg"
          alt="NeoHub Visual"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="relative z-10 text-white p-10">
          <div className="text-xs mb-2 tracking-widest">NEOHUB.COM</div>
          <div className="text-xl font-semibold mb-2">
            "Дата багатай байлаа ч, мэдлэгийн үүд нээлттэй хэвээр!"
          </div>
          <div className="text-lg">
            "Хичээлээ хаях хэрэггүй – бид яамны датагаар ч үргэлжлүүлнэ!"
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
    </div>
  );
};

export default Login;
