'use client'
import { EditorNavbar } from "@/components/editor/EditorNavbar"
import { SectionSelection } from "@/components/editor/SectionSelection"
import { QuestionSelectionPanel } from "@/components/editor/QuestionSelectionPanel"
import { Canvas } from "@/components/editor/Canvas"
import { ConfigEditPanel } from "@/components/editor/ConfigEditPanel"
import { useState } from "react"
import { Exam } from "@/types"
import { mockExamData } from "@/mock/exam-data"

export default function Editor() {
    const [exam, setExam] = useState<Exam>(mockExamData);
    const [renderMode, setRenderMode] = useState(true);

    return (
        <div className="min-h-screen bg-background">
            <EditorNavbar />
            <div className="flex h-[calc(100vh-4rem)]">
                <SectionSelection className="w-30 border-r shrink-0" />
                <QuestionSelectionPanel className="w-64 border-r shrink-0" />
                <div className="flex-1 min-w-0 overflow-auto">
                    <Canvas
                        className="h-full w-full"
                        exam={exam}
                        renderMode={renderMode}
                        onRenderModeChange={setRenderMode}
                    />
                </div>
                <ConfigEditPanel className="w-80 border-l shrink-0" />
            </div>
        </div>
    )
}   