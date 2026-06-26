"use client";
import { useState, useEffect } from "react";
import Icon from "./Icon";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Testimonials", href: "#testimonials" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-out ${isScrolled ? "backdrop-blur-md bg-oceanic/80 border-b border-nocturnal/50" : "bg-transparent"
                }`}
        >
            <nav
                aria-label="Main navigation"
                className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
            >
                {/* Logo */}
                <a href="#hero" className="font-mono font-bold text-xl text-forsythia hover:opacity-80 transition-opacity duration-150">
                    NeuralFlow
                </a>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="font-sans text-arctic/80 hover:text-forsythia transition-colors duration-150 ease-out text-sm"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <Icon name="search" size={18} strokeColor="#F1F6F4" className="opacity-50 hover:opacity-80 cursor-pointer transition-opacity duration-150" />
                    <a
                        href="#pricing"
                        className="bg-forsythia text-oceanic font-semibold font-sans text-sm px-4 py-2 rounded-md hover:bg-deep-saffron transition-colors duration-150 ease-out"
                    >
                        Get Started
                    </a>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-1"
                    onClick={() => setIsMenuOpen((v) => !v)}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? (
                        <Icon name="x-mark" size={24} strokeColor="#FFC801" />
                    ) : (
                        <>
                            <span className="block w-6 h-0.5 bg-forsythia rounded" />
                            <span className="block w-6 h-0.5 bg-forsythia rounded" />
                            <span className="block w-6 h-0.5 bg-forsythia rounded" />
                        </>
                    )}
                </button>
            </nav>

            {/* Mobile drawer */}
            <div
                className={`md:hidden absolute top-full left-0 right-0 bg-oceanic border-b border-nocturnal px-6 py-4 z-50 transition-all duration-200 ease-out ${isMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
            >
                <div className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="font-sans text-arctic/80 hover:text-forsythia transition-colors duration-150 text-base py-1"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#pricing"
                        onClick={() => setIsMenuOpen(false)}
                        className="bg-forsythia text-oceanic font-semibold font-sans text-sm px-4 py-2.5 rounded-md hover:bg-deep-saffron transition-colors duration-150 text-center mt-2"
                    >
                        Get Started
                    </a>
                </div>
            </div>
        </header>
    );
}