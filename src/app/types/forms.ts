export type Form = {
    id?: number
    name?: string
    orders_types_id?: number
    description: string
    subscribers_id?: number
    questions: Question[]
}

export type Question = {
    id?: number
    name: string
    description: string
    required: number
    question_type_id: number
    questionType?: QuestionType
    responses?: string[] | Array<{
        id: number
        value: string
    }>    
}

export type QuestionType = {
    id?: number
    name: string
    description: string
}