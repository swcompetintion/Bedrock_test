import React from "react";

import { Plan } from "./plans";
import { BasePlan } from "./plans";


export type BaseProps = {
    data: Plan[]
}

export type ScatterGraphProps = BaseProps & {
    onDragEnd: (id: number, updatedPlan: Plan) => void
};

export type TableProps = BaseProps;

export type DropdownProps = {
    categories: string[],
    category: string,
    onChange: (cat: string) => void
};

export type DotProps = {
    plan: Plan
};
