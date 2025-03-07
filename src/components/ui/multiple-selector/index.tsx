import * as React from "react"
import { X, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type Option = {
    label: string
    value: string
    disabled?: boolean
}

interface MultipleSelectorProps {
    value: string[]
    onChange: (value: string[]) => void
    placeholder?: string
    disabled?: boolean
    options: Option[]
    className?: string
}

export function MultipleSelector({
    value = [],
    onChange,
    placeholder = "Select options",
    disabled = false,
    options,
    className,
}: MultipleSelectorProps) {
    const [open, setOpen] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)

    // Handle outside click to close dropdown
    React.useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleOutsideClick)
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
        }
    }, [])

    const handleToggle = () => {
        if (!disabled) {
            setOpen(!open)
        }
    }

    const handleSelect = (optionValue: string) => {
        if (value.includes(optionValue)) {
            onChange(value.filter(v => v !== optionValue))
        } else {
            onChange([...value, optionValue])
        }
    }

    const handleRemove = (optionValue: string, e: React.MouseEvent) => {
        e.stopPropagation()
        onChange(value.filter(v => v !== optionValue))
    }

    return (
        <div ref={containerRef} className={cn("relative", className)}>
            {/* Selected items display */}
            <div
                className={cn(
                    "flex h-10 w-full flex-wrap items-center gap-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 cursor-pointer",
                    disabled && "cursor-not-allowed opacity-50"
                )}
                onClick={handleToggle}
            >
                {value.length > 0 ? (
                    <>
                        {value.map(val => {
                            const option = options.find(opt => opt.value === val)
                            return option ? (
                                <Badge
                                    key={val}
                                    variant="secondary"
                                    className="flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium"
                                >
                                    {option.label}
                                    <button
                                        type="button"
                                        className="ml-1 rounded-full hover:bg-muted/50 inline-flex items-center justify-center h-3 w-3"
                                        onClick={(e) => handleRemove(val, e)}
                                        disabled={disabled}
                                        aria-label={`Remove ${option.label}`}
                                    >
                                        <X className="h-2.5 w-2.5" />
                                    </button>
                                </Badge>
                            ) : null
                        })}
                    </>
                ) : (
                    <span className="text-muted-foreground">{placeholder}</span>
                )}
                <div className="ml-auto pl-2 flex items-center">
                    <ChevronDown className={cn("h-4 w-4 shrink-0 opacity-50 transition-transform", open && "rotate-180")} />
                </div>
            </div>

            {/* Dropdown menu */}
            {open && (
                <div className="absolute z-10 w-full mt-1 rounded-md border border-input bg-popover shadow-md">
                    <div className="max-h-[200px] overflow-auto p-1">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className={cn(
                                    "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none",
                                    value.includes(option.value) ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
                                    option.disabled && "pointer-events-none opacity-50"
                                )}
                                onClick={() => !option.disabled && handleSelect(option.value)}
                            >
                                <span>{option.label}</span>
                            </div>
                        ))}
                        {options.length === 0 && (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                                No options available
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
} 