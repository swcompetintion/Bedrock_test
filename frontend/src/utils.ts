import internal from "stream";
import { Point } from "./types/points";
import { BasePlan, Plan } from "./types/plans";

const setCategories = (plans: Plan[]) => {
    return [
        'All',
        ...Array.from(new Set(plans.map((item => item.category))))
    ];
}


const matchCategoryData = (data: Plan[], category: string) => {
    data =
        category === 'All'
            ? data
            : data.filter(item => item.category === category);
    return data;
}


const point2UpdatedData = (point: Point) => {
    const updatedData: Plan = {
        id: point.id,
        title: point.title,
        body: point.body,
        importance: Math.round(point.y),
        dDay: Math.round(point.x),
        date: point.date,
        category: point.category
    };
    return updatedData;
}



export { setCategories, matchCategoryData, point2UpdatedData };
