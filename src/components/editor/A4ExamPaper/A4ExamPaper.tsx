'use client'

import { type A4ExamPaperProps } from "./interface"
import DefaultHeader from "@/components/exam-header-templates";
import MultipleChoiceQuestion from "@/components/questions-type/multiple-choice-question";
import FillInBlankQuestion from "@/components/questions-type/fill-in-blank-question";
import { Blank } from "@/components/layout-components/Blank";
import { nanoid } from "nanoid";
import { OpenQuestion } from "@/components/questions-type/open-question";
import { Divider } from "@/components/layout-components/Divider";
import { ClickDragContainer } from "../ClickDragContainer";

export function A4ExamPaper({
    exam,
    renderMode,
    scale = 1,
    onMCQQuestionChange,
    onMCQOptionChange,
    onFillInBlankContentChange,
    onOpenQuestionChange,
    handleComponentClick
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
                {exam.examData.components.map(item => {
                    switch (item.type) {
                        case 'default-header':
                            return (
                                <ClickDragContainer
                                    key={item.id}
                                    componentId={item.id}
                                    onClick={() => {
                                        handleComponentClick(item.id);
                                    }}
                                >
                                    <DefaultHeader
                                        key={`header-${item.id}`}
                                        exam={exam}
                                    />
                                </ClickDragContainer>
                            );
                        case 'multiple-choice':
                            return (
                                <ClickDragContainer
                                    key={item.id}
                                    componentId={item.id}
                                    onClick={() => {
                                        handleComponentClick(item.id);
                                    }}
                                >
                                    <MultipleChoiceQuestion
                                        questionObj={item}
                                        onQuestionChange={onMCQQuestionChange}
                                        onOptionChange={onMCQOptionChange}
                                        renderMode={renderMode}
                                        questionNumber={item.questionNumber}
                                    />
                                </ClickDragContainer>
                            );
                        case 'fill-in-blank':
                            return (
                                <ClickDragContainer
                                    key={item.id}
                                    componentId={item.id}
                                    onClick={() => {
                                        handleComponentClick(item.id)
                                    }}
                                >
                                    <FillInBlankQuestion
                                        key={`fill-${item.id}`}
                                        questionObj={item}
                                        onContentChange={onFillInBlankContentChange}
                                        renderMode={renderMode}
                                        questionNumber={item.questionNumber}
                                    />
                                </ClickDragContainer>
                            );
                        case 'open':
                            return (
                                <ClickDragContainer
                                    key={item.id}
                                    componentId={item.id}
                                    onClick={() => {
                                        handleComponentClick(item.id)
                                    }}
                                >
                                    <OpenQuestion
                                        key={`open-${item.id}`}
                                        questionObj={item}
                                        onContentChange={onOpenQuestionChange}
                                        renderMode={renderMode}
                                        questionNumber={item.questionNumber}
                                    />
                                </ClickDragContainer>
                            );
                        case 'blank':
                            return (
                                <ClickDragContainer
                                    key={item.id}
                                    componentId={item.id}
                                    onClick={() => {
                                        handleComponentClick(item.id)
                                    }}
                                >
                                    <Blank
                                        key={`blank-${item.id}`}
                                        lines={item.lines}
                                    />
                                </ClickDragContainer>
                            );
                        case 'divider':
                            return (
                                <ClickDragContainer
                                    key={item.id}
                                    componentId={item.id}
                                    onClick={() => {
                                        handleComponentClick(item.id)
                                    }}
                                >
                                    <Divider
                                        key={`divider-${item.id}`}
                                    />
                                </ClickDragContainer>
                            );
                        default:
                            return <div className="text-red-500" key={nanoid()}>Component Not Found</div>
                    }
                })}
            </div>
        </div>
    )
} 