"use client";

import React from "react";
import Image from "next/image";
import { BarChart, CheckSquare, ArrowRight, ChevronRight, Brain, Layers, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tiles } from "@/components/ui/tiles";
import { cn } from "@/lib/utils";
import Navbar from "./Navbar";
import { LandingPageProps } from "./interface";
import { defaultFeaturesData, defaultTestimonialsData } from "./helpers";
import { useLanguage } from '@/contexts/LanguageContext'
import { Locale, LocaleKey } from '@/locales';

const LandingPage: React.FC<LandingPageProps> = ({
    className,
    onGetStartedClick,
    featuresData = defaultFeaturesData,
    testimonialsData = defaultTestimonialsData,
}) => {
    const { t } = useLanguage();

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
                <section className="relative w-full py-12 md:py-20">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center text-center max-w-5xl mx-auto backdrop-blur-[2px] bg-background/40 rounded-lg p-8">
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
                                {t('heroTitle')}
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl">
                                {t('heroSubtitle')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="default" className="px-6 py-2 h-auto" onClick={onGetStartedClick}>
                                    {t('getStarted')}
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                                <Button size="default" variant="outline" className="px-6 py-2 h-auto border-[#e5e7eb]">
                                    <Play className="mr-2 h-4 w-4" />
                                    {t('playVideo')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="w-full py-8 bg-gradient-to-b from-background to-background/50">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
                                {t('comprehensiveExamManagement')}
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-3xl">
                                {t('examLifecycleDescription')}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {featuresData.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group relative flex flex-col overflow-hidden rounded-xl bg-card dark:bg-card border border-border dark:border-border shadow-sm transition-all hover:shadow-md hover:-translate-y-1 duration-300"
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
                                        <h3 className="text-2xl font-bold mb-3">{t(feature.titleKey as LocaleKey)}</h3>
                                        <p className="text-muted-foreground text-base">{t(feature.descriptionKey as LocaleKey)}</p>
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
                                                        <CardTitle className="text-lg">{t('reactFrontend' as LocaleKey)}</CardTitle>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <CardDescription>{t('modernUI' as LocaleKey)}</CardDescription>
                                                </CardContent>
                                            </Card>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-80">
                                            <div className="flex flex-col gap-2">
                                                <h4 className="font-medium">{t('reactFrontend' as LocaleKey)}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {t('reactFrontendDetail' as LocaleKey)}
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
                                                        <CardTitle className="text-lg">{t('ocrServices' as LocaleKey)}</CardTitle>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <CardDescription>{t('handwrittenOptimized' as LocaleKey)}</CardDescription>
                                                </CardContent>
                                            </Card>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-80">
                                            <div className="flex flex-col gap-2">
                                                <h4 className="font-medium">{t('advancedOCR' as LocaleKey)}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {t('ocrDetail' as LocaleKey)}
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
                                                        <CardTitle className="text-lg">{t('dataVisualization' as LocaleKey)}</CardTitle>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <CardDescription>{t('educatorInsights' as LocaleKey)}</CardDescription>
                                                </CardContent>
                                            </Card>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-80">
                                            <div className="flex flex-col gap-2">
                                                <h4 className="font-medium">{t('interactiveVisualizations' as LocaleKey)}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {t('visualizationDetail' as LocaleKey)}
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
                                                        <CardTitle className="text-lg">{t('collaborativeGrading' as LocaleKey)}</CardTitle>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <CardDescription>{t('versionControl' as LocaleKey)}</CardDescription>
                                                </CardContent>
                                            </Card>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-80">
                                            <div className="flex flex-col gap-2">
                                                <h4 className="font-medium">{t('teamGradingEnvironment' as LocaleKey)}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {t('collaborationDetail' as LocaleKey)}
                                                </p>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                </div>
                            </div>
                            <div className="flex-1 order-1 md:order-2 backdrop-blur-[2px] bg-background/40 rounded-lg p-6">
                                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
                                    {t('technicalHighlights' as LocaleKey)}
                                </h2>
                                <p className="text-muted-foreground text-lg mb-8">
                                    {t('technicalDescription' as LocaleKey)}
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full p-1 bg-primary/10 mt-1">
                                            <CheckSquare className="h-4 w-4 text-primary" />
                                        </div>
                                        <span>{t('reactFrontendBullet' as LocaleKey)}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full p-1 bg-primary/10 mt-1">
                                            <CheckSquare className="h-4 w-4 text-primary" />
                                        </div>
                                        <span>{t('ocrServicesBullet' as LocaleKey)}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full p-1 bg-primary/10 mt-1">
                                            <CheckSquare className="h-4 w-4 text-primary" />
                                        </div>
                                        <span>{t('dataVisualizationBullet' as LocaleKey)}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full p-1 bg-primary/10 mt-1">
                                            <CheckSquare className="h-4 w-4 text-primary" />
                                        </div>
                                        <span>{t('collaborativeGradingBullet' as LocaleKey)}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="w-full py-10">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center text-center mb-4 backdrop-blur-[2px] bg-background/40 rounded-lg p-6">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
                                {t('trustedByEducators' as LocaleKey)}
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-3xl">
                                {t('testimonialDescription' as LocaleKey)}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonialsData.map((testimonial, index) => (
                                <Card key={index} className="bg-background">
                                    <CardContent className="pt-6">
                                        <div className="flex flex-col gap-4">
                                            <p className="italic text-muted-foreground">&quot;{t(testimonial.contentKey as LocaleKey)}&quot;</p>
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
                                                    <p className="text-sm text-muted-foreground">{t(testimonial.roleKey as LocaleKey)}</p>
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
                                {t('transformExamProcess' as LocaleKey)}
                            </h2>
                            <p className="text-primary-foreground/80 text-lg max-w-3xl mb-8">
                                {t('joinInstitutions' as LocaleKey)}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    onClick={onGetStartedClick}
                                    className="bg-background text-primary hover:bg-background/90"
                                >
                                    {t('getStartedNow')}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                                <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:border-primary-foreground/30 hover:text-primary-foreground transition-colors">
                                    {t('requestADemo')}
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