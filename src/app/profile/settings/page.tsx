"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SettingsPage() {
  const [emails, setEmails] = useState([{ email: "", added: "" }]);
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
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailChangeLoading, setEmailChangeLoading] = useState(false);
  const [emailChangeError, setEmailChangeError] = useState<string | null>(null);
  const [emailChangeSuccess, setEmailChangeSuccess] = useState<string | null>(
    null
  );
  const router = useRouter();

  // SWR for user info
  const { data: userData, error: userError } = useSWR(
    "/api/profile/settings",
    fetcher
  );

  // Set form and profilePic when userData is loaded
  useEffect(() => {
    if (userData && userData.success) {
      setForm((prev) => ({
        ...prev,
        fullName: userData.data.fullname || "",
        nickName: userData.data.nickname || "",
      }));
      setProfilePic(userData.data.profilePicture || "/profile.jpg");
      setEmails([{ email: userData.data.email, added: "" }]);
    }
  }, [userData]);

  // localStorage-ээс хоч нэр, профайлын зургийг ачаалах (fallback)
  useEffect(() => {
    if (!userData && typeof window !== "undefined") {
      const storedNickName = localStorage.getItem("nickName") || "Neo";
      const storedProfilePic =
        localStorage.getItem("profilePic") || "/profile.jpg";
      setForm((prev) => ({ ...prev, nickName: storedNickName }));
      setProfilePic(storedProfilePic);
      setTempNickName(storedNickName);
      setTempProfilePic(storedProfilePic);
    }
  }, [userData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Update tempNickName when nickname changes
    if (name === "nickName") {
      setTempNickName(value);
    }
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

  const saveProfileChanges = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("fullname", form.fullName);
      formData.append("nickname", form.nickName); // Use form.nickName instead of tempNickName

      // Get the file from the input
      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput?.files?.[0]) {
        formData.append("profilePicture", fileInput.files[0]);
      }

      const response = await fetch("/api/profile/settings", {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      setForm({ ...form, nickName: form.nickName }); // Update with form.nickName
      setProfilePic(data.data.profilePicture || profilePic);
      setSuccess("Профайл амжилттай шинэчлэгдлээ");
      setIsModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  // Submit handler for saving changes
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveProfileChanges();
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
            Сайн Байна уу?{" "}
            <span className="text-[#F59E0B]">{form.nickName}</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Mon, 25 May 2025</p>
        </div>
        <div>
          <button
            onClick={() => router.back()}
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

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      {/* Gradient Banner */}
      <div className="w-full h-24 rounded-xl mb-10 bg-gradient-to-r from-[#F59E0B] to-[#F59E0B] flex items-end px-8 py-4 shadow-sm animate-fadeIn">
        <h2 className="text-2xl font-bold text-white mb-4">
          Таны профайлын тохиргоо
        </h2>
      </div>

      <div className="flex gap-10 items-start">
        {/* Profile Picture & Name */}
        <div className="flex flex-col items-center w-64 bg-[#f7f7fa] rounded-2xl p-6 shadow-sm border border-[#f0f0f5] animate-fadeIn">
          <div
            className="w-40 h-40 aspect-square rounded-full overflow-hidden border-4 border-[#F59E0B]/20 mb-4 shadow flex items-center justify-center bg-white transition-transform hover:scale-105 cursor-pointer"
            onClick={toggleImageZoom}
          >
            <Image
              src={profilePic}
              alt="profile"
              width={160}
              height={160}
              className="object-cover aspect-square"
            />
          </div>
          <div className="text-center">
            <div className="font-bold text-xl text-[#232360]">
              {form.nickName}
            </div>
            <div className="text-gray-400 text-sm mb-3">
              {emails[0]?.email || ""}
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#F59E0B] text-white px-6 py-2 rounded-lg shadow hover:bg-[#F59E0B] hover:scale-105 transition-all duration-300 font-semibold"
            >
              Засах
            </button>
          </div>
        </div>

        {/* Form Section */}
        <form
          className="flex-1 grid grid-cols-2 gap-8 bg-white rounded-2xl p-8 shadow-lg border border-[#f0f0f5] animate-fadeIn"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block mb-2 font-semibold text-[#232360]">
              Бүтэн нэр
            </label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border border-[#e0e0e7] rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-300 text-[#232360] placeholder-gray-400"
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
              className="w-full border border-[#e0e0e7] rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-300 text-[#232360] placeholder-gray-400"
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
              className="w-full border border-[#e0e0e7] rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-300 text-[#232360]"
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
              className="w-full border border-[#e0e0e7] rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-300 text-[#232360]"
            >
              <option value="">Улс сонгоно уу</option>
              <option value="mn">Монгол</option>
              <option value="fr">Франц</option>
              <option value="us">АНУ</option>
            </select>
          </div>
          <div className="col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-[#F59E0B] text-white px-8 py-3 rounded-lg shadow hover:bg-[#F59E0B]/90 transition-all duration-300 font-semibold"
            >
              Хадгалах
            </button>
          </div>
        </form>
      </div>

      {/* Email Section */}
      <div className="mt-10 bg-[#f7f7fa] rounded-2xl p-8 border border-[#f0f0f5] shadow-sm animate-fadeIn">
        <div className="font-semibold mb-4 text-[#232360] text-lg">
          Миний Имэйл
        </div>
        <div className="flex flex-col gap-4">
          {emails.map((e, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-white rounded-lg px-4 py-3 shadow-sm border border-[#e0e0e7] transition-all duration-300 hover:shadow-md hover:scale-[1.01]"
            >
              <div className="bg-[#F59E0B]/10 text-[#F59E0B] rounded-full w-8 h-8 flex items-center justify-center font-bold">
                @
              </div>
              <div className="font-medium text-[#232360]">{e.email}</div>
              <div className="text-gray-400 text-sm">{e.added}</div>
            </div>
          ))}
          {showEmailInput ? (
            <div className="flex flex-col sm:flex-row gap-2 mt-2 items-start sm:items-center">
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="border border-[#e0e0e7] rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-300 text-[#232360] placeholder-gray-400"
                placeholder="Шинэ имэйл хаяг"
              />
              <button
                onClick={async () => {
                  setEmailChangeLoading(true);
                  setEmailChangeError(null);
                  setEmailChangeSuccess(null);
                  try {
                    const res = await fetch("/api/profile/settings", {
                      method: "PUT",
                      headers: {},
                      body: (() => {
                        const formData = new FormData();
                        formData.append("email", newEmail);
                        return formData;
                      })(),
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.error || "Алдаа гарлаа");
                    setEmails([{ email: newEmail, added: "" }]);
                    setEmailChangeSuccess("Имэйл амжилттай солигдлоо");
                    setShowEmailInput(false);
                  } catch (err) {
                    setEmailChangeError(
                      err instanceof Error ? err.message : "Алдаа гарлаа"
                    );
                  } finally {
                    setEmailChangeLoading(false);
                  }
                }}
                className="bg-[#F59E0B] text-white px-4 py-2 rounded-lg shadow hover:bg-[#F59E0B]/90 transition-all duration-300 font-semibold"
                disabled={emailChangeLoading}
              >
                Хадгалах
              </button>
              <button
                onClick={() => setShowEmailInput(false)}
                className="ml-2 text-gray-500 hover:text-[#F59E0B]"
                disabled={emailChangeLoading}
              >
                Болих
              </button>
              {emailChangeError && (
                <div className="text-red-500 mt-2">{emailChangeError}</div>
              )}
              {emailChangeSuccess && (
                <div className="text-green-600 mt-2">{emailChangeSuccess}</div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowEmailInput(true)}
              className="mt-2 text-[#232360] px-5 py-2 rounded-lg font-semibold shadow hover:bg-[#F59E0B]/20 hover:text-[#F59E0B] hover:scale-105 transition-all duration-300 w-fit"
            >
              Имэйл хаяг өөрчлөх
            </button>
          )}
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
              className="object-cover aspect-square"
              onClick={toggleImageZoom}
            />
          </div>
        </div>
      )}
    </div>
  );
}
