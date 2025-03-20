import { Handle, Position } from '@xyflow/react';
import { PaperNodeProps } from './interface';
import Image from 'next/image';
import {
    Card,
    CardContent,
} from "@/components/ui/card";

export default function PaperNode({ data }: PaperNodeProps) {
    return (
        <>
            <Card className="w-[250px] shadow-none rounded-md">
                <CardContent className="p-2">
                    <Image
                        className='w-full h-auto rounded-md'
                        src={data.imageUrl}
                        alt="paper"
                        width={250}
                        height={250}
                    />
                </CardContent>
            </Card>
            <Handle type="source" position={Position.Bottom} />
        </>
    )
}