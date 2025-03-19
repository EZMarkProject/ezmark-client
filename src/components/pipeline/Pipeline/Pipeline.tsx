"use client"
import { PipelineProps } from './interface';
import { PipelineNavBar } from '../PipelineNavBar';
import { useEffect, useState } from 'react';
import { ExamSchedule } from '@/types/types';
import { getExamScheduleById, startPipeline } from '@/lib/api';
import { getStepByProgressName } from '@/lib/utils';
import { Skeleton } from "@/components/ui/skeleton";
import { Created } from '../content/Created';
import { Uploaded } from '../content/Uploaded';
import { MatchStart } from '../content/MatchStart';
import { MatchDone } from '../content/MatchDone';
import { Done } from '../content/Done';

export default function Pipeline({ documentId, }: PipelineProps) {
    const [schedule, setSchedule] = useState<ExamSchedule | null>(null);
    const [loading, setLoading] = useState(true);
    const [forceUpdate, setForceUpdate] = useState(false);

    useEffect(() => {
        const fetchSchedule = async () => {
            const schedule = await getExamScheduleById(documentId);
            setSchedule(schedule);
            setLoading(false);
        };
        fetchSchedule();
    }, [documentId, forceUpdate]);

    const handleStartPipeline = async () => {
        await startPipeline(documentId);
        setForceUpdate(!forceUpdate);
    }

    console.log(schedule);

    function renderContent() {
        switch (schedule?.result.progress) {
            case 'CREATED':
                return <Created />;
            case 'UPLOADED':
                return <Uploaded onStartPipeline={handleStartPipeline} />;
            case 'MATCH_START':
                return <MatchStart />;
            case 'MATCH_DONE':
                return <MatchDone />;
            // case 'DONE':
            //     return <Done />;
        }
    }


    return (
        <div className="w-full h-screen flex flex-col">
            {loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center space-y-6">
                        <div className="relative w-16 h-16">
                            <div className="absolute top-0 left-0 w-full h-full">
                                <div className="w-16 h-16 border-3 rounded-full border-primary/20"></div>
                            </div>
                            <div className="absolute top-0 left-0 w-full h-full animate-spin">
                                <div className="w-16 h-16 border-t-3 border-l-3 rounded-full border-primary"></div>
                            </div>
                        </div>
                        <div className="space-y-4 w-full">
                            <Skeleton className="h-6 w-[300px]" />
                            <Skeleton className="h-5 w-[250px]" />
                            <Skeleton className="h-5 w-[200px]" />
                        </div>
                    </div>
                </div>
            ) : schedule ? (
                <>
                    <PipelineNavBar
                        examName={schedule.name}
                        progress={schedule.result.progress}
                    />
                    <div className="flex-1 p-4">
                        {/* Here is Content */}
                        {renderContent()}
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center h-full">
                    <div className="text-lg text-destructive flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        <span>Failed to load exam data</span>
                    </div>
                </div>
            )}
        </div>
    );
}