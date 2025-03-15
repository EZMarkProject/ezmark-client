"use client";

import { ExamContent } from "./ExamContent";
import { ContentProps } from "./interface";
import { StudentContent } from "./StudentContent";

const Content = ({ activeTab }: ContentProps) => {
    return (
        <div className="flex-1 bg-muted/80">
            <div className="h-full p-2">
                <div className="bg-background rounded-2xl p-6 h-full shadow-sm">
                    {/* 在这里添加内容 */}
                    <div className="h-[100%]">
                        {activeTab === "exams" && <ExamContent />}
                        {activeTab === "students" && <StudentContent />}
                        {activeTab === "classes" && <ClassesContent />}
                    </div>
                </div>
            </div>
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