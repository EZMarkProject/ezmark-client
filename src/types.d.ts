export interface LoginResponse {
    jwt: string;
    user: {
        id: number;
        username: string;
        email: string;
        provider: string;
        confirmed: boolean;
        blocked: boolean;
        createdAt: string;
        updatedAt: string;
    };
}

export interface RegisterResponse {
    jwt: string;
    user: {
        id: number;
        username: string;
        email: string;
        provider: string;
        confirmed: boolean;
        blocked: boolean;
        createdAt: string;
        updatedAt: string;
    };
}

export interface ErrorResponse {
    error: {
        status: string; // HTTP status
        name: string; // Strapi error name ('ApplicationError' or 'ValidationError')
        message: string; // A human readable error message
        details: {
            [key: string]: string;
        };
    }
}


export interface AuthContextObject {
    authenticated: boolean;
    userName: string;
    email: string;
    jwt: string;
    setAuthenticated: (authenticated: boolean) => void;
    setJwt: (jwt: string) => void;
    setUserName: (userName: string) => void;
    setEmail: (email: string) => void;
}

// 定义试卷接口
export interface Exam {
    id: string;
    title: string;
    description: string;
    questions: Question[];
}

// 定义题目类型
export type QuestionType = 'multiple-choice' | 'fill-in-blank'

// 定义基础题目接口
export interface BaseQuestion {
    id: string; // use uuid
    type: QuestionType;
    score: number; // 每道题的分数
}

// 多选题接口
export interface MultipleChoiceQuestionData extends BaseQuestion {
    type: 'multiple-choice';
    question: string;
    options: MCQOption[];
    answer: string[]; // ['A', 'B'] 创建卷子的时候设定
}

// 多选题选项接口
export interface MCQOption {
    index: string;
    label: string;  // A, B, C, D
    content: string;
}

// 填空题接口
export interface FillInBlankQuestionData extends BaseQuestion {
    type: 'fill-in-blank';
    content: string;
    answer: string; // 创建卷子的时候设定
}

// 题目类型联合
export type Question = MultipleChoiceQuestionData | FillInBlankQuestionData;
