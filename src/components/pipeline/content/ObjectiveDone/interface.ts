import { ExamSchedule, ObjectiveQuestion } from "../../../../types/types";
import { MultipleChoiceQuestionData } from "@/types/exam";

export interface ObjectiveDoneProps {
    schedule: ExamSchedule;
}

export interface QuestionReviewProps {
    question: ObjectiveQuestion; // 学生答卷
    definedQuestion: MultipleChoiceQuestionData; // 定义的题目
    onMarkCorrect: () => void;
    onMarkIncorrect: () => void;
    onPrevious: () => void;
    onNext: () => void;
    progress: number;
}

// 扩展ObjectiveQuestion接口，添加studentId属性用于标识题目所属学生
export interface ExtendedObjectiveQuestion {
    questionId: string;
    studentAnswer: string[];
    llmUnknown: boolean;
    score: number;
    imageUrl: string;
    studentId: string; // 添加学生ID以便定位具体是哪个学生的题目
}

export interface AllQuestionsFlowProps {
    handleNextStep: () => void;
}
