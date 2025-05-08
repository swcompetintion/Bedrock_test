export type BasePlan = {
    id: number,
    title: string,
    body: string,
    date: string,
    importance: number,
    category: string
}

export type Plan =  BasePlan & {
    dDay: number;
}
