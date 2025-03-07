'use client';

import { ClickDragContainerProps } from './interface';

export default function ClickDragContainer({
    children,
    onClick,
    componentId,
}: ClickDragContainerProps) {

    const handleClick = () => {
        onClick(componentId);
    };

    return (
        <div
            className={
                'cursor-pointer transition-colors duration-150 ease-in-out hover:bg-gray-100'
            }
            onClick={handleClick}
        >
            {children}
        </div>
    );
} 