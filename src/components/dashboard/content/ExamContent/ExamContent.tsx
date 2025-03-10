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
import { getExamByUserId, deleteExamById, createExam } from "@/lib/api";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
    projectName: z.string().min(1, "Project name is required"),
});

type FormValues = z.infer<typeof formSchema>;

function ExamContent() {
    const [isLoading, setIsLoading] = useState(false)
    const [initialData, setInitialData] = useState<ExamResponse[]>([]);
    const [refetch, setRefetch] = useState(false);
    const [examToDelete, setExamToDelete] = useState<string | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const { documentId } = useAuth();
    const router = useRouter();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectName: "",
        },
    });

    useEffect(() => {
        if (documentId) {
            const fetchExams = async () => {
                setIsLoading(true);
                const response = await getExamByUserId(documentId);
                setInitialData(response.data);
                setIsLoading(false);
            };
            fetchExams();
        }
    }, [documentId, refetch]);

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
            setIsDeleting(true);
            await deleteExamById(examToDelete);
            setRefetch(!refetch);
            setIsDeleting(false);
            setIsDeleteDialogOpen(false);
            setExamToDelete(null);
        }
    };

    // Handle create new exam
    const handleCreateNew = () => {
        setIsCreateDialogOpen(true);
    };

    // Handle form submission
    const onSubmit = async (data: FormValues) => {
        setIsCreating(true);
        await createExam(data.projectName, documentId);
        form.reset();
        setRefetch(!refetch);
        setIsCreating(false);
        setIsCreateDialogOpen(false);
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
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isDeleting}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleConfirmDelete} disabled={isDeleting}>
                            {isDeleting ? (
                                <>
                                    <span className="mr-2 h-4 w-4 animate-spin">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                                    </span>
                                    Deleting...
                                </>
                            ) : (
                                "Delete"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Create New Exam Dialog */}
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Exam</DialogTitle>
                        <DialogDescription>
                            Enter the details to create a new exam for AI-assisted grading.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="projectName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter exam title or identifier" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button variant="outline" type="button" onClick={() => setIsCreateDialogOpen(false)} disabled={isCreating}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isCreating}>
                                    {isCreating ? (
                                        <>
                                            <span className="mr-2 h-4 w-4 animate-spin">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                                            </span>
                                            Creating...
                                        </>
                                    ) : (
                                        "Create"
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
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
                <div className="flex gap-4 justify-center flex-wrap">
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