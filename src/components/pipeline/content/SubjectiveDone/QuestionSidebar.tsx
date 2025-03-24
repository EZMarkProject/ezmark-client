import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Question, StudentQuestion, ExtendedSubjectiveQuestion } from "./interface";

export interface QuestionSidebarProps {
    questions: ExtendedSubjectiveQuestion[];
    currentQuestion: ExtendedSubjectiveQuestion | null;
    onQuestionSelect: (questionId: string, studentId: string) => void;
}

export default function QuestionSidebar({
    questions,
    currentQuestion,
    onQuestionSelect
}: QuestionSidebarProps) {
    // 去重
    const uniqueQuestions = questions.filter((question, index, self) =>
        index === self.findIndex((t) => t.questionId === question.questionId)
    );
    return (
        <div className="w-full pr-4 border-r overflow-hidden">
            <ScrollArea className="h-[calc(100vh-200px)]">
                {uniqueQuestions.map((question, qIndex) => (
                    <div key={`${question.questionId}-${qIndex}`} className="mb-6">
                        <h3 className="text-sm font-medium mb-2">Question {qIndex + 1}</h3>
                        <div className="flex items-center flex-wrap gap-2">
                            {questions
                                .filter(q => q.questionId === question.questionId)
                                .map((q, index) => (
                                    <Button
                                        key={`${question.questionId}-${q.studentId}`}
                                        variant={currentQuestion?.questionId === question.questionId && q.studentId === currentQuestion.studentId ? "default" : "outline"}
                                        className="w-10 h-10"
                                        onClick={() => onQuestionSelect(question.questionId, q.studentId)}
                                    >
                                        {index + 1}
                                        {q.done && (
                                            <span className="ml-auto text-green-500">✓</span>
                                        )}
                                    </Button>
                                ))}
                        </div>
                    </div>
                ))}
            </ScrollArea>
        </div>
    );
} 