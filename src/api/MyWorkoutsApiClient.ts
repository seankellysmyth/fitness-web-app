import { IMyWorkoutsApiClient } from '../interfaces/IMyWorkoutsApiClient';

class MyWorkoutsApiClient implements IMyWorkoutsApiClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private async request<T>(url: string, options: RequestInit): Promise<T> {
        const response = await fetch(`${this.baseURL}${url}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseText = await response.text();
        if(!responseText) {
            throw new Error('Response body is empty');
        }

        try{
            return JSON.parse(responseText) as T;
        }
        catch(error){
            throw new Error('Failed to parse response body');
        }
    }

    async get<T>(url: string): Promise<T>{
        return this.request<T>(url, { method: 'GET' });
    }
    async getById<T>(url: string, id: number): Promise<T>{
        return this.request<T>(`${url}/${id}`, { method: 'GET' });
    }

    async post<T>(url: string, data: any): Promise<T> {
        return this.request<T>(url, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async put<T>(url: string, data: any): Promise<T> {
        return this.request<T>(url, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }
    async delete<T>(url: string, workoutPlanId: number): Promise<T> {
        return this.request<T>(`${url}`, { 
            method: 'DELETE',
            body: JSON.stringify(workoutPlanId),
        });
    }
}

export default MyWorkoutsApiClient;