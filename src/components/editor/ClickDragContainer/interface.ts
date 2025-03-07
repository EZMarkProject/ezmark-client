import { ReactNode } from 'react';

export interface ClickDragContainerProps {
    children: ReactNode;
    onClick: (componentId: string) => void;
    componentId: string;
    // 将来可以添加拖拽相关属性
}