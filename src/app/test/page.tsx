'use client'

import { useState } from 'react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import ExamPaperTemplate from '@/components/exam-paper-template'
import { Exam } from '@/types'
import { Button } from '@/components/ui/button'
import { EyeIcon, PencilIcon } from 'lucide-react'
import { mockExamData } from '@/mock/exam-data'

export default function Editor() {
    // 添加全局renderMode状态
    const [renderMode, setRenderMode] = useState<boolean>(true);

    // 使用Exam状态包裹questions
    const [exam, setExam] = useState<Exam>(mockExamData);

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
                <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleRenderMode}
                    className="ml-4"
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
            </div>
            <div className='exame-paper-container'>
                <ExamPaperTemplate
                    exam={exam}
                    renderMode={renderMode}
                    onMCQQuestionChange={handleMCQQuestionChange}
                    onMCQOptionChange={handleMCQOptionChange}
                    onFillInBlankContentChange={handleFillInBlankContentChange}
                />
            </div>
        </>
    )
}