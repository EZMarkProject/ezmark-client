'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const RichInput = dynamic(() => import('@/components/rich-editor/RichInput'), { ssr: false })

export default function Editor() {
    const [content, setContent] = useState('')

    const handleContentChange = (content: string) => {
        setContent(content)
    }

    return (
        <>
            <div className='flex justify-end p-4'>
                <ThemeToggle />
            </div>
            <div className='w-[40vw] m-auto mt-10'>
                <RichInput initialContent='Hello World' onContentChange={handleContentChange} />
            </div>
        </>
    )
}