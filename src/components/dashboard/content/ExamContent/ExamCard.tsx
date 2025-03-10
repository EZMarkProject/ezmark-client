import { ExamResponse } from "@/types/exam";
import { format } from "date-fns";
import { Calendar, Clock, Bookmark, PenSquare, Trash2, FileText, RefreshCw, CalendarPlus } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ExamCardProps {
    exam: ExamResponse;
    onEdit: (documentId: string) => void;
    onDelete: (documentId: string) => void;
}

export function ExamCard({ exam, onEdit, onDelete }: ExamCardProps) {
    // Format dates for display
    const createdDate = new Date(exam.createdAt);
    const formattedCreatedDate = format(createdDate, "d MMM yyyy");

    // 格式化更新日期，精确到分钟
    const updatedDate = new Date(exam.updatedAt);
    const formattedUpdatedDate = format(updatedDate, "d MMM yyyy HH:mm");

    // Format exam date if available
    const examDate = exam.examData.examDate ? new Date(exam.examData.examDate) : null;
    const formattedExamDate = examDate ? format(examDate, "d MMM yyyy") : "Not scheduled";

    return (
        <Card className="w-30 flex-grow overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold tracking-tight">
                        {exam.projectName}
                    </h3>

                    <Badge variant="outline" className="text-sm">
                        {exam.examData.semester} {exam.examData.year}
                    </Badge>
                </div>

                <div className="mt-1 text-muted-foreground">
                    {exam.examData.university} • {exam.examData.course}
                </div>

                <div className="mt-2 grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{formattedExamDate}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{exam.examData.duration}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{exam.examData.components.length} Questions</span>
                    </div>
                </div>
            </CardContent>

            <div className="px-6 py-3 border-t bg-muted/30">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <CalendarPlus className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                            Created At: {formattedCreatedDate}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                            Last updated: {formattedUpdatedDate}
                        </span>
                    </div>

                    {exam.examData.description && (
                        <div className="flex gap-2 mt-1">
                            <FileText className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {exam.examData.description}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <CardFooter className="px-6 py-4 flex justify-between border-t">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(exam.documentId)}
                >
                    <PenSquare className="mr-2 h-4 w-4" />
                    Edit Exam
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive border-destructive/30 hover:border-destructive/60 hover:bg-destructive/10"
                    onClick={() => onDelete(exam.documentId)}
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
} 