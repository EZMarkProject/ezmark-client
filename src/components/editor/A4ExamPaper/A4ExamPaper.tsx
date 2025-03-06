'use client'

import { type A4ExamPaperProps } from "./interface"
import DefaultHeader from "@/components/exam-header-templates";
import MultipleChoiceQuestion from "@/components/questions-type/multiple-choice-question";
import FillInBlankQuestion from "@/components/questions-type/fill-in-blank-question";
import { Blank } from "@/components/layout-components/Blank";
import { nanoid } from "nanoid";
import { OpenQuestion } from "@/components/questions-type/open-question";
import { Divider } from "@/components/layout-components/Divider";

export function A4ExamPaper({
    exam,
    renderMode,
    scale = 1,
    onMCQQuestionChange,
    onMCQOptionChange,
    onFillInBlankContentChange,
    onOpenQuestionChange,
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
                                    questionNumber={item.questionNumber}
                                />
                            );
                        case 'fill-in-blank':
                            return (
                                <FillInBlankQuestion
                                    key={item.id}
                                    questionObj={item}
                                    onContentChange={onFillInBlankContentChange}
                                    renderMode={renderMode}
                                    questionNumber={item.questionNumber}
                                />
                            );
                        case 'open':
                            return (
                                <OpenQuestion
                                    key={item.id}
                                    questionObj={item}
                                    onContentChange={onOpenQuestionChange}
                                    renderMode={renderMode}
                                    questionNumber={item.questionNumber}
                                />
                            );
                        case 'blank':
                            return (
                                <Blank
                                    key={item.id}
                                    lines={item.lines}
                                />
                            );
                        case 'divider':
                            return (
                                <Divider
                                    key={item.id}
                                />
                            );
                        default:
                            return <div className="text-red-500" key={nanoid()}>Component Not Found</div>
                    }
                })}
            </div>
        </div>
    )
} 