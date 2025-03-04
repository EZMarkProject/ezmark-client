'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { FillInBlankQuestionProps } from './interface'

// Use dynamic import to avoid SSR issues
const RichInput = dynamic(() => import('@/components/rich-editor/RichInput'), { ssr: false })

/**
 * Fill-in-blank question component
 * A simple wrapper around RichInput that displays a question number
 */
const FillInBlankQuestion: React.FC<FillInBlankQuestionProps> = ({
    initialContent = '',
    readOnly = false,
    onContentChange,
    onBlur,
    className = '',
    renderMode = false,
    questionNumber,
}) => {
    const [content, setContent] = useState(initialContent)

    const handleContentChange = (newContent: string) => {
        setContent(newContent)
        onContentChange?.(newContent)
    }

    return (
        <div className={className}>
            <div className="flex items-center">
                {questionNumber !== undefined && (
                    <div className="font-medium text-base">
                        {questionNumber}.
                    </div>
                )}
                <div className="flex-1">
                    <RichInput
                        initialContent={content}
                        onContentChange={handleContentChange}
                        readOnly={readOnly}
                        onBlur={onBlur}
                        renderMode={renderMode}
                    />
                </div>
            </div>
        </div>
    )
}

export default FillInBlankQuestion 