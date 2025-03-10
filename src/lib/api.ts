import { ExamResponse } from "@/types/exam";
import { axiosInstance } from "./axios";

export async function getExamByUserEmail(email: string): Promise<{ data: ExamResponse[] }> {
    const response = await axiosInstance.get(`/exams?populate=*&filters[user][email][$eq]=${email}`);
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


