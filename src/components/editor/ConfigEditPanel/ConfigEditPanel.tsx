import { cn } from "@/lib/utils"
import { type ConfigEditPanelProps } from "./interface"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Settings } from "lucide-react"
import { ExamConfigForm } from "./ConfigForm/ExamConfigForm"
import { MCQConfigForm } from "./ConfigForm/MCQConfigForm"
import { useEffect, useState } from "react";
import { MultipleChoiceQuestionData, UnionComponent } from "@/types/exam"
import cloneDeep from 'lodash/cloneDeep'

export function ConfigEditPanel({ className, setExam, selectedComponentId, exam }: ConfigEditPanelProps) {
    const [selectedComponent, setSelectedComponent] = useState<UnionComponent | null>(null);

    // 更新 exam 的配置
    const handleExamConfigChange = (updatedExam: Partial<typeof exam>) => {
        setExam(prev => {
            const prevClone = cloneDeep(prev);
            return {
                ...prevClone,
                ...updatedExam
            }
        });
    }

    // 更新 MCQ 组件的配置
    const handleMCQComponentChange = (updatedMCQ: Partial<MultipleChoiceQuestionData>) => {
        if (!selectedComponentId) return;

        setExam(prev => {
            const updatedExam = cloneDeep(prev);
            const componentIndex = updatedExam.components.findIndex(component => component.id === selectedComponentId);

            if (componentIndex !== -1) {
                updatedExam.components[componentIndex] = {
                    ...updatedExam.components[componentIndex],
                    ...updatedMCQ
                } as UnionComponent;
            }

            return updatedExam;
        });
    }

    // 根据 selectedComponentId 设置选中的组件
    useEffect(() => {
        if (selectedComponentId) {
            const component = exam.components.find(component => component.id === selectedComponentId);
            setSelectedComponent(component as UnionComponent);
        } else {
            setSelectedComponent(null);
        }
    }, [selectedComponentId, exam.components])

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
                        onExamConfigChange={handleExamConfigChange}
                    />
                ) : selectedComponent?.type === 'multiple-choice' ? (
                    // 如果选中的是 MCQ 组件，则渲染 MCQConfigForm
                    <MCQConfigForm
                        mcq={selectedComponent as MultipleChoiceQuestionData}
                        onCMQChange={handleMCQComponentChange}
                    />
                ) : (
                    // 根据 selectedComponentId 渲染对应的组件配置
                    <div>Component configuration not available for this type</div>
                )}
            </ScrollArea>
        </div>
    )
} 