'use client'
import { cn } from "@/lib/utils"
import { type CanvasProps } from "./interface"
import { useState, useCallback, useRef, useEffect } from "react"
import { ZoomIn, ZoomOut, Eye, EyeOff, Pen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { A4ExamPaper } from "@/components/editor/A4ExamPaper"

// A4 paper dimensions in pixels (assuming 96 DPI)
const A4_WIDTH_PX = 794 // 210mm
const A4_HEIGHT_PX = 1123 // 297mm

export function Canvas({ className, exam, renderMode, onRenderModeChange, ...props }: CanvasProps) {
    const [scale, setScale] = useState(1)
    const containerRef = useRef<HTMLDivElement>(null)
    const MIN_SCALE = 0.1
    const MAX_SCALE = 2
    const SCALE_STEP = 0.1

    const calculateAutoScale = useCallback(() => {
        if (!containerRef.current) return 1

        const padding = 10; // 10px on each side
        // Subtract padding from container width and height
        const containerWidth = containerRef.current.clientWidth - padding * 2

        // Calculate scale based on width and height ratios
        // Height is not important in this case, because the page can scroll
        const widthScale = containerWidth / A4_WIDTH_PX

        // When container width > A4 width
        if (widthScale > 1) {
            return 1 // 100%
        }

        // Ensure the scale is within bounds
        return Math.min(Math.max(widthScale, MIN_SCALE), MAX_SCALE)
    }, [])

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setScale(calculateAutoScale())
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [calculateAutoScale])

    // Set scale to auto when component mounts
    useEffect(() => {
        setScale(calculateAutoScale())
    }, [calculateAutoScale])

    // Press ctrl or command to zoom in and out
    const handleWheel = useCallback((e: React.WheelEvent) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            setScale(prev => {
                const newScale = prev - (e.deltaY * 0.005)
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
                        onClick={() => setScale(calculateAutoScale())}
                    >
                        <span className="text-sm">Auto</span>
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
                ref={containerRef}
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