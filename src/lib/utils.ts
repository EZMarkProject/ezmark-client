import { BaseComponent, UnionComponent } from "@/types/exam"
import { ExamScheduleProgress } from "@/types/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function isQuestionComponent(component: BaseComponent) {
    return component.type === 'multiple-choice' || component.type === 'fill-in-blank' || component.type === 'open'
}

export function getStepByProgressName(progress: ExamScheduleProgress): {
    stepName: string;
    stepNum: number;
} {
    switch (progress) {
        case 'CREATED':
            return {
                stepName: `Pipeline is Not Started`,
                stepNum: 1
            };
        case 'UPLOADED':
            return {
                stepName: `Pipeline is Ready to Start`,
                stepNum: 1
            };
        case 'MATCH_START': // 正常流程，用户看到第一步
            return {
                stepName: `Identifying Students' IDs`,
                stepNum: 1
            };
        case 'MATCH_DONE':
            return {
                stepName: 'Exam Papers Matching Results',
                stepNum: 2
            };
        case 'DONE':
            return {
                stepName: 'Pipeline is Finished',
                stepNum: 3
            };
        default:
            return {
                stepName: 'Unknown Step',
                stepNum: 0
            };
    }
}