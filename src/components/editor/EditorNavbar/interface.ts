export interface EditorNavbarProps {
    exam: {
        projectName: string;
        updatedAt: string;
    };
    isSaved?: boolean;
    onSave: () => Promise<void>;
    onExportPDF: () => Promise<string>;
}