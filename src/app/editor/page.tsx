'use client'
import { EditorNavbar } from "@/components/editor/EditorNavbar"
import { SectionSelection } from "@/components/editor/SectionSelection"
import { QuestionSelectionPanel } from "@/components/editor/QuestionSelectionPanel"
import { Canvas } from "@/components/editor/Canvas"
import { ConfigEditPanel } from "@/components/editor/ConfigEditPanel"
import { useState } from "react"
import { Exam, MultipleChoiceQuestionData, FillInBlankQuestionData, OpenQuestionData } from "@/types/exam"
import { mockExamData } from "@/mock/exam-data"

export default function Editor() {
    const [exam, setExam] = useState<Exam>(mockExamData);
    const [renderMode, setRenderMode] = useState(true);

    const onMCQQuestionChange = (questionId: string, content: string) => {
        setExam(prev => {
            const updatedExam = { ...prev }
            const questionIndex = updatedExam.components.findIndex(component => component.id === questionId)
            if (questionIndex !== -1) {
                (updatedExam.components[questionIndex] as MultipleChoiceQuestionData).question = content
            }
            return updatedExam
        })
    }

    const onMCQOptionChange = (questionId: string, optionIndex: number, content: string) => {
        setExam(prev => {
            const updatedExam = { ...prev }
            const questionIndex = updatedExam.components.findIndex(component => component.id === questionId)
            if (questionIndex !== -1) {
                (updatedExam.components[questionIndex] as MultipleChoiceQuestionData).options[optionIndex].content = content
            }
            return updatedExam
        })
    }

    const onFillInBlankContentChange = (questionId: string, content: string) => {
        setExam(prev => {
            const updatedExam = { ...prev }
            const questionIndex = updatedExam.components.findIndex(component => component.id === questionId)
            if (questionIndex !== -1) {
                (updatedExam.components[questionIndex] as FillInBlankQuestionData).content = content
            }
            return updatedExam
        })
    }

    const onOpenQuestionChange = (questionId: string, content: string) => {
        setExam(prev => {
            const updatedExam = { ...prev }
            const questionIndex = updatedExam.components.findIndex(component => component.id === questionId)
            if (questionIndex !== -1) {
                (updatedExam.components[questionIndex] as OpenQuestionData).content = content
            }
            return updatedExam
        })
    }

    return (
        <div className="min-h-screen bg-background">
            <EditorNavbar />
            <div className="flex h-[calc(100vh-4rem)]">
                <SectionSelection className="w-32 border-r shrink-0" />
                <QuestionSelectionPanel className="w-64 border-r shrink-0" />
                <div className="flex-1 min-w-0 overflow-auto">
                    <Canvas
                        exam={exam}
                        renderMode={renderMode}
                        onRenderModeChange={setRenderMode}
                        onMCQQuestionChange={onMCQQuestionChange}
                        onMCQOptionChange={onMCQOptionChange}
                        onFillInBlankContentChange={onFillInBlankContentChange}
                        onOpenQuestionChange={onOpenQuestionChange}
                    />
                </div>
                <ConfigEditPanel className="w-80 border-l shrink-0" />
            </div>
        </div>
    )
}   