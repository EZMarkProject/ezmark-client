import { useRef, useState, useEffect } from 'react';
import katex from 'katex';
import Editor from './BaseEditor';

/**
 * 富文本输入组件
 */
const RichInput = ({
    initialContent = '',
    onContentChange = (text) => { },
    readOnly = false,
    onBlur = () => { },
    className = ''
}) => {
    // 保存原始HTML(包含LaTeX标记)
    const [rawHTML, setRawHTML] = useState(initialContent);
    const [showEditor, setShowEditor] = useState(false);
    const quillRef = useRef(null);
    const containerRef = useRef(null);

    // 处理文本变化
    const handleTextChange = () => {
        if (!quillRef.current) return;

        const html = quillRef.current.getSemanticHTML();
        setRawHTML(html);
        onContentChange?.(html);
    };

    // 点击内容区域显示编辑器
    const handleClickContent = () => {
        if (readOnly) return;

        setShowEditor(true);
        // 粘贴原始HTML内容到编辑器（包含LaTeX标记）
        setTimeout(() => {
            if (quillRef.current && rawHTML) {
                const quill = quillRef.current;
                quill.clipboard.dangerouslyPasteHTML(rawHTML);
            }
            quillRef.current?.focus();

            // 将光标设置到文本末尾
            if (quillRef.current) {
                const length = quillRef.current.getLength();
                quillRef.current.setSelection(length - 1, 0);
            }
        }, 0);
    };

    // 点击外部关闭编辑器
    useEffect(() => {
        if (!showEditor) return;
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowEditor(false);
                onBlur?.();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showEditor, onBlur]);

    // 渲染LaTeX公式
    const renderLatexFormulas = (html) => {
        if (!html) return '';
        return html.replace(
            /<span class="latex-formula">(.*?)<\/span>/g,
            (match, formula) => {
                try {
                    return katex.renderToString(formula, { displayMode: false });
                } catch (e) {
                    console.error('LaTeX渲染错误:', e);
                    return match;
                }
            }
        );
    };

    return (
        <div className={`rich-input-container ${className}`} ref={containerRef}>
            {showEditor ? (
                <Editor
                    ref={quillRef}
                    onTextChange={handleTextChange}
                    onBlur={onBlur}
                    readOnly={readOnly}
                />
            ) : (
                <div
                    className={`rich-input-content ${readOnly ? 'read-only' : ''}`}
                    onClick={handleClickContent}
                    dangerouslySetInnerHTML={{
                        __html: renderLatexFormulas(rawHTML)
                    }}
                />
            )}
        </div>
    );
};

export default RichInput; 