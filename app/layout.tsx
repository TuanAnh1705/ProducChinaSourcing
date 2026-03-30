import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SearchProvider } from "./context/SearchContext";
import { SearchHeader } from "./components/SearchHeader";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { ScrollToTop } from "./components/ScrollToTop";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});


export const metadata: Metadata = {
  title: "China Sourcing Co",
  description: "We source high-quality products across industries. If you don’t see what you need, reach out for custom sourcing solutions.",
  icons: {
    icon: "/assets/logo.png", 
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <SearchProvider>
          <SearchHeader />
          <Toaster
            // 1. Đặt vị trí cơ bản là top-center để nó căn giữa chiều ngang trước
            position="top-center"
            containerStyle={{
              // 2. Ép vị trí nằm giữa màn hình
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            toastOptions={{
              // Tùy chỉnh thêm CSS để Toast trông chuyên nghiệp hơn (Style Neon Tech)
              duration: 3000,
              style: {
                background: "#111F32", // Màu nền tối theo style của bạn
                color: "#fff",
                padding: "20px 30px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "500",
                border: "1px solid #256BE8", // Viền xanh Neon
                boxShadow: "0 0 20px rgba(37, 107, 232, 0.2)", // Đổ bóng phát sáng
              },
              success: {
                iconTheme: {
                  primary: "#256BE8",
                  secondary: "#fff",
                },
              },
            }}
          />
          <main className="pt-5 bg-white">{children}</main>
          <ScrollToTop />
          <Footer />
        </SearchProvider>
      </body>
    </html>
  );
}
