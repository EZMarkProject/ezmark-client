import { Exam } from "@/types";
import { type HTMLAttributes } from "react"

interface CanvasProps extends HTMLAttributes<HTMLDivElement> {
    exam: Exam
    renderMode: boolean
    onRenderModeChange: (mode: boolean) => void
}

export type { CanvasProps }; 