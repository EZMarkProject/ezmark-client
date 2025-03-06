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
                <div className="flex items-center">
                    <div className="font-medium text-base">
                        {questionNumber}.
                    </div>
                    <RichInput
                        initialContent={questionObj.content}
                        onContentChange={handleContentChange}
                        renderMode={renderMode}
                    />
                    <div className="text-muted-foreground">
                        Score: {questionObj.score}
                    </div>
                </div>
            </div>

            <div className="">
                <Blank lines={questionObj.lines} />
            </div>
        </div>
    );
};

export default OpenQuestion; 