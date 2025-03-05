'use client'
import { cn } from "@/lib/utils"
import { type CanvasProps } from "./interface"
import { useState, useCallback } from "react"
import { ZoomIn, ZoomOut, Eye, EyeOff, Pen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { A4ExamPaper } from "@/components/editor/A4ExamPaper"

export function Canvas({ className, exam, renderMode, onRenderModeChange, ...props }: CanvasProps) {
    const [scale, setScale] = useState(1)
    const MIN_SCALE = 0.1
    const MAX_SCALE = 2
    const SCALE_STEP = 0.1

    const handleWheel = useCallback((e: React.WheelEvent) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            setScale(prev => {
                const newScale = prev - (e.deltaY * 0.001)
                return Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE)
            })
        }
    }, [])

    const adjustScale = (delta: number) => {
        setScale(prev => {
            const newScale = prev + delta
            return Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE)
        })
    }

    return (
        <div
            className={cn("bg-muted/50 flex flex-col", className)}
        >
            <div className="flex items-center justify-between gap-2 p-2 border-b">
                <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => onRenderModeChange(!renderMode)}
                >
                    {renderMode ? (
                        <>
                            <Eye className="h-4 w-4" />
                            <span>Preview</span>
                        </>
                    ) : (
                        <>
                            <Pen className="h-4 w-4" />
                            <span>Edit</span>
                        </>
                    )}
                </Button>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setScale(1)}
                    >
                        <span className="text-sm">1:1</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => adjustScale(-SCALE_STEP)}
                    >
                        <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="min-w-[3rem] text-center">
                        {Math.round(scale * 100)}%
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => adjustScale(SCALE_STEP)}
                    >
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div
                className="flex-1 overflow-auto p-8 flex items-start justify-center"
                onWheel={handleWheel}
            >
                <A4ExamPaper
                    exam={exam}
                    renderMode={renderMode}
                    scale={scale}
                />
            </div>
        </div>
    )
} 