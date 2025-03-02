'use client'

import { useState } from 'react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { MultipleChoiceQuestion } from '@/components/multiple-choice-question'

export default function Editor() {
    const [questionData, setQuestionData] = useState({
        question: '<p>What&nbsp;is&nbsp;the&nbsp;derivative&nbsp;of&nbsp;the&nbsp;function&nbsp;<span class="latex-formula">f(x) = 3x^4 - 5x^3 + 2x - 7</span>&nbsp;</p>',
        options: [
            '<p><span class="latex-formula">12x^3 - 15x^2 + 2</span>&nbsp;</p>',
            '<p><span class="latex-formula">12x^3 - 15x^2 + 2x</span>&nbsp;</p>',
            '<p><span class="latex-formula">12x^3 - 15x^2 - 5</span>&nbsp;</p>',
            '<p><span class="latex-formula">12x^3 - 15x^2 + 2x - 7</span>&nbsp;</p>',
        ]
    })

    const handleQuestionChange = (content: string) => {
        setQuestionData(prev => ({
            ...prev,
            question: content
        }))
    }

    const handleOptionChange = (index: number, content: string) => {
        setQuestionData(prev => {
            const newOptions = [...prev.options]
            newOptions[index] = content
            return {
                ...prev,
                options: newOptions
            }
        })
    }

    return (
        <>
            <div className='flex justify-end p-4'>
                <ThemeToggle />
            </div>
            <div className='max-w-3xl mx-auto mt-10 px-4'>
                <div className="bg-card p-6 rounded-xl mb-6">
                    <h2 className="text-lg font-medium mb-4">MCQ Demo</h2>
                    <p className="text-muted-foreground mb-4">
                        Test the rich text editor functionality for generating multiple choice questions.
                    </p>
                </div>

                <MultipleChoiceQuestion
                    questionNumber={1}
                    initialQuestionContent={questionData.question}
                    initialOptions={questionData.options}
                    onQuestionChange={handleQuestionChange}
                    onOptionChange={handleOptionChange}
                />

            </div>
        </>
    )
}