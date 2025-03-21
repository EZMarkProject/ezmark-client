import { ExamScheduleResult } from "@/types/types";

export const defaultScheduleResult: ExamScheduleResult = {
    progress: 'CREATED',
    papers: [],
    studentPapers: [],
    pdfUrl: '',
    matchResult: {
        done: false,
        matched: [],
        unmatched: {
            studentIds: [],
            papers: []
        }
    }
}