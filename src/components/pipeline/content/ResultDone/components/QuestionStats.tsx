import { ExamQuestionStatistics } from "@/types/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface QuestionStatsProps {
    questions: ExamQuestionStatistics[];
}

export function QuestionStats({ questions }: QuestionStatsProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Question Analysis</h3>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Question</TableHead>
                        <TableHead>Average</TableHead>
                        <TableHead>Highest</TableHead>
                        <TableHead>Lowest</TableHead>
                        <TableHead>Median</TableHead>
                        <TableHead>Std Dev</TableHead>
                        <TableHead>Correct Rate</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {questions.map((question, index) => {
                        const correctRate = question.correct !== undefined && question.incorrect !== undefined
                            ? (question.correct / (question.correct + question.incorrect)) * 100
                            : null;

                        return (
                            <TableRow key={question.questionId}>
                                <TableCell>Q{index + 1}</TableCell>
                                <TableCell>{question.average.toFixed(2)}</TableCell>
                                <TableCell>{question.highest.toFixed(2)}</TableCell>
                                <TableCell>{question.lowest.toFixed(2)}</TableCell>
                                <TableCell>{question.median.toFixed(2)}</TableCell>
                                <TableCell>{question.standardDeviation.toFixed(2)}</TableCell>
                                <TableCell>
                                    {correctRate !== null ? (
                                        <div className="flex items-center gap-2">
                                            <Progress value={correctRate} className="w-[60px]" />
                                            <span>{correctRate.toFixed(1)}%</span>
                                        </div>
                                    ) : (
                                        "N/A"
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
} 