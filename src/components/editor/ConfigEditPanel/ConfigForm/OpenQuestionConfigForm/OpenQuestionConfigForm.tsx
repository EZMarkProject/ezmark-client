import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { OpenQuestionConfigFormProps } from "./interface";

const formSchema = z.object({
    score: z.coerce.number().min(1, {
        message: "Score must be a positive number."
    }),
    lines: z.coerce.number().min(1, {
        message: "Number of lines must be at least 1."
    }),
    answer: z.string().min(1, {
        message: "Answer is required."
    })
});

export default function OpenQuestionConfigForm({ openQuestion, onOpenQuestionChange }: OpenQuestionConfigFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            score: openQuestion.score || 5,
            lines: openQuestion.lines || 10,
            answer: openQuestion.answer || "",
        },
    });

    // 当分数变化时通知父组件
    const handleScoreChange = (value: number) => {
        form.setValue('score', value);
        onOpenQuestionChange({
            score: value
        });
    };

    // 当行数变化时通知父组件
    const handleLinesChange = (value: number) => {
        form.setValue('lines', value);
        onOpenQuestionChange({
            lines: value
        });
    };

    // 当答案变化时通知父组件
    const handleAnswerChange = (value: string) => {
        form.setValue('answer', value);
        onOpenQuestionChange({
            answer: value
        });
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        onOpenQuestionChange({
            score: values.score,
            lines: values.lines,
            answer: values.answer
        });
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
                                        handleScoreChange(parseInt(e.target.value));
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="lines"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Answer Space Lines</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter number of lines for answer space"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleLinesChange(parseInt(e.target.value));
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                How many lines to reserve for student answers
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="answer"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Model Answer</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter the model answer for AI-assisted grading"
                                    className="min-h-[120px]"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleAnswerChange(e.target.value);
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                Reference answer that will be used for AI-assisted marking
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Save Changes</Button>
            </form>
        </Form>
    );
} 