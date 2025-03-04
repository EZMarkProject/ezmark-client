export interface FillInBlankQuestionProps {
    /**
     * Question number to display
     */
    questionNumber?: number;

    /**
     * Initial content for the fill-in-blank question
     */
    initialContent?: string;

    /**
     * Whether the component is read-only
     */
    readOnly?: boolean;

    /**
     * Callback when content changes
     */
    onContentChange?: (content: string) => void;

    /**
     * Callback when the input loses focus
     */
    onBlur?: () => void;

    /**
     * Additional CSS class name
     */
    className?: string;
} 