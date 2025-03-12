import { ExamResponse } from "@/types/exam";

interface EditorNavbarProps {
    exam: ExamResponse
    isSaved: boolean
    onSave: () => Promise<void>
    onExportPDF: () => Promise<string>
}

export type { EditorNavbarProps }; 