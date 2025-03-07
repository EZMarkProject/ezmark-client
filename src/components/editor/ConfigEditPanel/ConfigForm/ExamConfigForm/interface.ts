import { Exam } from "@/types/exam";

interface ExamConfigFormProps {
    exam: Exam;
    onExamConfigChange: (updatedExam: Partial<Exam>) => Promise<void>;
}

export type { ExamConfigFormProps }; 