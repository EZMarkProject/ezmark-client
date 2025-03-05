import { Exam } from "@/types";
import { type HTMLAttributes } from "react"

interface CanvasProps extends HTMLAttributes<HTMLDivElement> {
    exam: Exam
    renderMode: boolean
}

export type { CanvasProps }; 