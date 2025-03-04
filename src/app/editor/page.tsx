'use client'

import { useState } from 'react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { MultipleChoiceQuestion } from '@/components/multiple-choice-question'
import FillInBlankQuestion from '@/components/fill-in-blank-question'
import { Exam } from '@/types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EyeIcon, PencilIcon } from 'lucide-react'

export default function Editor() {
    // 添加全局renderMode状态
    const [renderMode, setRenderMode] = useState<boolean>(true);

    // 使用Exam状态包裹questions
    const [exam, setExam] = useState<Exam>({
        id: '1',
        title: 'Sample Exam',
        description: 'This is a sample exam for demonstration purposes',
        questions: [
            {
                id: '1',
                type: 'multiple-choice',
                score: 10,
                question: '<p>What&nbsp;is&nbsp;the&nbsp;derivative&nbsp;of&nbsp;the&nbsp;function&nbsp;<span class="latex-formula">f(x) = 3x^4 - 5x^3 + 2x - 7</span>&nbsp; ${input}</p>',
                options: [
                    {
                        index: '0',
                        label: 'A',
                        content: '<p><span class="latex-formula">12x^3 - 15x^2 + 2</span>&nbsp;</p>'
                    },
                    {
                        index: '1',
                        label: 'B',
                        content: '<p><span class="latex-formula">12x^3 - 15x^2 + 2x</span>&nbsp;</p>'
                    },
                    {
                        index: '2',
                        label: 'C',
                        content: '<p><span class="latex-formula">12x^3 - 15x^2 - 5</span>&nbsp;</p>'
                    },
                    {
                        index: '3',
                        label: 'D',
                        content: '<p><span class="latex-formula">12x^3 - 15x^2 + 2x - 7</span>&nbsp;</p>'
                    }
                ],
                answer: ['A']
            },
            {
                id: '2',
                type: 'fill-in-blank',
                score: 5,
                content: '<p>The library is a quiet place where people can ${input} and enjoy reading.</p>',
                answer: 'dance'
            }
        ]
    });

    console.log(exam)

    // 更新多选题内容
    const handleMCQQuestionChange = (questionId: string, content: string) => {
        setExam(prev => ({
            ...prev,
            questions: prev.questions.map(q => {
                if (q.id === questionId && q.type === 'multiple-choice') {
                    return {
                        ...q,
                        question: content
                    };
                }
                return q;
            })
        }));
    };

    // 更新多选题选项
    const handleMCQOptionChange = (questionId: string, optionIndex: number, content: string) => {
        setExam(prev => {
            return {
                ...prev,
                questions: prev.questions.map(q => {
                    if (q.id === questionId && q.type === 'multiple-choice') {
                        const newOptions = [...q.options];
                        newOptions[optionIndex] = {
                            ...newOptions[optionIndex],
                            content: content
                        };
                        return {
                            ...q,
                            options: newOptions
                        };
                    }
                    return q;
                })
            };
        });
    };

    // 更新填空题内容
    const handleFillInBlankContentChange = (questionId: string, content: string) => {
        setExam(prev => ({
            ...prev,
            questions: prev.questions.map(q => {
                if (q.id === questionId && q.type === 'fill-in-blank') {
                    return {
                        ...q,
                        content
                    };
                }
                return q;
            })
        }));
    };

    // 切换渲染模式
    const toggleRenderMode = () => {
        setRenderMode(prev => !prev);
    };

    return (
        <>
            <div className='flex justify-end p-4'>
                <ThemeToggle />
            </div>
            <div className='max-w-3xl mx-auto mt-10 px-4'>
                <Card className="mb-6">
                    <CardHeader className="pb-3 flex flex-row items-center justify-between">
                        <div>
                            <h2 className="text-lg font-medium">{exam.title}</h2>
                            <p className="text-muted-foreground">
                                {exam.description}
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleRenderMode}
                            className="ml-auto"
                        >
                            {renderMode ? (
                                <>
                                    <EyeIcon className="h-4 w-4 mr-1" />
                                    Preview Mode
                                </>
                            ) : (
                                <>
                                    <PencilIcon className="h-4 w-4 mr-1" />
                                    Edit Mode
                                </>
                            )}
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {exam.questions.map((question, index) => {
                            if (question.type === 'multiple-choice') {
                                return (
                                    <div key={question.id} className="mb-6 last:mb-0">
                                        <MultipleChoiceQuestion
                                            initialQuestionContent={question.question}
                                            initialOptions={question.options.map(opt => opt.content)}
                                            onQuestionChange={(content) => handleMCQQuestionChange(question.id, content)}
                                            onOptionChange={(index, content) => handleMCQOptionChange(question.id, index, content)}
                                            renderMode={renderMode}
                                            questionNumber={index + 1}
                                        />
                                    </div>
                                );
                            } else if (question.type === 'fill-in-blank') {
                                return (
                                    <div key={question.id} className="mb-6 last:mb-0">
                                        <FillInBlankQuestion
                                            initialContent={question.content}
                                            onContentChange={(content) => handleFillInBlankContentChange(question.id, content)}
                                            renderMode={renderMode}
                                            questionNumber={index + 1}
                                        />
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}