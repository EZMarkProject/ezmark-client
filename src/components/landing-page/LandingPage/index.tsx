"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Navbar from "../Navbar";
import HeroSection from "../HeroSection";
import FeaturesSection from "../FeaturesSection";
import TechnicalHighlightsSection from "../TechnicalHighlightsSection";
import TestimonialsSection from "../TestimonialsSection";
import CTASection from "../CTASection";
import { LandingPageProps } from "../types";
import { defaultFeaturesData, defaultTestimonialsData } from "../helpers";
import { useRouter } from "next/navigation";

const LandingPage: React.FC<LandingPageProps> = ({
    className,
    onGetStartedClick,
    featuresData = defaultFeaturesData,
    testimonialsData = defaultTestimonialsData,
}) => {
    const router = useRouter();

    const handleSignUpClick = () => {
        router.push("/auth/signup");
    };

    const handleLoginClick = () => {
        router.push("/auth/login");
    };

    return (
        <div className={cn("flex flex-col min-h-screen relative overflow-hidden", className)}>
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
                <FeaturesSection featuresData={featuresData} />

                {/* Technical Highlights Section */}
                <TechnicalHighlightsSection />

                {/* Testimonials Section */}
                <TestimonialsSection testimonialsData={testimonialsData} />

                {/* CTA Section */}
                <CTASection onGetStartedClick={onGetStartedClick} />
            </div>
        </div>
    );
};

export default LandingPage; 