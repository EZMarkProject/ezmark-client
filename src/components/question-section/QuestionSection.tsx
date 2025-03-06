import React from 'react';
import { MultipleChoiceQuestion } from '@/components/multiple-choice-question';
import FillInBlankQuestion from '@/components/fill-in-blank-question';
import { QuestionSectionProps } from './interface';

/**
 * QuestionSection component
 * A component that displays a list of questions
 * 当需要添加新的题型时,在这里添加
 * @param questions - The list of questions to display
 * @param renderMode - Whether the component is in render mode
 * @param onMCQQuestionChange - The callback function for when a multiple choice question is changed
 * @param onMCQOptionChange - The callback function for when a multiple choice option is changed
 * @param onFillInBlankContentChange - The callback function for when a fill in blank question is changed
 * @returns A component that displays a list of questions
 */
export default function QuestionSection({
    questions,
    renderMode,
    onMCQQuestionChange,
    onMCQOptionChange,
    onFillInBlankContentChange
}: QuestionSectionProps) {
    return (
        <div className="space-y-4">
            {questions.map((question, index) => {
                if (question.type === 'multiple-choice') {
                    return (
                        <div key={question.id} className="">
                            <MultipleChoiceQuestion
                                initialQuestionContent={question.question}
                                initialOptions={question.options?.map(opt => opt.content) || []}
                                onQuestionChange={(content) => onMCQQuestionChange?.(question.id, content)}
                                onOptionChange={(index, content) => onMCQOptionChange?.(question.id, index, content)}
                                renderMode={renderMode}
                                questionNumber={index + 1}
                            />
                        </div>
                    );
                } else if (question.type === 'fill-in-blank') {
                    return (
                        <div key={question.id} className="">
                            <FillInBlankQuestion
                                initialContent={question.content}
                                onContentChange={(content) => onFillInBlankContentChange?.(question.id, content)}
                                renderMode={renderMode}
                                questionNumber={index + 1}
                            />
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
} 