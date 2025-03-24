import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Loader2 } from "lucide-react";

export interface AiSuggestionProps {
    aiSuggestion: string | null;
    isAiLoading: boolean;
}

export default function AiSuggestion({
    aiSuggestion,
    isAiLoading
}: AiSuggestionProps) {
    return (
        <div className="w-full pl-4 border-l">
            <Card className="h-full overflow-hidden">
                <CardContent className="p-4">
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                        <Bot className="w-5 h-5 mr-2" />
                        AI Suggestions
                    </h3>

                    {isAiLoading ? (
                        <div className="flex flex-col items-center justify-center h-64 space-y-4">
                            <div className="relative w-16 h-16">
                                <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                                <div className="absolute inset-2 rounded-full border-4 border-l-primary border-r-transparent border-t-transparent border-b-transparent spin 3s linear infinite"></div>
                                <Bot className="absolute inset-0 m-auto w-8 h-8 text-primary" />
                            </div>
                            <p className="text-sm text-muted-foreground">AI is analyzing the answer...</p>
                        </div>
                    ) : (
                        <ScrollArea className="h-[calc(100vh-280px)]">
                            {aiSuggestion ? (
                                <div className="text-sm space-y-4">
                                    {aiSuggestion.split('\n').map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-64">
                                    <p className="text-sm text-muted-foreground">
                                        Select a question to see AI suggestions
                                    </p>
                                </div>
                            )}
                        </ScrollArea>
                    )}
                </CardContent>
            </Card>
        </div>
    );
} 