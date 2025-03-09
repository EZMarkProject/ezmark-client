"use client";

import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import TechnicalHighlightsSection from "./TechnicalHighlightsSection";
import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CTASection";
import { defaultFeaturesData, defaultTestimonialsData } from "./helpers";
import { useRouter } from "next/navigation";

const LandingPage: React.FC = () => {
    const router = useRouter();

    const onGetStartedClick = () => {
        router.push("/dashboard");
    };

    const handleSignUpClick = () => {
        router.push("/auth/signup");
    };

    const handleLoginClick = () => {
        router.push("/auth/login");
    };

    return (
        <div className="flex flex-col min-h-screen relative overflow-hidden">
            {/* Content Layer with higher z-index */}
            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Navbar */}
                <Navbar
                    onLoginClick={handleLoginClick}
                    onSignUpClick={handleSignUpClick}
                />

                {/* Hero Section */}
                <HeroSection onGetStartedClick={onGetStartedClick} />

                {/* Features Section */}
                <FeaturesSection featuresData={defaultFeaturesData} />

                {/* Technical Highlights Section */}
                <TechnicalHighlightsSection />

                {/* Testimonials Section */}
                <TestimonialsSection testimonialsData={defaultTestimonialsData} />

                {/* CTA Section */}
                <CTASection onGetStartedClick={onGetStartedClick} />
            </div>
        </div>
    );
};

export default LandingPage; 