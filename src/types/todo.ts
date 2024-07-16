export interface Todo {
    id: number,
    text: string,
    completed: boolean,
    edit: boolean
}

export interface editPayload {
    id: number,
    editText: string
}