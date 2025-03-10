import { ExamResponse } from "@/types/exam";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "@/context/Auth";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ExamCard } from "./ExamCard";
import { Separator } from "@/components/ui/separator";
import { getExamByUserEmail, deleteExamById } from "@/lib/api";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

function ExamContent() {
    const [isLoading, setIsLoading] = useState(true);
    const [initialData, setInitialData] = useState<ExamResponse[]>([]);
    const [refetch, setRefetch] = useState(false);
    const [examToDelete, setExamToDelete] = useState<string | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const { email } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (email) {
            const fetchExams = async () => {
                const response = await getExamByUserEmail(email);
                setInitialData(response.data);
                setIsLoading(false);
            };
            fetchExams();
        }
    }, [email, refetch]);

    // Handle edit button click
    const handleEdit = (documentId: string) => {
        router.push(`/editor/${documentId}`);
    };

    // Handle delete button click
    const handleDelete = async (documentId: string) => {
        setExamToDelete(documentId);
        setIsDeleteDialogOpen(true);
    };

    // Handle confirm delete
    const handleConfirmDelete = async () => {
        if (examToDelete) {
            await deleteExamById(examToDelete);
            setRefetch(!refetch);
            setIsDeleteDialogOpen(false);
            setExamToDelete(null);
        }
    };

    // Handle create new exam
    const handleCreateNew = () => {
        router.push('/create');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Exams</h2>
                    <p className="text-muted-foreground mt-1">Manage and view your exam papers.</p>
                </div>
                <Button onClick={handleCreateNew}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Exam
                </Button>
            </div>

            <Separator />

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete this exam?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. The exam will be permanently deleted from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleConfirmDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="h-[250px] w-full rounded-lg" />
                        </div>
                    ))}
                </div>
            ) : initialData.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-muted-foreground mb-4">
                        No exams found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                        Start creating exams to help with AI-assisted grading
                    </p>
                    <Button onClick={handleCreateNew}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Your First Exam
                    </Button>
                </div>
            ) : (
                <div className="flex gap-4 justify-start">
                    {initialData.map((exam) => (
                        <ExamCard
                            key={exam.documentId}
                            exam={exam}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ExamContent;