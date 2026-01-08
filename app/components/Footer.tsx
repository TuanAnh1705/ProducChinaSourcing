/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { ArrowRight, ChevronDown, MapPin, Mail } from 'lucide-react';
import { ContactDialog } from './ContactDialog';
import axios from 'axios';
import { ApiResponse } from '@/backend/dto/product.dto';
import toast from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';

const Footer = () => {
    const bannerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [openLocation, setOpenLocation] = useState<string | null>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    const handleLogoClick = (e: React.MouseEvent) => {
        if (pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            router.push("/");
        }
    };

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        try {
            const res = await axios.post<ApiResponse<null>>('/api/newsletter', { email });
            if (res.data.success) {
                toast.success(res.data.message);
                setEmail("");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (bannerRef.current) {
            const rect = bannerRef.current.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        }
    };

    const toggleLocation = (loc: string) => {
        setOpenLocation(openLocation === loc ? null : loc);
    };

    const footerLinks = [
        {
            title: "EXPLORE US",
            links: [
                { name: "About Us", url: "https://chinasourcing.co/about-us/" },
                { name: "Case Studies", url: "https://chinasourcing.co/case-studies/" },
                { name: "Resources", url: "https://chinasourcing.co/resources/" },
                { name: "Contact Us", url: "https://chinasourcing.co/contact-us/" }
            ],
            hasSeeMore: false
        },
        {
            title: "OUR PRODUCTS",
            links: [
                { name: "Furniture", url: "https://chinasourcing.co/furniture" },
                { name: "Bags & Cases", url: "https://chinasourcing.co/bags-and-cases" },
                { name: "Building Materials", url: "https://chinasourcing.co/building-materials" },
                { name: "Chemicals & Cleaning", url: "https://chinasourcing.co/chemicals-and-cleaning" }
            ],
            hasSeeMore: true,
            seeMoreLink: "https://chinasourcing.co/products/"
        },
        {
            title: "OUR SERVICES",
            links: [
                { name: "Product Sourcing", url: "https://chinasourcing.co/product-sourcing" },
                { name: "Quality Control", url: "https://chinasourcing.co/quality-control" },
                { name: "Freight & Logistics", url: "https://chinasourcing.co/" },
                { name: "Warehousing & Fulfillment", url: "https://chinasourcing.co/" }
            ],
            hasSeeMore: true,
            seeMoreLink: "https://chinasourcing.co/services/"
        },
    ];

    const locations = [
        {
            name: "China",
            address: "Jinbin Tengyuue Mansion, South Tower, No.49 Huaxia Road, Tianhe District, Guanzhou city, Guangdong Province, China",
            email: "bheki@onelinkholdings.com"
        },
        {
            name: "Hongkong",
            address: "Unit D, 16/F, One Capital Place, 18 Luard Road, Wan Chai - Hong Kong",
            email: "tom@onelinkholdings.com"
        },
        {
            name: "Vietnam",
            address: "771 Ngo Quyen Street, An Hai Bac Ward, Son Tra District, Da Nang city, Vietnam",
            email: "kady@onelinkholdings.com"
        },
        {
            name: "Brisbane, Australia",
            address: "Stafford St, Brisbane 4169, QLD, Australia",
            email: "sam@onelinkholdings.com"
        },
        {
            name: "Sydney, Australia",
            address: "Allenby Park Parade, Sydney, Allambie Heights, NSW, Australia - 2100",
            email: "lee@onelinkholdings.com"
        }
    ];

    const socialMedia = [
        { name: "Facebook", url: "https://www.facebook.com/chinasourcing.co" },
        { name: "Linkedin", url: "https://www.linkedin.com/company/china-sourcing-co/" },
        { name: "Instagram", url: "https://www.instagram.com/chinasourcing.co/" }
    ];

    return (
        <footer className="w-full bg-[#FAFAFA] pt-16 font-sans">
            <div className="max-w-360 mx-auto px-10">
                {/* Logo & Newsletter */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-12 border-b border-[#1E0F48] pb-10">
                    <div
                        className="w-76 h-36 md:w-96 md:h-32 relative shrink-0 cursor-pointer"
                        onClick={handleLogoClick}
                    >
                        <Image
                            src="/assets/Group.png"
                            alt="China Sourcing"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="w-full md:w-125">
                        <p className="text-lg md:text-xl text-[#525252] uppercase">Stay Ahead in Sourcing</p>
                        <h3 className="text-md md:text-lg text-[#0A0A0A] mb-6 font-medium">Actionable Insights</h3>
                        <div className="flex gap-2">
                            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="flex-1 border border-[#E5E5E5] px-2 py-2 md:px-6 md:py-2 rounded-sm focus:outline-none text-sm focus:border-[#2E3590] transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-[#2E3590] text-white px-2 py-2 md:px-8 md:py-3 rounded-sm text-sm font-medium hover:bg-blue-900 transition-all disabled:opacity-50 cursor-pointer"
                                >
                                    {isSubmitting ? "..." : "Submit"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Link Grid */}
                <div className="grid grid-cols-1 md:grid-cols-[240px_240px_240px_300px_240px] gap-10 mb-20">
                    {footerLinks.map((section) => (
                        <div key={section.title} className="flex flex-col">
                            <h4 className="text-lg md:text-xl font-medium text-gray-800 mb-8 uppercase">{section.title}</h4>
                            <ul className="space-y-5">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 group cursor-pointer"
                                        >
                                            <span className="w-1.5 h-1.5 bg-[#2E3590] shrink-0" />
                                            <span className="text-md md:text-lg text-gray-600 group-hover:text-[#2E3590] transition-colors leading-snug">
                                                {link.name === "Warehousing & Fulfillment" ? (
                                                    <>Warehousing &<br className="hidden md:block" />Fulfillment</>
                                                ) : link.name}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            {section.hasSeeMore && (
                                <a
                                    href={section.seeMoreLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 text-[#1D59C0] text-md md:text-lg md:ml-5 hover:underline flex items-center gap-1"
                                >
                                    See more
                                </a>
                            )}
                        </div>
                    ))}

                    {/* OUR LOCATION */}
                    <div>
                        <h4 className="text-lg md:text-xl font-medium text-gray-800 mb-7 uppercase">OUR LOCATION</h4>
                        <div className="space-y-0">
                            {locations.map((loc) => (
                                <div key={loc.name} className="pb-3">
                                    <button onClick={() => toggleLocation(loc.name)} className="w-full flex items-center justify-between group py-1">
                                        <div className="flex items-center gap-3">
                                            <span className="w-1.5 h-1.5 bg-[#1E0F48] shrink-0" />
                                            <span className="text-md md:text-lg text-gray-600 group-hover:text-[#1E0F48] transition-colors">{loc.name}</span>
                                        </div>
                                        <ChevronDown size={20} className={`transition-transform duration-300 md:-translate-x-20 ${openLocation === loc.name ? 'rotate-180 group-hover:text-[#1E0F48]' : 'text-gray-600 group-hover:text-[#1E0F48]'}`} />
                                    </button>
                                    <AnimatePresence>
                                        {openLocation === loc.name && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                <div className="flex flex-col gap-4 pt-4 pb-2">
                                                    <div className="flex gap-3 items-start">
                                                        <MapPin size={18} className="shrink-0 text-gray-600 mt-1" />
                                                        <p className="text-md md:text-lg text-[#1E0F48] leading-relaxed">{loc.address}</p>
                                                    </div>
                                                    <div className="flex gap-3 items-center">
                                                        <Mail size={18} className="shrink-0 text-gray-600" />
                                                        <a className="text-md md:text-lg text-[#1E0F48] ">{loc.email}</a>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SOCIAL MEDIA */}
                    <div>
                        <h4 className="text-lg md:text-xl font-medium text-gray-800 mb-8 uppercase">SOCIAL MEDIA</h4>
                        <ul className="space-y-5">
                            {socialMedia.map((social) => (
                                <li key={social.name}>
                                    <a
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        /* SỬA Ở ĐÂY: 
                                           w-full: Chiếm hết chiều ngang trên mobile giúp icon đẩy ra xa nhất có thể.
                                           md:max-w-[180px]: Giới hạn lại độ rộng khi lên màn hình máy tính để không bị quá thưa.
                                        */
                                        className="flex items-center justify-between group cursor-pointer w-full md:max-w-45"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="w-1.5 h-1.5 bg-[#2E3590] shrink-0" />
                                            <span className="text-md md:text-lg text-gray-600 group-hover:text-[#2E3590] transition-colors leading-snug">
                                                {social.name}
                                            </span>
                                        </div>
                                        <ArrowRight
                                            size={20}
                                            className="-rotate-45 text-gray-600 group-hover:text-[#2E3590] transition-all duration-300"
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[#1E0F48] py-10 flex flex-col md:flex-row justify-between text-xs md:text-[14px] text-[#1E0F48] ">
                    <p>2026 © China Sourcing Co. All Rights Reserved</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <a href="https://chinasourcing.co/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-[#2E3590] transition-colors">Privacy Policy</a>
                    </div>
                </div>
            </div>

            {/* BANNER MARQUEE */}
            <ContactDialog>
                <div
                    ref={bannerRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative w-full bg-[#2E3590] h-40 md:h-32 overflow-hidden cursor-pointer flex items-center"
                >
                    <div className="flex whitespace-nowrap">
                        <motion.div
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ repeat: Infinity, duration: 55, ease: "linear" }}
                            className="flex items-center text-[90px] md:text-[95px] text-[#8F9AD9]"
                        >
                            {[1, 2, 3, 4].map((i) => (
                                <span key={i} className="flex items-center pr-10">
                                    Interested in working together? Let&apos;s discuss.
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                style={{ left: mouseX, top: mouseY, x: "-50%", y: "-50%" }}
                                className="absolute z-50 pointer-events-none bg-[#256BE8] text-white px-6 py-3 rounded-md font-semibold flex items-center gap-3 shadow-xl whitespace-nowrap w-max"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                            >
                                <span className="text-xl">Say Hi!</span>
                                <ArrowRight size={22} className="shrink-0" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </ContactDialog>
        </footer>
    );
};

export default Footer;