"use client";

import React from "react";
import Image from "next/image";
import { BarChart, CheckSquare, FileText, ArrowRight, ChevronRight, Sparkles, Brain, Layers, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tiles } from "@/components/ui/tiles";
import { cn } from "@/lib/utils";
import Navbar from "./Navbar";
import { LandingPageProps } from "./interface";
import { defaultFeaturesData, defaultTestimonialsData } from "./helpers";

const iconMap: Record<string, React.ReactNode> = {
    FileText: <FileText className="h-10 w-10" />,
    CheckSquare: <CheckSquare className="h-10 w-10" />,
    BarChart: <BarChart className="h-10 w-10" />,
};

const LandingPage: React.FC<LandingPageProps> = ({
    className,
    onGetStartedClick,
    featuresData = defaultFeaturesData,
    testimonialsData = defaultTestimonialsData,
}) => {
    return (
        <div className={cn("flex flex-col min-h-screen relative overflow-hidden", className)}>
            {/* Tiles as Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-40">
                <Tiles
                    rows={40}
                    cols={20}
                    tileSize="md"
                    tileClassName="border-opacity-50 dark:border-opacity-50"
                />
            </div>

            {/* Content Layer with higher z-index */}
            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Navbar */}
                <Navbar
                    onLoginClick={() => console.log("Login clicked")}
                    onSignUpClick={() => console.log("Sign up clicked")}
                />

                {/* Hero Section - Updated to match the image */}
                <section className="relative w-full py-14 md:py-20">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center text-center max-w-5xl mx-auto backdrop-blur-[2px] bg-background/40 rounded-lg p-8">
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
                                EZMark: The Future of Smart Exam Management is Here
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl">
                                Empower Your Team, Streamline Your Processes, And Boost Educational Outcomes With Our Exam Management Platform
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="default" className="px-6 py-2 h-auto" onClick={onGetStartedClick}>
                                    Get Started
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                                <Button size="default" variant="outline" className="px-6 py-2 h-auto border-[#e5e7eb]">
                                    <Play className="mr-2 h-4 w-4" />
                                    Play Video
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="w-full py-16 bg-gradient-to-b from-background to-background/50">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
                                Comprehensive Exam Management
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-3xl">
                                EZMark streamlines the entire examination lifecycle through three integrated modules
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {featuresData.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group relative flex flex-col overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 duration-300"
                                >
                                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                                        <Image
                                            src={feature.imageUrl || `/images/feature-${index + 1}.jpg`}
                                            alt={feature.title}
                                            fill
                                            className="object-cover transition-transform group-hover:scale-105 duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                        <p className="text-muted-foreground text-base">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Technical Highlights Section */}
                <section className="w-full py-14">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="flex-1 order-2 md:order-1">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <Card className="cursor-pointer transition-all hover:shadow-md">
                                                <CardHeader>
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-1.5 rounded-md bg-primary/10">
                                                            <Layers className="h-5 w-5 text-primary" />
                                                        </div>
                                                        <CardTitle className="text-lg">React Frontend</CardTitle>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <CardDescription>
                                                        Modern UI with mathematical rendering capabilities
                                                    </CardDescription>
                                                </CardContent>
                                            </Card>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-80">
                                            <div className="flex flex-col gap-2">
                                                <h4 className="font-medium">React Frontend</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Built with React and Next.js for optimal performance, with integrated LaTeX rendering for mathematical formulas and equations.
                                                </p>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>

                                    <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <Card className="cursor-pointer transition-all hover:shadow-md">
                                                <CardHeader>
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-1.5 rounded-md bg-primary/10">
                                                            <Brain className="h-5 w-5 text-primary" />
                                                        </div>
                                                        <CardTitle className="text-lg">OCR Services</CardTitle>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <CardDescription>
                                                        Optimized for handwritten answers
                                                    </CardDescription>
                                                </CardContent>
                                            </Card>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-80">
                                            <div className="flex flex-col gap-2">
                                                <h4 className="font-medium">Advanced OCR</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Specialized optical character recognition algorithms trained on diverse handwriting styles for accurate digitization of student responses.
                                                </p>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>

                                    <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <Card className="cursor-pointer transition-all hover:shadow-md">
                                                <CardHeader>
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-1.5 rounded-md bg-primary/10">
                                                            <BarChart className="h-5 w-5 text-primary" />
                                                        </div>
                                                        <CardTitle className="text-lg">Data Visualization</CardTitle>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <CardDescription>
                                                        Interactive insights for educators
                                                    </CardDescription>
                                                </CardContent>
                                            </Card>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-80">
                                            <div className="flex flex-col gap-2">
                                                <h4 className="font-medium">Interactive Visualizations</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Comprehensive data visualization tools that transform assessment data into actionable educational insights through charts, heatmaps, and knowledge graphs.
                                                </p>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>

                                    <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <Card className="cursor-pointer transition-all hover:shadow-md">
                                                <CardHeader>
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-1.5 rounded-md bg-primary/10">
                                                            <CheckSquare className="h-5 w-5 text-primary" />
                                                        </div>
                                                        <CardTitle className="text-lg">Collaborative Grading</CardTitle>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <CardDescription>
                                                        With version control and tracking
                                                    </CardDescription>
                                                </CardContent>
                                            </Card>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-80">
                                            <div className="flex flex-col gap-2">
                                                <h4 className="font-medium">Team Grading Environment</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Multi-user grading platform with annotation history, change tracking, and role-based permissions for transparent and efficient assessment workflows.
                                                </p>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                </div>
                            </div>
                            <div className="flex-1 order-1 md:order-2 backdrop-blur-[2px] bg-background/40 rounded-lg p-6">
                                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
                                    Technical Highlights
                                </h2>
                                <p className="text-muted-foreground text-lg mb-8">
                                    EZMark combines cutting-edge technologies to deliver a seamless and powerful exam management experience.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full p-1 bg-primary/10 mt-1">
                                            <CheckSquare className="h-4 w-4 text-primary" />
                                        </div>
                                        <span>React frontend with mathematical rendering capabilities</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full p-1 bg-primary/10 mt-1">
                                            <CheckSquare className="h-4 w-4 text-primary" />
                                        </div>
                                        <span>Integrated OCR services optimized for handwritten answers</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full p-1 bg-primary/10 mt-1">
                                            <CheckSquare className="h-4 w-4 text-primary" />
                                        </div>
                                        <span>Interactive data visualizations for educational insights</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full p-1 bg-primary/10 mt-1">
                                            <CheckSquare className="h-4 w-4 text-primary" />
                                        </div>
                                        <span>Collaborative grading environment with version control</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="w-full py-14">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center text-center mb-12 backdrop-blur-[2px] bg-background/40 rounded-lg p-6">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
                                Trusted by Educators
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-3xl">
                                See how EZMark is transforming assessment processes in educational institutions
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonialsData.map((testimonial, index) => (
                                <Card key={index} className="bg-background">
                                    <CardContent className="pt-6">
                                        <div className="flex flex-col gap-4">
                                            <p className="italic text-muted-foreground">"{testimonial.content}"</p>
                                            <div className="flex items-center gap-4 mt-4">
                                                <div className="relative h-10 w-10 rounded-full overflow-hidden bg-secondary">
                                                    {testimonial.avatar && (
                                                        <Image
                                                            src={testimonial.avatar}
                                                            alt={testimonial.author}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{testimonial.author}</p>
                                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="w-full py-14 relative">
                    <div className="absolute inset-0 bg-primary opacity-90 z-0"></div>
                    <div className="container px-4 md:px-6 mx-auto relative z-10">
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-primary-foreground">
                                Ready to Transform Your Exam Process?
                            </h2>
                            <p className="text-primary-foreground/80 text-lg max-w-3xl mb-8">
                                Join educational institutions worldwide that are using EZMark to streamline assessment workflows and gain valuable insights.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    onClick={onGetStartedClick}
                                    className="bg-background text-primary hover:bg-background/90"
                                >
                                    Get Started Now
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                                <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:border-primary-foreground/30 hover:text-primary-foreground transition-colors">
                                    Request a Demo
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default LandingPage; 