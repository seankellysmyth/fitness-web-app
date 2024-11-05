import { Workout } from "./Workout";

export interface WorkoutPlan {
    id: number;
    name: string;
    details: Workout[];
    detailsJson: string;
}

export {};
