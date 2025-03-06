// 定义试卷接口
export interface Exam {
    id: string;
    title: string;
    description: string;
    projectName: string; // 项目名称,会显示在dashboard中
    duration: string; // 3 HOURS
    university: string; // 大学名称
    course: string; // 课程名称
    year: string; // 2024-2025
    semester: string; // 学期 Spring
    createdAt: string; // 2024-01-01
    savedAt: string; // 最近保存时间 (19:28)
    examDate: string; // 考试日期
    components: UnionComponent[]; // 试卷中的所有组件
}

// 联合组建
export type UnionComponent =
    MultipleChoiceQuestionData
    | FillInBlankQuestionData
    | OpenQuestionData
    | BaseHeaderComponent
    | BlankComponent
    | DividerComponent

// 基础组件接口
export interface BaseComponent {
    id: string; // use uuid
    type: string; // 组件类型
}

// 定义基础题目接口
export interface BaseQuestion extends BaseComponent {
    type: QuestionType;
    score: number; // 每道题的分数
    questionNumber: number; // 题目编号
}

// 定义题目类型
export type QuestionType = 'multiple-choice' | 'fill-in-blank'

// 多选题接口
export interface MultipleChoiceQuestionData extends BaseQuestion {
    type: 'multiple-choice';
    question: string;
    options: MCQOption[];
    answer: string[]; // ['A', 'B'] 创建卷子的时候设定
}

// 多选题选项接口
export interface MCQOption {
    label: string;  // A, B, C, D
    content: string;
}

// 填空题接口
export interface FillInBlankQuestionData extends BaseQuestion {
    type: 'fill-in-blank';
    content: string;
    answer: string; // 创建卷子的时候设定
}

// 开放题接口
export interface OpenQuestionData extends BaseQuestion {
    type: 'open';
    content: string;
    lines: number; // 答题区域的行数
    answer: string; // 创建卷子的时候设定
}

// 布局组件类型
export type LayoutType = 'blank' | 'divider'

// 基础布局组件接口
export interface BaseLayoutComponent extends BaseComponent {
    type: LayoutType;
}

// 空白组件接口
export interface BlankComponent extends BaseLayoutComponent {
    type: 'blank';
    lines: number; // 空白行数
}

// 分割线组件接口
export interface DividerComponent extends BaseLayoutComponent {
    type: 'divider';
}

// 头部组件类型
export type HeaderType = 'default-header'

// 基础头部组件接口
export interface BaseHeaderComponent extends BaseComponent {
    type: HeaderType
}

