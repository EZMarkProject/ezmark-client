import { Exam } from "@/types/exam";
import { Dispatch, SetStateAction } from "react";

interface ConfigEditPanelProps {
    className: string
    selectedComponentId: string | null
    exam: Exam
    setExam: Dispatch<SetStateAction<Exam>>
}

export type { ConfigEditPanelProps }; 