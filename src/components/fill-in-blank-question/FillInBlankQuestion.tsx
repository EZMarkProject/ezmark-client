'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent } from '@/components/ui/card'
import { FillInBlankQuestionProps } from './interface'

// Use dynamic import to avoid SSR issues
const RichInput = dynamic(() => import('@/components/rich-editor/RichInput'), { ssr: false })

/**
 * Fill-in-blank question component
 * A simple wrapper around RichInput that displays a question number
 */
const FillInBlankQuestion: React.FC<FillInBlankQuestionProps> = ({
    questionNumber = 1,
    initialContent = '',
    readOnly = false,
    onContentChange,
    onBlur,
    className = '',
}) => {
    const [content, setContent] = useState(initialContent)


    const handleContentChange = (newContent: string) => {
        setContent(newContent)
        onContentChange?.(newContent)
    }

    return (
        <Card className={`mb-6 ${className}`}>
            <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                    <div className="font-medium text-base w-6 flex items-center">
                        {questionNumber}.
                    </div>
                    <div className="flex-1">
                        <RichInput
                            initialContent={content}
                            onContentChange={handleContentChange}
                            readOnly={readOnly}
                            onBlur={onBlur}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default FillInBlankQuestion 