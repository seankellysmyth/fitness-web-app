export interface IExerciseApiClient {
    get<T>(url: string): Promise<T>;
    getById<T>(url: string, id: number): Promise<T>;
    post<T>(url: string, data: any): Promise<T>;
    put<T>(url: string, data: any): Promise<T>;
    delete<T>(utl: string, id: number): Promise<T>;
}
