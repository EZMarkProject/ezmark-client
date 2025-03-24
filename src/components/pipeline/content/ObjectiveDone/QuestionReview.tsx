import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Check, X, Loader2 } from "lucide-react";
import { IMAGE_PREFIX } from "@/lib/host";
import { QuestionReviewProps } from "./interface";

export default function QuestionReview({
    question,
    definedQuestion,
    onMarkCorrect,
    onMarkIncorrect,
    onPrevious,
    onNext,
    progress,
    isLoading = false,
    total,
    finished
}: QuestionReviewProps) {
    return (
        <div className="w-full flex flex-col items-center max-w-3xl mx-auto">
            {/* Progress bar */}
            <Progress value={progress} className="w-full h-2 mb-8" />

            {/* Question image */}
            <Card className="w-full mb-6">
                <CardContent className="p-6 flex items-center justify-center min-h-[300px] relative">
                    {isLoading && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    )}
                    {question.imageUrl ? (
                        <img
                            src={`${IMAGE_PREFIX}/${question.imageUrl}`}
                            alt="Question"
                            className="max-w-full max-h-[300px] object-contain rounded-md"
                        />
                    ) : (
                        <div className="text-center text-muted-foreground">
                            Question Image
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Answer and score section */}
            <div className="w-full flex justify-between mb-8">
                <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">Answer:</span>
                    <span className="font-semibold">{definedQuestion.answer}</span>
                </div>
                <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">Score:</span>
                    <span className="font-semibold">{definedQuestion.score}</span>
                </div>
                <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">Progress:</span>
                    <span className="font-semibold">{`${finished}/${total}`}</span>
                </div>
            </div>

            {/* True/False buttons */}
            <div className="w-full flex justify-center gap-6 mb-8">
                <Button
                    onClick={onMarkCorrect}
                    className="w-32 h-12"
                    variant="outline"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Check className="mr-2 h-4 w-4" />
                    )}
                    True
                </Button>
                <Button
                    onClick={onMarkIncorrect}
                    className="w-32 h-12"
                    variant="outline"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <X className="mr-2 h-4 w-4" />
                    )}
                    False
                </Button>
            </div>

            {/* Navigation buttons */}
            <div className="w-full flex justify-between">
                <Button
                    onClick={onPrevious}
                    variant="ghost"
                    className="flex items-center"
                    disabled={isLoading}
                >
                    <ChevronLeft className="h-5 w-5 mr-1" />
                    prev
                </Button>
                <Button
                    onClick={onNext}
                    variant="ghost"
                    className="flex items-center"
                    disabled={isLoading}
                >
                    next
                    <ChevronRight className="h-5 w-5 ml-1" />
                </Button>
            </div>
        </div>
    );
} 