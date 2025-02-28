"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface TilesProps {
    className?: string
    rows?: number
    cols?: number
    tileClassName?: string
    tileSize?: "sm" | "md" | "lg"
}

const tileSizes = {
    sm: "w-8 h-8",
    md: "w-9 h-9 md:w-12 md:h-12",
    lg: "w-12 h-12 md:w-16 md:h-16",
}

export function Tiles({
    className,
    rows = 100,
    cols = 10,
    tileClassName,
    tileSize = "md",
}: TilesProps) {
    const rowsArray = new Array(rows).fill(1)
    const colsArray = new Array(cols).fill(1)

    return (
        <div
            className={cn(
                "relative z-0 flex w-full h-full justify-center",
                className
            )}
        >
            {rowsArray.map((_, i) => (
                <div
                    key={`row-${i}`}
                    className={cn(
                        tileSizes[tileSize],
                        "border-l-2 relative",
                        "border-[var(--tile-border-light)] dark:border-[var(--tile-border-dark)]",
                        tileClassName
                    )}
                >
                    {colsArray.map((_, j) => (
                        <div
                            key={`col-${j}`}
                            className={cn(
                                tileSizes[tileSize],
                                "border-r-2 border-t-2 relative hover:bg-[var(--tile)]",
                                "border-[var(--tile-border-light)] dark:border-[var(--tile-border-dark)]",
                                tileClassName
                            )}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
} 