import { ExamResponse } from "@/types/exam";
import { axiosInstance } from "./axios";
import { defaultExamData } from "@/mock/default-exam-data";
import { PDFReponse } from "@/components/landing-page/types";

export async function getExamByUserId(userDocumentId: string): Promise<{ data: ExamResponse[] }> {
    const response = await axiosInstance.get(`/exams?populate=*&filters[user][documentId][$eq]=${userDocumentId}`);
    return response.data;
}

export async function getExamById(id: string): Promise<{ data: ExamResponse }> {
    const response = await axiosInstance.get(`/exams/${id}`);
    return response.data;
}

export async function deleteExamById(id: string) {
    const response = await axiosInstance.delete(`/exams/${id}`);
    return response.data;
}

export async function createExam(projectName: string, userDocumentId: string) {
    const response = await axiosInstance.post('/exams', {
        data: {
            projectName,
            user: userDocumentId,
            examData: defaultExamData
        }
    });
    return response.data;
}

export async function updateExam(documentId: string, examData: ExamResponse) {
    const updatedExamData: Partial<ExamResponse> = {
        projectName: examData.projectName,
        examData: examData.examData
    }
    const response = await axiosInstance.put(`/exams/${documentId}`, {
        data: updatedExamData
    });
    return response.data;
}

export async function getExportedPDFUrl(documentId: string) {
    const response = await axiosInstance.get<PDFReponse>(`/pdfs/${documentId}`);
    return response.data.data.url;
}
