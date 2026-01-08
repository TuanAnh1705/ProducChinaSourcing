"use client";

import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ApiResponse } from "@/backend/dto/product.dto";

export function ContactDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await axios.post<ApiResponse<null>>('/api/contact', data)
      if (res.data.success) {
        toast.success(res.data.message || "Message sent successfully!");
        setOpen(false);
        (e.target as HTMLFormElement).reset();
      }
    } catch (err) {
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="
          w-[92%] 
          max-w-[92%] 
          md:max-w-5xl 
          max-h-[92%]
          p-3 md:p-7
          bg-white border-none rounded-md
          overflow-y-auto md:overflow-hidden
        "
      >
        <div className="sr-only">
          <DialogTitle>Contact Us - China Sourcing Co</DialogTitle>
          <DialogDescription>
            Get in touch with us by filling out the form below.
          </DialogDescription>
        </div>

        {/* Khung màu xanh bọc bên trong khung trắng */}
        <div className="flex flex-col md:flex-row bg-[#EDF4FF] rounded-md overflow-hidden">
          
          {/* LEFT SIDE - Giảm bớt padding trên mobile để tiết kiệm diện tích */}
          <div className="w-full md:w-[48%] p-6 md:p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-5xl font-semibold text-[#256BE8] leading-tight mb-1">
                Get In Touch
              </h2>
              <h2 className="text-3xl md:text-5xl font-semibold text-[#111F32] mb-4">
                With Us Today!
              </h2>
              <p className="text-[#1E0F48] text-sm md:text-base opacity-80 leading-relaxed">
                Drop your contact details into the form, and we&apos;ll reach out to you!
              </p>
            </div>

            {/* Ảnh minh họa ẩn trên mobile cực nhỏ hoặc chỉnh nhỏ lại để form không bị đẩy xuống quá xa */}
            <div className="relative w-full aspect-square my-6 max-h-40 md:max-h-none">
              <Image
                src="/assets/ship-contact.png"
                alt="Contact Ship Illustration"
                fill
                className="object-contain"
              />
            </div>

            <div className="hidden md:block">
              <p className="text-sm text-[#1E0F48] mb-1">Or reach out to us at</p>
              <a
                href="mailto:info@chinasourcing.co"
                className="text-[#1948C4] font-bold underline hover:text-blue-800 transition-colors"
              >
                info@chinasourcing.co
              </a>
            </div>
          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="w-full md:w-[55%] p-6 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              
              {/* Name - Bắt buộc */}
              <div className="space-y-1.5">
                <label className="text-[13px] md:text-sm font-semibold text-gray-600 ml-1">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  name="name"
                  required
                  placeholder="John"
                  className="w-full bg-white rounded-sm px-4 py-2 outline-none border-none focus:ring-2 focus:ring-[#256BE8]/30 font-medium text-[#111F32]"
                />
              </div>

              {/* Email - Bắt buộc */}
              <div className="space-y-1.5">
                <label className="text-[13px] md:text-sm font-semibold text-gray-600 ml-1">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Johndawson@company.com"
                  className="w-full bg-white rounded-sm px-4 py-2 outline-none border-none focus:ring-2 focus:ring-[#256BE8]/30 font-medium text-[#111F32]"
                />
              </div>

              {/* Company & Website - Gộp lại thành grid 2 cột trên desktop, 1 cột trên mobile */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] md:text-sm font-semibold text-gray-600 ml-1">Company</label>
                  <input
                    name="companyName"
                    placeholder="Johndawson@company.com"
                    className="w-full bg-white rounded-sm px-4 py-2 outline-none border-none focus:ring-2 focus:ring-[#256BE8]/30 font-medium text-[#111F32]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] md:text-sm font-semibold text-gray-600 ml-1">Website</label>
                  <input
                    name="website"
                    placeholder="johndawson.com"
                    className="w-full bg-white rounded-sm px-4 py-2 outline-none border-none focus:ring-2 focus:ring-[#256BE8]/30 font-medium text-[#111F32]"
                  />
                </div>
              </div>

              {/* MOQ */}
              <div className="space-y-1.5">
                <label className="text-[13px] md:text-sm font-semibold text-gray-600 ml-1">MOQ Preference</label>
                <Select name="moq" defaultValue="0-99">
                  <SelectTrigger className="w-full bg-white rounded-sm px-4 py-3 outline-none border-none focus:ring-2 focus:ring-[#256BE8]/30 font-medium text-[#111F32]">
                    <SelectValue placeholder="Select MOQ" />
                  </SelectTrigger>
                  <SelectContent className="border-[#256BE8]">
                    <SelectItem value="0-99">0-99 items</SelectItem>
                    <SelectItem value="100-499">100-499 items</SelectItem>
                    <SelectItem value="500+">500+ items</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-[13px] md:text-sm font-semibold text-gray-600 ml-1">Message</label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Hello, I am John Dawson from AZ Logistics Company"
                  className="w-full bg-white rounded-sm px-4 py-3 outline-none border-none focus:ring-2 focus:ring-[#256BE8]/30 font-medium resize-none text-[#111F32]"
                />
              </div>

              {/* Button Gửi - Đổi màu xanh đậm chuyên nghiệp hơn */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full md:w-auto
                  bg-[#27308D] text-white 
                  px-10 py-4 rounded-md
                  flex items-center justify-center gap-3 
                  hover:bg-[#256BE8] transition-all 
                  active:scale-95 disabled:opacity-50 
                  text-md
                  shadow-lg
                "
              >
                {loading ? "Processing..." : "Send Message"}
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}