import { ExamResponse } from "@/types/exam";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Pencil, Trash2 } from "lucide-react";
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
            <div className="p-2 sm:p-4 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <Input
                        placeholder="Filter exams..."
                        className="w-full sm:max-w-xs"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="w-[250px]">Title</TableHead>
                                <TableHead className="w-[120px] hidden sm:table-cell">Exam Date</TableHead>
                                <TableHead className="w-[120px] hidden md:table-cell">Last Updated</TableHead>
                                <TableHead className="w-[140px] hidden sm:table-cell">Duration</TableHead>
                                <TableHead className="w-[120px] hidden lg:table-cell">Academic Year</TableHead>
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
                                                    <span className="font-medium line-clamp-2">{exam.projectName}</span>
                                                    <span className="text-sm text-muted-foreground line-clamp-2">{exam.examData.course}</span>
                                                    <div className="flex flex-wrap gap-2 mt-1 sm:hidden">
                                                        <Badge variant="outline" className="whitespace-nowrap bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800">
                                                            {exam.examData.examDate}
                                                        </Badge>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-3 w-3 text-muted-foreground" />
                                                            <span className="text-sm">{exam.examData.duration}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge variant="outline" className="whitespace-nowrap bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800">
                                                    {exam.examData.examDate}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <Badge variant="outline" className="whitespace-nowrap bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
                                                    {format(new Date(exam.updatedAt), "MMM d, yyyy")}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                                    <span>{exam.examData.duration}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden lg:table-cell">
                                                <Badge variant="outline" className="whitespace-nowrap bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800">
                                                    {exam.examData.year}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="ghost" size="icon" title="Edit" onClick={(e) => { e.stopPropagation(); handleEdit(exam.documentId); }}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                                        title="Delete"
                                                        onClick={(e) => { e.stopPropagation(); handleDelete(exam.documentId); }}
                                                    >
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
        </div>
    );
} 