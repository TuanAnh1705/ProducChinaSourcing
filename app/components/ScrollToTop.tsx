"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image"; // Import thêm thẻ Image

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          // Giữ nguyên style Neon của bạn
          className="fixed md:bottom-10 md:right-10 bottom-1 right-3 z-100 p-2 rounded-none transition-all duration-300 group cursor-pointer"
          aria-label="Scroll to top"
        >
          {/* Thay thế icon bằng thẻ Image */}
          <div className="relative w-11 h-11 md:w-13 md:h-13 group-hover:-translate-y-1 transition-transform duration-300">
            <Image
              src="/assets/scroll-arrow.png" // Đường dẫn tới hình ảnh mũi tên của bạn
              alt="Scroll to top"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}