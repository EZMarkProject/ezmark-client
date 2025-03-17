import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ArrowUpDown, ChevronDown, ChevronUp, CalendarDays, FileText, School } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useMemo } from "react";

type SortField = "name" | "examPaper" | "class";
type SortDirection = "asc" | "desc";

// Define the ExamSchedule interface
interface ExamSchedule {
    documentId: string;
    name: string;
    examPaper: {
        documentId: string;
        projectName: string;
    };
    class: {
        documentId: string;
        name: string;
    };
    publishedAt: string;
}

interface ExamScheduleTableProps {
    examSchedules: ExamSchedule[];
    searchQuery: string;
    onSearchChange: (value: string) => void;
    handleDelete: (documentId: string) => void;
}

export function ExamScheduleTable({
    examSchedules,
    searchQuery,
    onSearchChange,
    handleDelete
}: ExamScheduleTableProps) {
    // Internal sort state
    const [sortField, setSortField] = useState<SortField>("name");
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

    const handleSort = (field: SortField) => {
        if (field === sortField) {
            // Toggle direction if clicking the same field
            setSortDirection(sortDirection === "desc" ? "asc" : "desc");
        } else {
            // New field, set to asc by default
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const getSortIcon = (field: SortField) => {
        if (field !== sortField) return <ArrowUpDown className="ml-2 h-4 w-4" />;
        return sortDirection === "desc" ?
            <ChevronDown className="ml-2 h-4 w-4" /> :
            <ChevronUp className="ml-2 h-4 w-4" />;
    };

    // Sort exam schedules based on current sort settings
    const sortedSchedules = useMemo(() => {
        return [...examSchedules].sort((a, b) => {
            // For each sort field, determine how to compare values
            switch (sortField) {
                case "name":
                    // Compare names alphabetically
                    return sortDirection === "desc"
                        ? b.name.localeCompare(a.name)
                        : a.name.localeCompare(b.name);
                case "examPaper":
                    // Compare by exam paper name
                    return sortDirection === "desc"
                        ? b.examPaper.projectName.localeCompare(a.examPaper.projectName)
                        : a.examPaper.projectName.localeCompare(b.examPaper.projectName);
                case "class":
                    // Compare by class name
                    return sortDirection === "desc"
                        ? b.class.name.localeCompare(a.class.name)
                        : a.class.name.localeCompare(b.class.name);
                default:
                    return 0;
            }
        });
    }, [examSchedules, sortField, sortDirection]);

    return (
        <div className="rounded-sm border bg-background">
            <div className="p-2 sm:p-4 space-y-4">
                <div className="flex justify-start sm:flex-row items-start sm:items-center gap-2">
                    <Input
                        placeholder="Search exam schedules for AI-assisted marking..."
                        className="w-full sm:max-w-xs"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-1">
                                Sort by
                                {getSortIcon(sortField)}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleSort("name")} className="flex items-center justify-between">
                                <span>Name</span>
                                {sortField === "name" && getSortIcon("name")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSort("examPaper")} className="flex items-center justify-between">
                                <span>Exam Paper</span>
                                {sortField === "examPaper" && getSortIcon("examPaper")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSort("class")} className="flex items-center justify-between">
                                <span>Class</span>
                                {sortField === "class" && getSortIcon("class")}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="w-[250px]">
                                    <Button
                                        variant="ghost"
                                        onClick={() => handleSort("name")}
                                        className="flex items-center p-0 h-auto font-medium"
                                    >
                                        Name
                                        {getSortIcon("name")}
                                    </Button>
                                </TableHead>
                                <TableHead className="w-[250px]">
                                    <Button
                                        variant="ghost"
                                        onClick={() => handleSort("examPaper")}
                                        className="flex items-center p-0 h-auto font-medium"
                                    >
                                        Exam Paper
                                        {getSortIcon("examPaper")}
                                    </Button>
                                </TableHead>
                                <TableHead className="w-[200px]">
                                    <Button
                                        variant="ghost"
                                        onClick={() => handleSort("class")}
                                        className="flex items-center p-0 h-auto font-medium"
                                    >
                                        Class
                                        {getSortIcon("class")}
                                    </Button>
                                </TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedSchedules.length > 0 ? (
                                sortedSchedules.map((schedule) => (
                                    <TableRow
                                        key={schedule.documentId}
                                        className="hover:bg-muted/40 cursor-pointer"
                                    >
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium">{schedule.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-muted-foreground" />
                                                <span>{schedule.examPaper.projectName}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <School className="h-4 w-4 text-muted-foreground" />
                                                <span>{schedule.class.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                                    title="Delete"
                                                    onClick={() => handleDelete(schedule.documentId)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                        No exam schedules found
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