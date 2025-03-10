import { cn } from "@/lib/utils"
import { type ConfigEditPanelProps } from "./interface"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Settings } from "lucide-react"
import { ExamConfigForm } from "./ConfigForm/ExamConfigForm"
import { MCQConfigForm } from "./ConfigForm/MCQConfigForm"
import { FillInBlankConfigForm } from "./ConfigForm/FillInBlankConfigForm"
import { OpenQuestionConfigForm } from "./ConfigForm/OpenQuestionConfigForm"
import { useEffect, useState } from "react";
import { FillInBlankQuestionData, MultipleChoiceQuestionData, OpenQuestionData, UnionComponent } from "@/types/exam"
import cloneDeep from 'lodash/cloneDeep'

export function ConfigEditPanel({ className, setExam, selectedComponentId, exam }: ConfigEditPanelProps) {
    const [selectedComponent, setSelectedComponent] = useState<UnionComponent | null>(null);

    // 更新 exam 的配置
    const handleExamConfigChange = async (updatedExam: Partial<typeof exam>) => {
        setExam(prev => {
            const prevClone = cloneDeep(prev);
            return {
                ...prevClone,
                ...updatedExam
            }
        });
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    // 更新 MCQ 组件的配置
    const handleMCQComponentChange = async (updatedMCQ: Partial<MultipleChoiceQuestionData>) => {
        if (!selectedComponentId) return;
        setExam(prev => {
            const updatedExam = cloneDeep(prev);
            const componentIndex = updatedExam.examData.components.findIndex(component => component.id === selectedComponentId);
            if (componentIndex !== -1) {
                updatedExam.examData.components[componentIndex] = {
                    ...updatedExam.examData.components[componentIndex],
                    ...updatedMCQ
                } as UnionComponent;
            }
            return updatedExam;
        });
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    // 更新 Fill In Blank 组件的配置
    const handleFillInBlankComponentChange = async (updatedFillInBlank: Partial<FillInBlankQuestionData>) => {
        if (!selectedComponentId) return;
        setExam(prev => {
            const updatedExam = cloneDeep(prev);
            const componentIndex = updatedExam.examData.components.findIndex(component => component.id === selectedComponentId);
            if (componentIndex !== -1) {
                updatedExam.examData.components[componentIndex] = {
                    ...updatedExam.examData.components[componentIndex],
                    ...updatedFillInBlank
                } as UnionComponent;
            }
            return updatedExam;
        });
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    // 更新 Open Question 组件的配置
    const handleOpenQuestionComponentChange = async (updatedOpenQuestion: Partial<OpenQuestionData>) => {
        if (!selectedComponentId) return;
        setExam(prev => {
            const updatedExam = cloneDeep(prev);
            const componentIndex = updatedExam.examData.components.findIndex(component => component.id === selectedComponentId);
            if (componentIndex !== -1) {
                updatedExam.examData.components[componentIndex] = {
                    ...updatedExam.examData.components[componentIndex],
                    ...updatedOpenQuestion
                } as UnionComponent;
            }
            return updatedExam;
        });
        await new Promise(resolve => setTimeout(resolve, 500));
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
                        onExamConfigChange={handleExamConfigChange}
                    />
                ) : selectedComponent?.type === 'multiple-choice' ? (
                    // 如果选中的是 MCQ 组件，则渲染 MCQConfigForm
                    <MCQConfigForm
                        mcq={selectedComponent as MultipleChoiceQuestionData}
                        onCMQChange={handleMCQComponentChange}
                    />
                ) : selectedComponent?.type === 'fill-in-blank' ? (
                    // 如果选中的是 Fill In Blank 组件，则渲染 FillInBlankConfigForm
                    <FillInBlankConfigForm
                        fillInBlank={selectedComponent as FillInBlankQuestionData}
                        onFillInBlankChange={handleFillInBlankComponentChange}
                    />
                ) : selectedComponent?.type === 'open' ? (
                    // 如果选中的是 Open Question 组件，则渲染 OpenQuestionConfigForm
                    <OpenQuestionConfigForm
                        openQuestion={selectedComponent as OpenQuestionData}
                        onOpenQuestionChange={handleOpenQuestionComponentChange}
                    />
                ) : (
                    // 根据 selectedComponentId 渲染对应的组件配置
                    <div>Component configuration not available for this type</div>
                )}
            </ScrollArea>
        </div>
    )
} 