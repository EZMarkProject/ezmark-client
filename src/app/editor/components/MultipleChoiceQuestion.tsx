'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

// 使用dynamic import避免SSR问题
const RichInput = dynamic(() => import('@/components/rich-editor/RichInput'), { ssr: false })

export interface MultipleChoiceQuestionProps {
    /**
     * 问题编号
     */
    questionNumber?: number | string

    /**
     * 问题内容
     */
    questionContent?: string

    /**
     * 选项内容数组
     */
    options?: string[]

    /**
     * 选项前缀，默认为A, B, C, D...
     */
    optionPrefixes?: string[]

    /**
     * 是否只读模式
     */
    readOnly?: boolean

    /**
     * 问题内容变更回调
     */
    onQuestionChange?: (content: string) => void

    /**
     * 选项内容变更回调
     */
    onOptionChange?: (index: number, content: string) => void
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
    questionNumber = 1,
    questionContent = '',
    options = ['', '', '', ''],
    optionPrefixes = ['A', 'B', 'C', 'D'],
    readOnly = false,
    onQuestionChange,
    onOptionChange,
}) => {
    const [question, setQuestion] = useState(questionContent)
    const [optionContents, setOptionContents] = useState(options)

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
        <Card className="mb-6">
            <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                    <div className="font-medium text-base w-6 flex items-center">
                        {questionNumber}.
                    </div>
                    <div className="flex-1">
                        <RichInput
                            initialContent={question}
                            onContentChange={handleQuestionChange}
                            readOnly={readOnly}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="pl-8 space-y-3">
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
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default MultipleChoiceQuestion 