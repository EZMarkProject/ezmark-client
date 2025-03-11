'use client'

import { type A4ExamPaperProps } from "./interface"
import DefaultHeader from "@/components/exam-header-templates";
import MultipleChoiceQuestion from "@/components/questions-type/multiple-choice-question";
import FillInBlankQuestion from "@/components/questions-type/fill-in-blank-question";
import { Blank } from "@/components/layout-components/Blank";
import { nanoid } from "nanoid";
import { OpenQuestion } from "@/components/questions-type/open-question";
import { Divider } from "@/components/layout-components/Divider";
import { ClickDragContainer } from "../ClickDragContainer";
import { useEffect, useRef } from "react";
import { ExamResponse, UnionComponent } from "@/types/exam";

const A4_WIDTH_MM = 210
const A4_HEIGHT_MM = 297
const BOTTOM_MARGIN_MM = 10
const MARGIN_TOP_MM = 8.5
const GAP_MM = 9

export function A4ExamPaper({
    exam,
    setExam,
    renderMode,
    scale = 1,
    onMCQQuestionChange,
    onMCQOptionChange,
    onFillInBlankContentChange,
    onOpenQuestionChange,
    handleComponentClick,
    handleComponentDelete,
}: A4ExamPaperProps) {
    const containerRef = useRef<HTMLDivElement>(null) // 这个ref是A4纸的容器
    const isUpdatingFromEffect = useRef(false); // 新增：用于标记是否是由effect本身引起的更新

    // 计算每一个组件相对于A4纸的相对位置，并更新到组件的position属性中
    useEffect(() => {
        // 如果正在从effect更新，则跳过此次执行
        if (isUpdatingFromEffect.current) {
            isUpdatingFromEffect.current = false;
            return;
        }

        if (containerRef.current) {
            console.log('Calculate position')
            const pages: string[][] = [[]] // 二维数组，每个子数组表示一页，用来计算分页
            let currentPageIndex = 0;
            let currentPageHeight = 0;
            // A4纸的rect
            const a4Rect = containerRef.current.getBoundingClientRect()
            // 计算pixel到mm的转换比例
            const pixelToMMRatio = A4_WIDTH_MM / a4Rect.width
            // 开始遍历所有components，计算position
            const allComponentsWithPosition = [...exam.examData.components].map(component => {
                // 获取组件的DOM元素
                const element = document.querySelector(`[data-component-id="${component.id}"]`)
                if (!element) return component;
                // 获取组件rect
                const rect = element.getBoundingClientRect()
                // 计算相对位置，并转换到mm
                const topMm = (rect.top - a4Rect.top) * pixelToMMRatio
                const leftMm = (rect.left - a4Rect.left) * pixelToMMRatio
                const widthMm = rect.width * pixelToMMRatio
                const heightMm = rect.height * pixelToMMRatio
                // 创建一个组件的副本，并更新position
                const componentWithPosition = {
                    ...component,
                    position: {
                        top: topMm,
                        left: leftMm,
                        width: widthMm,
                        height: heightMm,
                        pageIndex: currentPageIndex
                    }
                }
                // 检查当前页面是否还能容纳这个组件
                if ((currentPageHeight + heightMm) > (A4_HEIGHT_MM - BOTTOM_MARGIN_MM)) {
                    // 新建一页, 并把当前组件加入到新页中
                    currentPageIndex++;
                    pages.push([component.id])
                    currentPageHeight = heightMm + MARGIN_TOP_MM;
                    componentWithPosition.position.pageIndex = currentPageIndex;
                } else {
                    // 添加到当前页
                    pages[currentPageIndex].push(component.id)
                    currentPageHeight += heightMm + GAP_MM;
                }
                return componentWithPosition;
            })
            // 更新状态前设置标记
            isUpdatingFromEffect.current = true;
            // 更新状态
            const updatedExam: ExamResponse = {
                ...exam,
                examData: {
                    ...exam.examData,
                    components: allComponentsWithPosition as UnionComponent[]
                }
            }
            setExam(updatedExam)
        }
    }, [exam])

    // 计算总页数
    const totalPages = exam.examData.components.length > 0
        ? Math.max(...exam.examData.components.map(comp => comp.position?.pageIndex || 0)) + 1
        : 1;

    // 将组件按页码分组
    const pageComponents = Array.from({ length: totalPages }, (_, i) =>
        exam.examData.components.filter(comp => (comp.position?.pageIndex || 0) === i)
    );

    // 渲染组件函数
    const renderComponent = (item: UnionComponent) => {
        switch (item.type) {
            case 'default-header':
                return (
                    <ClickDragContainer
                        key={item.id}
                        componentId={item.id}
                        onDelete={handleComponentDelete}
                        onClick={() => {
                            handleComponentClick(item.id);
                        }}
                    >
                        <DefaultHeader
                            key={`header-${item.id}`}
                            exam={exam}
                        />
                    </ClickDragContainer>
                );
            case 'multiple-choice':
                return (
                    <ClickDragContainer
                        key={item.id}
                        componentId={item.id}
                        onDelete={handleComponentDelete}
                        onClick={() => {
                            handleComponentClick(item.id);
                        }}
                    >
                        <MultipleChoiceQuestion
                            questionObj={item}
                            onQuestionChange={onMCQQuestionChange}
                            onOptionChange={onMCQOptionChange}
                            renderMode={renderMode}
                            questionNumber={item.questionNumber}
                        />
                    </ClickDragContainer>
                );
            case 'fill-in-blank':
                return (
                    <ClickDragContainer
                        key={item.id}
                        componentId={item.id}
                        onDelete={handleComponentDelete}
                        onClick={() => {
                            handleComponentClick(item.id)
                        }}
                    >
                        <FillInBlankQuestion
                            key={`fill-${item.id}`}
                            questionObj={item}
                            onContentChange={onFillInBlankContentChange}
                            renderMode={renderMode}
                            questionNumber={item.questionNumber}
                        />
                    </ClickDragContainer>
                );
            case 'open':
                return (
                    <ClickDragContainer
                        key={item.id}
                        componentId={item.id}
                        onDelete={handleComponentDelete}
                        onClick={() => {
                            handleComponentClick(item.id)
                        }}
                    >
                        <OpenQuestion
                            key={`open-${item.id}`}
                            questionObj={item}
                            onContentChange={onOpenQuestionChange}
                            renderMode={renderMode}
                            questionNumber={item.questionNumber}
                        />
                    </ClickDragContainer>
                );
            case 'blank':
                return (
                    <ClickDragContainer
                        key={item.id}
                        componentId={item.id}
                        onDelete={handleComponentDelete}
                        onClick={() => {
                            handleComponentClick(item.id)
                        }}
                    >
                        <Blank
                            key={`blank-${item.id}`}
                            lines={item.lines}
                        />
                    </ClickDragContainer>
                );
            case 'divider':
                return (
                    <ClickDragContainer
                        key={item.id}
                        componentId={item.id}
                        onDelete={handleComponentDelete}
                        onClick={() => {
                            handleComponentClick(item.id)
                        }}
                    >
                        <Divider
                            key={`divider-${item.id}`}
                        />
                    </ClickDragContainer>
                );
            default:
                return <div className="text-red-500" key={nanoid()}>Component Not Found</div>
        }
    }

    return (
        <div
            style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top center',
                transition: 'transform 0.1s ease-out',
                width: 'fit-content',
                paddingTop: '1rem'
            }}
        >
            {/* 渲染多个A4页面 */}
            {pageComponents.map((components, pageIndex) => (
                <div
                    key={`page-${pageIndex}`}
                    ref={pageIndex === 0 ? containerRef : undefined}
                    className={`bg-background w-[${A4_WIDTH_MM}mm] h-[${A4_HEIGHT_MM}mm] mx-auto p-8 shadow-lg mb-8`}
                >
                    {components.map(item => renderComponent(item))}
                </div>
            ))}
        </div>
    )
} 