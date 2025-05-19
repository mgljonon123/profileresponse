"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const [emails, setEmails] = useState([
    { email: "neoisneo07@gmail.com", added: "1 сарын өмнө" },
  ]);
  const [form, setForm] = useState({
    fullName: "",
    nickName: "",
    gender: "",
    country: "",
  });
  const [profilePic, setProfilePic] = useState("/profile.jpg");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempNickName, setTempNickName] = useState(form.nickName);
  const [tempProfilePic, setTempProfilePic] = useState(profilePic);
  const [isImageZoomed, setIsImageZoomed] = useState(false); // Зургийн томруулалтын төлөв
  const router = useRouter();

  // localStorage-ээс хоч нэр, профайлын зургийг ачаалах
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedNickName = localStorage.getItem("nickName") || "Neo";
      const storedProfilePic = localStorage.getItem("profilePic") || "/profile.jpg";
      setForm((prev) => ({ ...prev, nickName: storedNickName }));
      setProfilePic(storedProfilePic);
      setTempNickName(storedNickName);
      setTempProfilePic(storedProfilePic);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addEmail = () => {
    setEmails([...emails, { email: "", added: "шинэ" }]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempProfilePic(imageUrl);
    }
  };

  const saveProfileChanges = () => {
    setForm({ ...form, nickName: tempNickName });
    setProfilePic(tempProfilePic);
    if (typeof window !== "undefined") {
      localStorage.setItem("nickName", tempNickName);
      localStorage.setItem("profilePic", tempProfilePic);
    }
    setIsModalOpen(false);
  };

  // Зургийг томруулах/жижгэрүүлэх
  const toggleImageZoom = () => {
    setIsImageZoomed(!isImageZoomed);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10 mt-8 border border-[#f0f0f5] animate-fadeIn">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes modalOpen {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes modalClose {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.9);
          }
        }
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes zoomOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.8);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-modalOpen {
          animation: modalOpen 0.3s ease-out;
        }
        .animate-modalClose {
          animation: modalClose 0.3s ease-out;
        }
        .animate-zoomIn {
          animation: zoomIn 0.3s ease-out;
        }
        .animate-zoomOut {
          animation: zoomOut 0.3s ease-out;
        }
      `}</style>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#232360]">
            Сайн Байна уу? <span className="text-[#4f46e5]">{form.nickName}</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Mon, 25 May 2025</p>
        </div>
        <div>
          <button
            onClick={() => router.push("/")}
            className="bg-white p-3 rounded-full shadow hover:bg-gray-50 transition-all duration-300 flex items-center justify-center group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-[#232360] group-hover:text-[#E94A1F] transition-colors duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Gradient Banner */}
      <div className="w-full h-24 rounded-xl mb-10 bg-gradient-to-r from-[#C7E0FF] to-[#FFF2D1] flex items-end px-8 py-4 shadow-sm animate-fadeIn">
        <p className="text-[#232360] font-semibold text-lg">Таны профайлын тохиргоо</p>
      </div>

      <div className="flex gap-10 items-start">
        {/* Profile Picture & Name */}
        <div className="flex flex-col items-center w-64 bg-[#f7f7fa] rounded-2xl p-6 shadow-sm border border-[#f0f0f5] animate-fadeIn">
          <div
            className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#4f46e5]/20 mb-4 shadow transition-transform hover:scale-105 cursor-pointer"
            onClick={toggleImageZoom}
          >
            <Image src={profilePic} alt="profile" width={128} height={128} className="object-cover" />
          </div>
          <div className="text-center">
            <div className="font-bold text-xl text-[#232360]">{form.nickName}</div>
            <div className="text-gray-400 text-sm mb-3">neoisneo07@gmail.com</div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#4f46e5] text-white px-6 py-2 rounded-lg shadow hover:bg-[#7c3aed] hover:scale-105 transition-all duration-300 font-semibold"
            >
              Засах
            </button>
          </div>
        </div>

        {/* Form Section */}
        <form className="flex-1 grid grid-cols-2 gap-8 bg-white rounded-2xl p-8 shadow-lg border border-[#f0f0f5] animate-fadeIn">
          <div>
            <label className="block mb-2 font-semibold text-[#232360]">
              Бүтэн нэр
            </label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border border-[#e0e0e7] rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5] transition-all duration-300 text-[#232360] placeholder-gray-400"
              placeholder="Таны бүтэн нэр"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-[#232360]">
              Хоч нэр
            </label>
            <input
              name="nickName"
              value={form.nickName}
              onChange={handleChange}
              className="w-full border border-[#e0e0e7] rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5] transition-all duration-300 text-[#232360] placeholder-gray-400"
              placeholder="Таны хоч нэр"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-[#232360]">
              Хүйс
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border border-[#e0e0e7] rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5] transition-all duration-300 text-[#232360]"
            >
              <option value="">Хүйс сонгоно уу</option>
              <option value="male">Эрэгтэй</option>
              <option value="female">Эмэгтэй</option>
              <option value="other">Бусад</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold text-[#232360]">
              Улс
            </label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full border border-[#e0e0e7] rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5] transition-all duration-300 text-[#232360]"
            >
              <option value="">Улс сонгоно уу</option>
              <option value="mn">Монгол</option>
              <option value="fr">Франц</option>
              <option value="us">АНУ</option>
            </select>
          </div>
        </form>
      </div>

      {/* Email Section */}
      <div className="mt-10 bg-[#f7f7fa] rounded-2xl p-8 border border-[#f0f0f5] shadow-sm animate-fadeIn">
        <div className="font-semibold mb-4 text-[#232360] text-lg">
          Миний имэйл хаягууд
        </div>
        <div className="flex flex-col gap-4">
          {emails.map((e, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-white rounded-lg px-4 py-3 shadow-sm border border-[#e0e0e7] transition-all duration-300 hover:shadow-md hover:scale-[1.01]"
            >
              <div className="bg-[#4f46e5]/10 text-[#4f46e5] rounded-full w-8 h-8 flex items-center justify-center font-bold">
                @
              </div>
              <div className="font-medium text-[#232360]">{e.email}</div>
              <div className="text-gray-400 text-sm">{e.added}</div>
            </div>
          ))}
          <button
            onClick={addEmail}
            className="mt-2 text-[#4f46e5] bg-[#4f46e5]/10 px-5 py-2 rounded-lg font-semibold shadow hover:bg-[#4f46e5]/20 hover:scale-105 transition-all duration-300 w-fit"
          >
            + Имэйл хаяг нэмэх
          </button>
        </div>
      </div>

      {/* Modal for Editing Profile */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gradient-to-b from-[#C7E0FF]/60 to-[#FFF2D1]/60 flex items-center justify-center z-50 animate-modalOpen">
          <div className="bg-white rounded-2xl p-8 w-[26rem] shadow-xl border border-[#f0f0f5] animate-modalOpen">
            <h2 className="text-2xl font-bold text-[#232360] mb-6 tracking-tight">
              Профайл засах
            </h2>
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-[#232360] text-lg">
                Хоч нэр
              </label>
              <input
                value={tempNickName}
                onChange={(e) => setTempNickName(e.target.value)}
                className="w-full border border-[#e0e0e7] rounded-lg px-4 py-3 bg-[#f7f7fa] focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5] transition-all duration-300 text-[#232360] placeholder-gray-400"
                placeholder="Хоч нэр оруулах"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-[#232360] text-lg">
                Профайлын зураг
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-[#e0e0e7] rounded-lg px-4 py-3 bg-[#f7f7fa] text-[#232360] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#4f46e5]/10 file:text-[#4f46e5] file:font-semibold hover:file:bg-[#4f46e5]/20 transition-all duration-300"
              />
              {tempProfilePic && (
                <div className="mt-6 flex justify-center">
                  <Image
                    src={tempProfilePic}
                    alt="Preview"
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-[#4f46e5]/20 shadow-lg transition-transform hover:scale-105"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#f7f7fa] text-[#232360] px-6 py-2 rounded-lg shadow hover:bg-gray-200 hover:scale-105 transition-all duration-300 font-semibold"
              >
                Болих
              </button>
              <button
                onClick={saveProfileChanges}
                className="bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
              >
                Хадгалах
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Томруулсан зургийн харагдац */}
      {isImageZoomed && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-zoomIn"
          onClick={toggleImageZoom}
        >
          <div
            className="relative w-[80vw] max-w-[500px] h-[80vw] max-h-[500px] rounded-full overflow-hidden border-8 border-[#4f46e5]/30 shadow-2xl transition-transform hover:scale-105"
            onClick={(e) => e.stopPropagation()} 
          >
            <Image
              src={profilePic}
              alt="Zoomed profile"
              fill
              className="object-cover"
              onClick={toggleImageZoom} 
            />
          </div>
        </div>
      )}
    </div>
  );
}