import React from "react";
import { OpenQuestionProps } from "./interface";
import RichInput from "@/components/rich-editor/RichInput";
import { Blank } from "@/components/layout-components/Blank";

const OpenQuestion: React.FC<OpenQuestionProps> = ({
    questionNumber,
    questionObj,
    renderMode,
    onContentChange
}) => {
    const handleContentChange = (content: string) => {
        onContentChange(questionObj.id, content);
    };

    return (
        <div className="my-2">
            <div>
                <div className="flex">
                    <div className="font-medium text-base pt-[5px]">
                        {questionNumber}.
                    </div>
                    <RichInput
                        initialContent={questionObj.content}
                        onContentChange={handleContentChange}
                        renderMode={renderMode}
                    />
                </div>
                <div className="text-sm text-muted-foreground text-right">
                    Score: {questionObj.score}
                </div>
            </div>

            <div className="">
                <Blank lines={questionObj.lines} />
            </div>
        </div>
    );
};

export default OpenQuestion; 