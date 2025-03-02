interface MultipleChoiceQuestionProps {
    /**
     * Question number
     */
    questionNumber?: number | string;

    /**
     * Question content
     */
    initialQuestionContent?: string;

    /**
     * Option contents array
     */
    initialOptions?: string[];

    /**
     * Option prefixes, default is A, B, C, D...
     */
    optionPrefixes?: string[];

    /**
     * Read-only mode
     */
    readOnly?: boolean;

    /**
     * Question content change callback
     */
    onQuestionChange?: (content: string) => void;

    /**
     * Option content change callback
     */
    onOptionChange?: (index: number, content: string) => void;
}

export type { MultipleChoiceQuestionProps }; 