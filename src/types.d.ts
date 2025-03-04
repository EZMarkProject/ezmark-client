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



// 定义题目类型
export type QuestionType = 'multiple-choice' | 'fill-in-blank'

// 定义基础题目接口
export interface BaseQuestion {
    id: string;
    type: QuestionType;
    questionNumber: number;
}

// 多选题接口
export interface MultipleChoiceQuestionData extends BaseQuestion {
    type: 'multiple-choice';
    question: string;
    options: string[];
}

// 填空题接口
export interface FillInBlankQuestionData extends BaseQuestion {
    type: 'fill-in-blank';
    content: string;
}

// 题目类型联合
export type Question = MultipleChoiceQuestionData | FillInBlankQuestionData;