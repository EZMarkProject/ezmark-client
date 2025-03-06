'use client'

import { type A4ExamPaperProps } from "./interface"
import { MultipleChoiceQuestion } from '@/components/multiple-choice-question'
import FillInBlankQuestion from '@/components/fill-in-blank-question'
import DefaultHeader from "@/components/exam-header-templates";

export function A4ExamPaper({
    exam,
    renderMode,
    scale = 1,
    onMCQQuestionChange,
    onMCQOptionChange,
    onFillInBlankContentChange,
}: A4ExamPaperProps) {
    return (
        <div
            style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top center',
                transition: 'transform 0.1s ease-out',
                width: 'fit-content',
                paddingTop: '1rem'
            }}
        >
            <div className="bg-background w-[210mm] min-h-[297mm] mx-auto p-8 shadow-lg">
                {exam.components.map(item => {
                    switch (item.type) {
                        case 'default-header':
                            return (
                                <DefaultHeader
                                    key={item.id}
                                    exam={exam}
                                />
                            );
                        case 'multiple-choice':
                            return (
                                <MultipleChoiceQuestion
                                    key={item.id}
                                    questionObj={item}
                                    onQuestionChange={onMCQQuestionChange}
                                    onOptionChange={onMCQOptionChange}
                                    renderMode={renderMode}
                                    questionNumber={Number(item.id)}
                                />
                            );
                        case 'fill-in-blank':
                            return (
                                <FillInBlankQuestion
                                    key={item.id}
                                    questionObj={item}
                                    onContentChange={onFillInBlankContentChange}
                                    renderMode={renderMode}
                                    questionNumber={Number(item.id)}
                                />
                            );
                        default:
                            return <div>Component Not Found</div>
                    }
                })}
            </div>
        </div>
    )
} 