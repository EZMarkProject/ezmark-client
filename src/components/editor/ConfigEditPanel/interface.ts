import { ExamResponse } from "@/types/exam";
import { Dispatch, SetStateAction } from "react";

interface ConfigEditPanelProps {
    className: string
    selectedComponentId: string | null
    exam: ExamResponse
    setExam: Dispatch<SetStateAction<ExamResponse>>
}

export type { ConfigEditPanelProps }; 