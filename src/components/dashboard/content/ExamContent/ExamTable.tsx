import { ExamResponse } from "@/types/exam";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Clock, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface ExamTableProps {
    exams: ExamResponse[];
    searchQuery: string;
    onSearchChange: (value: string) => void;
    handleEdit: (documentId: string) => void;
    handleDelete: (documentId: string) => void;
}

export function ExamTable({ exams, searchQuery, onSearchChange, handleEdit, handleDelete }: ExamTableProps) {
    return (
        <div className="rounded-sm border bg-background">
            <div className="p-4 space-y-4">
                <div className="flex items-center space-x-2">
                    <Input
                        placeholder="Filter exams..."
                        className="max-w-xs"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                    <Button variant="outline" size="icon" className="shrink-0">
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead>Title</TableHead>
                            <TableHead className="w-[120px]">Exam Date</TableHead>
                            <TableHead className="w-[120px]">Last Updated</TableHead>
                            <TableHead className="w-[140px]">Duration</TableHead>
                            <TableHead className="w-[120px]">Academic Year</TableHead>
                            <TableHead className="w-[140px]">Created At</TableHead>
                            <TableHead className="w-[120px]">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {exams.length > 0 ? (
                            exams.map((exam) => {
                                const formattedExamDate = format(new Date(exam.createdAt), "MMM d, yyyy");

                                return (
                                    <TableRow
                                        key={exam.documentId}
                                        className="hover:bg-muted/40 cursor-pointer"
                                        onClick={() => handleEdit(exam.documentId)}
                                    >
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{exam.projectName}</span>
                                                <span className="text-sm text-muted-foreground">{exam.examData.course}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                                                {exam.examData.examDate}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                    {format(new Date(exam.updatedAt), "MMM d, yyyy")}
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                <span>{exam.examData.duration}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                                {exam.examData.year}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {formattedExamDate}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="icon" title="Edit" onClick={() => handleEdit(exam.documentId)}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-100" title="Delete" onClick={() => handleDelete(exam.documentId)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                    No exams found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
} 