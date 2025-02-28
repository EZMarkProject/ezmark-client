export interface SignUpFormProps {
    initialData?: {
        name?: string;
        email?: string;
    };
    onSubmit?: (data: {
        name: string;
        email: string;
        password: string;
    }) => Promise<void>;
} 