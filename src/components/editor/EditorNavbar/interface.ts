import { ExamResponse } from "@/types/exam";

interface EditorNavbarProps {
    exam: ExamResponse
    isSaved: boolean
    onSave: () => Promise<void>
    onExportPDF: () => Promise<void>
}

export type { EditorNavbarProps }; 