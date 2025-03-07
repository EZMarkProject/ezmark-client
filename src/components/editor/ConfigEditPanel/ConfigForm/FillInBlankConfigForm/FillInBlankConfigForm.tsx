import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FillInBlankConfigFormProps } from "./interface";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
    score: z.coerce.number().min(1, {
        message: "Score must be a positive number."
    }),
    answer: z.string().min(1, {
        message: "Answer is required."
    })
});

export default function FillInBlankConfigForm({ fillInBlank, onFillInBlankChange }: FillInBlankConfigFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            score: fillInBlank.score || 1,
            answer: fillInBlank.answer || "",
        },
    });

    // 当答案变化时通知父组件
    const handleAnswerChange = (value: string) => {
        form.setValue('answer', value);
        onFillInBlankChange({
            answer: value
        });
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            await onFillInBlankChange({
                score: values.score,
                answer: values.answer
            });
            toast({
                title: "Exam configuration saved",
                description: "The exam configuration has been saved successfully",
                duration: 1500,
            })
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-1">
                <FormField
                    control={form.control}
                    name="score"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Question Mark</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter score for this question"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        onFillInBlankChange({
                                            score: parseInt(e.target.value)
                                        });
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="answer"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Answer</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter the correct answer for grading"
                                    className="min-h-[100px]"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleAnswerChange(e.target.value);
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                The correct answer that will be used for AI-assisted grading
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button disabled={isLoading} type="submit" className="w-full">
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        'Save Changes'
                    )}
                </Button>
            </form>
        </Form>
    );
} 