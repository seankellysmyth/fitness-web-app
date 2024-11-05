import { IDataService } from "../interfaces/IDataService";
import { IExerciseApiClient } from "../interfaces/IExerciseApiClient";

class DataService implements IDataService {
    private exerciseApiClient: IExerciseApiClient;

    constructor(apiClient: IExerciseApiClient) {
        this.exerciseApiClient = apiClient;
    }

    async fetchData(): Promise<any> {
        return await this.exerciseApiClient.get<any>('/data');  //replace with my endpoint
    }
}

export default DataService;