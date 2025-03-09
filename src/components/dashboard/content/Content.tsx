"use client";

import { ContentProps } from "./interface";

const Content = ({ activeTab }: ContentProps) => {
    return (
        <div className="flex-1 bg-muted/80">
            <div className="h-full p-2">
                <div className="bg-background rounded-2xl p-6 h-full shadow-sm">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold tracking-tight">{getTabTitle(activeTab)}</h1>
                        <p className="text-muted-foreground">
                            {getTabDescription(activeTab)}
                        </p>
                    </div>
                    {/* 在这里添加内容 */}
                    <div className="grid gap-6">
                        {activeTab === "exams" && <ExamsContent />}
                        {activeTab === "analysis" && <AnalysisContent />}
                        {activeTab === "classes" && <ClassesContent />}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper functions to get tab-specific content
const getTabTitle = (tab: string): string => {
    switch (tab) {
        case "exams":
            return "Exams";
        case "analysis":
            return "Analysis";
        case "classes":
            return "Classes";
        default:
            return "Dashboard";
    }
};

const getTabDescription = (tab: string): string => {
    switch (tab) {
        case "exams":
            return "Manage and review your exam papers.";
        case "analysis":
            return "View student performance analytics.";
        case "classes":
            return "Manage your class groups and students.";
        default:
            return "Welcome to your dashboard.";
    }
};

// Tab-specific content components
const ExamsContent = () => {
    return (
        <div>
            Exams Component
        </div>
    );
};


const AnalysisContent = () => {
    return (
        <div>
            Analysis Component
        </div>
    );
};

const ClassesContent = () => {
    return (
        <div>
            Classes Component
        </div>
    );
};

export default Content; 