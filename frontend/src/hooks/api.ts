import { useState, useEffect } from "react";
import { BasePlan, Plan } from "../types/plans";
import axios, { Axios, AxiosResponse } from "axios";
import { idText } from "typescript";


const API_URL: string = 'http://localhost:8000/api/plans';

const addDDay: (plan: BasePlan) => void = plan => {
    const now: number = new Date().getTime();
    const dDay: number = (new Date(plan.date).getTime() - now) / (1000 * 60 * 60 * 24);
    (plan as Plan).dDay = Number((dDay + 1).toFixed());
  }
  

export default function usePlans() {
    const [plans, setPlans] = useState<Plan[]>([]);


    const fetchPlans: () => void = async () => {
        const response: AxiosResponse<Plan[]> = 
        await axios.get(API_URL);
        const data = response.data;
        setPlans(data);
    };


    const updatePlan: (
        id: number,
        updatedPlan: Plan
    ) => void = async (id, updatedPlan) => {
        await axios.put(`${API_URL}/${id}`, updatedPlan);
        fetchPlans();
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    return {plans, updatePlan};
}