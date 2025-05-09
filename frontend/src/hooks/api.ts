import { useState, useEffect } from "react";
import { BasePlan, Plan } from "../types/plans";
import axios, { Axios, AxiosResponse } from "axios";
import { idText } from "typescript";


const API_URL: string = 'http://localhost:8000/api/plans';
  

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