'use client'
import { EditorNavbar } from "@/components/editor/EditorNavbar"
import { SectionSelection } from "@/components/editor/SectionSelection"
import { QuestionSelectionPanel } from "@/components/editor/QuestionSelectionPanel"
import { Canvas } from "@/components/editor/Canvas"
import { ConfigEditPanel } from "@/components/editor/ConfigEditPanel"
import { useState } from "react"
import { Exam, MultipleChoiceQuestionData, FillInBlankQuestionData, OpenQuestionData, UnionComponent } from "@/types/exam"
import { mockExamData } from "@/mock/exam-data"
import { nanoid } from "nanoid"
import cloneDeep from 'lodash/cloneDeep'
import { TemplateSelectionPanel } from "@/components/editor/TemplateSelectionPanel"
import { BankSelectionPanel } from "@/components/editor/BankSelectionPanel"

export default function Editor() {
    const [exam, setExam] = useState<Exam>(mockExamData);
    const [renderMode, setRenderMode] = useState(true);
    const [activeTab, setActiveTab] = useState("components");
    const [isSaved, setIsSaved] = useState(true);
    const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

    const onMCQQuestionChange = (questionId: string, content: string) => {
        setExam(prev => {
            const updatedExam = cloneDeep(prev);
            const questionIndex = updatedExam.components.findIndex((component: UnionComponent) => component.id === questionId)
            if (questionIndex !== -1) {
                (updatedExam.components[questionIndex] as MultipleChoiceQuestionData).question = content
            }
            return updatedExam
        })
    }

    const onMCQOptionChange = (questionId: string, optionIndex: number, content: string) => {
        setExam(prev => {
            const updatedExam = cloneDeep(prev);
            const questionIndex = updatedExam.components.findIndex((component: UnionComponent) => component.id === questionId)
            if (questionIndex !== -1) {
                (updatedExam.components[questionIndex] as MultipleChoiceQuestionData).options[optionIndex].content = content
            }
            return updatedExam
        })
    }

    const onFillInBlankContentChange = (questionId: string, content: string) => {
        setExam(prev => {
            const updatedExam = cloneDeep(prev);
            const questionIndex = updatedExam.components.findIndex((component: UnionComponent) => component.id === questionId)
            if (questionIndex !== -1) {
                (updatedExam.components[questionIndex] as FillInBlankQuestionData).content = content
            }
            return updatedExam
        })
    }

    const onOpenQuestionChange = (questionId: string, content: string) => {
        setExam(prev => {
            const updatedExam = cloneDeep(prev);
            const questionIndex = updatedExam.components.findIndex((component: UnionComponent) => component.id === questionId)
            if (questionIndex !== -1) {
                (updatedExam.components[questionIndex] as OpenQuestionData).content = content
            }
            return updatedExam
        })
    }

    const handleComponentClick = (componentId: string) => {
        setSelectedComponentId(componentId);
    }

    const handleAddComponent = (componentType: string) => {
        setExam(prev => {
            const updatedExam = cloneDeep(prev);
            let newComponent: UnionComponent;

            // 根据组件类型创建不同的组件
            switch (componentType) {
                case 'multiple-choice-question':
                    newComponent = {
                        id: nanoid(),
                        type: 'multiple-choice',
                        score: 10,
                        questionNumber: updatedExam.components.length,
                        question: '<p>New multiple choice question</p>',
                        options: [
                            { label: 'A', content: '<p>Option A</p>' },
                            { label: 'B', content: '<p>Option B</p>' },
                            { label: 'C', content: '<p>Option C</p>' },
                            { label: 'D', content: '<p>Option D</p>' }
                        ],
                        answer: []
                    };
                    break;
                case 'fill-in-blank-question':
                    newComponent = {
                        id: nanoid(),
                        type: 'fill-in-blank',
                        score: 5,
                        questionNumber: updatedExam.components.length,
                        content: '<p>New fill-in-the-blank question ${input}</p>',
                        answer: ''
                    };
                    break;
                case 'open-question':
                    newComponent = {
                        id: nanoid(),
                        type: 'open',
                        score: 10,
                        questionNumber: updatedExam.components.length,
                        content: '<p>New open question</p>',
                        answer: '',
                        lines: 10
                    };
                    break;
                case 'blank':
                    newComponent = {
                        id: nanoid(),
                        type: 'blank',
                        lines: 5
                    };
                    break;
                case 'divider':
                    newComponent = {
                        id: nanoid(),
                        type: 'divider'
                    };
                    break;
                default:
                    return prev; // 如果类型不匹配，返回原状态
            }

            updatedExam.components.push(newComponent);
            return updatedExam;
        });
    }

    const handleTemplateSelect = (templateId: string) => {
        // TODO: Load template data
        console.log("Selected template:", templateId);
    };

    const handleBankSelect = (bankId: string) => {
        // TODO: Load questions from bank
        console.log("Selected bank:", bankId);
    };

    const renderSidePanel = () => {
        switch (activeTab) {
            case "components":
                return <QuestionSelectionPanel className="w-64 border-r shrink-0" onAddComponent={handleAddComponent} />;
            case "templates":
                return <TemplateSelectionPanel className="w-64 border-r shrink-0" onSelectTemplate={handleTemplateSelect} />;
            case "bank":
                return <BankSelectionPanel className="w-64 border-r shrink-0" onSelectBank={handleBankSelect} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <EditorNavbar exam={exam} isSaved={false} />
            <div className="flex h-[calc(100vh-4rem)]">
                <SectionSelection
                    className="w-33 border-r shrink-0"
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
                {renderSidePanel()}
                <div className="flex-1 min-w-0 overflow-auto">
                    <Canvas
                        exam={exam}
                        renderMode={renderMode}
                        onRenderModeChange={setRenderMode}
                        onMCQQuestionChange={onMCQQuestionChange}
                        onMCQOptionChange={onMCQOptionChange}
                        onFillInBlankContentChange={onFillInBlankContentChange}
                        onOpenQuestionChange={onOpenQuestionChange}
                        handleComponentClick={handleComponentClick}
                    />
                </div>
                <ConfigEditPanel className="w-72 border-l shrink-0" />
            </div>
        </div>
    )
}   