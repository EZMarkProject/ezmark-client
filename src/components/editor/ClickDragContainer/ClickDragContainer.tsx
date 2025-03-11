'use client';

import { ClickDragContainerProps } from './interface';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function ClickDragContainer({
    children,
    onClick,
    componentId,
    onDelete,
}: ClickDragContainerProps) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleClick = () => {
        onClick(componentId);
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowDeleteDialog(true);
    };

    const handleDeleteConfirm = () => {
        onDelete(componentId);
        setShowDeleteDialog(false);
    };

    return (
        <div
            className={
                'cursor-pointer relative group transition-colors duration-150 ease-in-out hover:bg-gray-100'
            }
            onClick={handleClick}
            data-component-id={componentId}
        >
            <div className="absolute opacity-0 group-hover:opacity-100 right-2 top-2 z-10 transition-all duration-200 transform scale-95 group-hover:scale-100">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-md hover:bg-red-200 hover:text-primary transition-colors"
                    onClick={handleDeleteClick}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
            {children}

            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete this item?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteConfirm}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
} 