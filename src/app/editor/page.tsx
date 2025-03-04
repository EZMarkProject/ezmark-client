'use client'

import { useState } from 'react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { MultipleChoiceQuestion } from '@/components/multiple-choice-question'
import FillInBlankQuestion from '@/components/fill-in-blank-question'
import { Question } from '@/types'

export default function Editor() {
    // 使用数组存储所有题目，方便将来扩展
    const [questions, setQuestions] = useState<Question[]>([
        {
            id: '1',
            type: 'multiple-choice',
            questionNumber: 1,
            question: '<p>What&nbsp;is&nbsp;the&nbsp;derivative&nbsp;of&nbsp;the&nbsp;function&nbsp;<span class="latex-formula">f(x) = 3x^4 - 5x^3 + 2x - 7</span>&nbsp; ${input}</p>',
            options: [
                '<p><span class="latex-formula">12x^3 - 15x^2 + 2</span>&nbsp;</p>',
                '<p><span class="latex-formula">12x^3 - 15x^2 + 2x</span>&nbsp;</p>',
                '<p><span class="latex-formula">12x^3 - 15x^2 - 5</span>&nbsp;</p>',
                '<p><span class="latex-formula">12x^3 - 15x^2 + 2x - 7</span>&nbsp;</p>',
            ]
        },
        {
            id: '2',
            type: 'fill-in-blank',
            questionNumber: 2,
            content: '<p>The library is a quiet place where people can ${input} and enjoy reading.</p>'
        }
    ]);

    // 更新多选题内容
    const handleMCQQuestionChange = (questionId: string, content: string) => {
        setQuestions(prev => prev.map(q => {
            if (q.id === questionId && q.type === 'multiple-choice') {
                return {
                    ...q,
                    question: content
                };
            }
            return q;
        }));
    };

    // 更新多选题选项
    const handleMCQOptionChange = (questionId: string, optionIndex: number, content: string) => {
        setQuestions(prev => prev.map(q => {
            if (q.id === questionId && q.type === 'multiple-choice') {
                const newOptions = [...q.options];
                newOptions[optionIndex] = content;
                return {
                    ...q,
                    options: newOptions
                };
            }
            return q;
        }));
    };

    // 更新填空题内容
    const handleFillInBlankContentChange = (questionId: string, content: string) => {
        setQuestions(prev => prev.map(q => {
            if (q.id === questionId && q.type === 'fill-in-blank') {
                return {
                    ...q,
                    content
                };
            }
            return q;
        }));
    };

    return (
        <>
            <div className='flex justify-end p-4'>
                <ThemeToggle />
            </div>
            <div className='max-w-3xl mx-auto mt-10 px-4'>
                <div className="bg-card p-6 rounded-xl mb-6">
                    <h2 className="text-lg font-medium mb-4">Question Editor Demo</h2>
                    <p className="text-muted-foreground mb-4">
                        Test the rich text editor functionality for generating different types of questions.
                    </p>
                </div>

                {questions.map((question) => {
                    if (question.type === 'multiple-choice') {
                        return (
                            <MultipleChoiceQuestion
                                key={question.id}
                                questionNumber={question.questionNumber}
                                initialQuestionContent={question.question}
                                initialOptions={question.options}
                                onQuestionChange={(content) => handleMCQQuestionChange(question.id, content)}
                                onOptionChange={(index, content) => handleMCQOptionChange(question.id, index, content)}
                            />
                        );
                    } else if (question.type === 'fill-in-blank') {
                        return (
                            <FillInBlankQuestion
                                key={question.id}
                                questionNumber={question.questionNumber}
                                initialContent={question.content}
                                onContentChange={(content) => handleFillInBlankContentChange(question.id, content)}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </>
    )
}