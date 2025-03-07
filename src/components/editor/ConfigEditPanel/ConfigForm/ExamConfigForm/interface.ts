import { Exam } from "@/types/exam";

interface ExamConfigFormProps {
    exam: Exam;
    onExamConfigChange: (updatedExam: Partial<Exam>) => void;
}

export type { ExamConfigFormProps }; 