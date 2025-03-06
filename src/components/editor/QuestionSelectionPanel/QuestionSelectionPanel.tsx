import { cn } from "@/lib/utils"
import { type QuestionSelectionPanelProps } from "./interface"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Check, FileQuestion, SplitSquareVertical, Type, Columns } from "lucide-react"

// 定义组件类型
type ComponentType = {
    id: string;
    icon: React.ElementType;
    title: string;
    description: string;
}

// 定义组件分类
type ComponentCategory = {
    title: string;
    items: ComponentType[];
}

export function QuestionSelectionPanel({ className, onAddComponent, ...props }: QuestionSelectionPanelProps) {
    // 定义组件分类数据
    const componentCategories: ComponentCategory[] = [
        {
            title: "Question Types",
            items: [
                {
                    id: "multiple-choice-question",
                    icon: Check,
                    title: "Multiple Choice",
                    description: "Create a multiple choice question with options"
                },
                {
                    id: "fill-in-blank-question",
                    icon: Type,
                    title: "Fill in Blank",
                    description: "Create a fill in the blank question"
                },
                {
                    id: "open-question",
                    icon: FileQuestion,
                    title: "Open Question",
                    description: "Create an open-ended question with answer space"
                }
            ]
        },
        {
            title: "Layout Components",
            items: [
                {
                    id: "blank",
                    icon: SplitSquareVertical,
                    title: "Blank Space",
                    description: "Add empty space between components"
                },
                {
                    id: "divider",
                    icon: Columns,
                    title: "Divider",
                    description: "Add a horizontal divider line"
                }
            ]
        }
    ];

    // 处理组件点击
    const handleComponentClick = (componentId: string) => {
        onAddComponent(componentId);
    };

    return (
        <div className={cn("flex flex-col", className)} {...props}>
            <div className="p-3 border-b">
                <h2 className="text-lg font-medium text-center">Components</h2>
            </div>
            <ScrollArea className="flex-1">
                <div className="p-4 space-y-6">
                    {componentCategories.map((category) => (
                        <div key={category.title} className="space-y-3">
                            <h3 className="text-sm font-semibold">{category.title}</h3>
                            <div className="space-y-2">
                                {category.items.map((item) => (
                                    <Card
                                        key={item.id}
                                        className="cursor-pointer hover:bg-accent transition-colors"
                                        onClick={() => handleComponentClick(item.id)}
                                    >
                                        <CardContent className="p-3 flex items-center gap-3">
                                            <div className="bg-primary/10 p-2 rounded-md">
                                                <item.icon className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm">{item.title}</h4>
                                                <p className="text-xs text-muted-foreground">{item.description}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
} 