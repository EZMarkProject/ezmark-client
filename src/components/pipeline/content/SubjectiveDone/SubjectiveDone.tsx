import { useState, useCallback, useEffect } from "react";
import { SubjectiveDoneProps, Question, StudentQuestion, ExtendedSubjectiveQuestion } from "./interface";
import QuestionSidebar from "./QuestionSidebar";
import QuestionContent from "./QuestionContent";
import AiSuggestion from "./AiSuggestion";
import { ExamSchedule, SubjectiveQuestion } from "@/types/types";
import { ExamResponse } from "@/types/exam";

export default function SubjectiveDone({
    schedule,
    setSchedule
}: SubjectiveDoneProps) {
    // 内部状态管理
    const [subjectiveQuestions, setSubjectiveQuestions] = useState<ExtendedSubjectiveQuestion[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<ExtendedSubjectiveQuestion | null>(null);
    const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
    const [isAiLoading, setIsAiLoading] = useState(false);

    // 计算进度
    const totalQuestions = subjectiveQuestions.length;
    const finishedQuestions = subjectiveQuestions.filter(q => q.done).length;
    const progress = totalQuestions > 0 ? (finishedQuestions / totalQuestions) * 100 : 0;

    // 初始化数据
    useEffect(() => {
        if (!schedule) return;

        // 提取所有学生的主观题答案
        const questions: ExtendedSubjectiveQuestion[] = schedule.result.studentPapers.flatMap(paper => {
            return paper.subjectiveQuestions.map(q => ({
                ...q,
                studentId: paper.student.studentId
            }));
        });
        setSubjectiveQuestions(questions);
        setCurrentQuestion(questions[0]); // 默认选择第一个问题
    }, [schedule]);

    // 获取AI建议
    useEffect(() => {
        if (!currentQuestion) return;

        // TODO做缓存优化
        fetchAiSuggestion(currentQuestion);
    }, [currentQuestion])

    // 获取AI建议
    const fetchAiSuggestion = async (question: SubjectiveQuestion) => {
        // TODO
    };

    // 选择问题
    const handleQuestionSelect = useCallback((questionId: string, studentId: string) => {
        const question = subjectiveQuestions.find(q => q.questionId === questionId && q.studentId === studentId) || null;
        const studentQuestion = subjectiveQuestions.find(
            q => q.questionId === questionId && q.studentId === studentId
        ) || null;

        setCurrentQuestion(question);
    }, [subjectiveQuestions]);

    // 提交分数
    const handleScoreSubmit = async (score: number) => {
        // TODO
    };

    // 前一个问题
    const handlePrevious = useCallback(() => {
        if (!currentQuestion) return;

        const currentIndex = subjectiveQuestions.findIndex(
            q => q.questionId === currentQuestion.questionId &&
                q.studentId === currentQuestion.studentId
        );

        if (currentIndex > 0) {
            const prevSQ = subjectiveQuestions[currentIndex - 1];
            const prevQ = subjectiveQuestions.find(q => q.questionId === prevSQ.questionId) || null;

            setCurrentQuestion(prevQ);
        }
    }, [currentQuestion, subjectiveQuestions]);

    // 下一个问题
    const handleNext = useCallback(() => {
        if (!currentQuestion) return;

        const currentIndex = subjectiveQuestions.findIndex(
            q => q.questionId === currentQuestion.questionId
        );

        if (currentIndex < subjectiveQuestions.length - 1) {
            const nextQ = subjectiveQuestions[currentIndex + 1];

            setCurrentQuestion(nextQ);
        }
    }, [currentQuestion, subjectiveQuestions]);

    return (
        <>
            {currentQuestion && (
                <div className="w-full h-full flex">
                    {/* Left sidebar for question selection */}
                    <div className="max-w-60 overflow-hidden">
                        <QuestionSidebar
                            questions={subjectiveQuestions} // 所有问题的序号, id
                            currentQuestion={currentQuestion}
                            onQuestionSelect={handleQuestionSelect}
                        />
                    </div>

                    {/* Main content area */}
                    <QuestionContent
                        currentQuestion={currentQuestion}
                        progress={progress}
                        total={totalQuestions}
                        finished={finishedQuestions}
                        onScoreSubmit={handleScoreSubmit}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                        questionDef={getQuestionDef(schedule, currentQuestion.questionId)}
                    />

                    {/* Right sidebar for AI suggestions */}
                    <div className="w-1/4">
                        <AiSuggestion
                            aiSuggestion={aiSuggestion}
                            isAiLoading={isAiLoading}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

function getQuestionDef(schedule: ExamSchedule, componentId: string): SubjectiveQuestion {
    const exam = schedule.exam as ExamResponse;
    const questionDef = exam.examData.components.find((c) => c.id === componentId);
    return questionDef as unknown as SubjectiveQuestion;
}