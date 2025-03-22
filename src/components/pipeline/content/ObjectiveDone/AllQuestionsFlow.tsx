import { ReactFlow, useEdgesState, useNodesState, Controls, Background, MiniMap, Panel } from "@xyflow/react";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { AllQuestionsFlowProps } from "./interface";

export default function AllQuestionsFlow({ handleNextStep }: AllQuestionsFlowProps) {
    const [nodes, setNodes] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);
    const schedule = { result: { matchResult: { done: true } } };


    return (
        <div className="w-full h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
            >
                <Controls />
                <Background color="#aaa" gap={16} />
                <MiniMap />
                <Panel position="bottom-center">
                    <div className="flex gap-2">
                        <Button
                            variant="default"
                            size="default"
                            disabled={!schedule.result.matchResult.done}
                            onClick={handleNextStep}
                        >
                            Next Step <ArrowRight className='w-4 h-4' />
                        </Button>
                    </div>
                </Panel>
            </ReactFlow>
        </div>
    )
}