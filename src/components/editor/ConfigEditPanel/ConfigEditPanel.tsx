import { cn } from "@/lib/utils"
import { type ConfigEditPanelProps } from "./interface"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Settings } from "lucide-react"
import { ExamConfigForm } from "./ConfigForm/ExamConfigForm"
import { MCQConfigForm } from "./ConfigForm/MCQConfigForm"
import { FillInBlankConfigForm } from "./ConfigForm/FillInBlankConfigForm"
import { OpenQuestionConfigForm } from "./ConfigForm/OpenQuestionConfigForm"
import { useEffect, useState } from "react";
import { ExamResponse, FillInBlankQuestionData, MultipleChoiceQuestionData, OpenQuestionData, UnionComponent } from "@/types/exam"
import { updateExam } from "@/lib/api"

export function ConfigEditPanel({ className, setExam, selectedComponentId, exam }: ConfigEditPanelProps) {
    const [selectedComponent, setSelectedComponent] = useState<UnionComponent | null>(null);

    // 传入一个完整的 exam 对象，更新 exam 的配置
    const handleExamChange = async (updatedExam: ExamResponse) => {
        await updateExam(exam.documentId, updatedExam);
        setExam(updatedExam);
    }

    // 根据 selectedComponentId 设置选中的组件
    useEffect(() => {
        if (selectedComponentId) {
            const component = exam.examData.components.find(component => component.id === selectedComponentId);
            setSelectedComponent(component as UnionComponent);
        } else {
            setSelectedComponent(null);
        }
    }, [selectedComponentId, exam.examData.components])

    return (
        <div className={cn("flex flex-col h-full", className)} >
            <div className="bg-gradient-to-r from-primary/3 to-primary/5 px-5 py-3 border-b">
                <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    <h2 className="text-base font-semibold tracking-tight">Configuration</h2>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Customize your exam paper settings and preferences</p>
            </div>
            <ScrollArea className="flex-1 p-4">
                {/* 如果 selectedComponentId 为 null 或者 selectedComponent 的类型为 header，则渲染 ExamConfigForm */}
                {selectedComponentId === null || selectedComponent?.type.includes('header') ? (
                    <ExamConfigForm
                        exam={exam}
                        onExamConfigChange={handleExamChange}
                    />
                ) : selectedComponent?.type === 'multiple-choice' ? (
                    <MCQConfigForm
                        mcq={selectedComponent}
                        exam={exam}
                        selectedComponentId={selectedComponentId}
                        onExamConfigChange={handleExamChange}
                    />
                ) : selectedComponent?.type === 'fill-in-blank' ? (
                    <FillInBlankConfigForm
                        fillInBlank={selectedComponent}
                        exam={exam}
                        selectedComponentId={selectedComponentId}
                        onExamConfigChange={handleExamChange}
                    />
                ) : selectedComponent?.type === 'open' ? (
                    <OpenQuestionConfigForm
                        openQuestion={selectedComponent}
                        exam={exam}
                        selectedComponentId={selectedComponentId}
                        onExamConfigChange={handleExamChange}
                    />
                ) : null}
            </ScrollArea>
        </div>
    )
} 