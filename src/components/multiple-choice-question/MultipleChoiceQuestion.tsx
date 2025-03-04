'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { MultipleChoiceQuestionProps } from './interface'

// Use dynamic import to avoid SSR issues
const RichInput = dynamic(() => import('@/components/rich-editor/RichInput'), { ssr: false })

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
    initialQuestionContent = '',
    initialOptions = ['', '', '', ''],
    optionPrefixes = ['A', 'B', 'C', 'D'],
    readOnly = false,
    onQuestionChange,
    onOptionChange,
    renderMode = false,
}) => {
    const [question, setQuestion] = useState(initialQuestionContent)
    const [optionContents, setOptionContents] = useState(initialOptions)

    const handleQuestionChange = (content: string) => {
        setQuestion(content)
        onQuestionChange?.(content)
    }

    const handleOptionChange = (index: number, content: string) => {
        const newOptions = [...optionContents]
        newOptions[index] = content
        setOptionContents(newOptions)
        onOptionChange?.(index, content)
    }

    return (
        <div>
            <div className="flex-1">
                <RichInput
                    initialContent={question}
                    onContentChange={handleQuestionChange}
                    readOnly={readOnly}
                    renderMode={renderMode}
                />
            </div>
            <div className="mt-3 space-y-3 pl-8">
                {optionContents.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="font-medium text-base w-6 flex items-center">
                            {optionPrefixes[index] || String.fromCharCode(65 + index)}.
                        </div>
                        <div className="flex-1">
                            <RichInput
                                initialContent={option}
                                onContentChange={(content) => handleOptionChange(index, content)}
                                readOnly={readOnly}
                                renderMode={renderMode}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MultipleChoiceQuestion 