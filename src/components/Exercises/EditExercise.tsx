import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ExerciseApiClient from '../../api/ExerciseApiClient';
import { Exercise } from '../../models/Exercise';

const apiClient = new ExerciseApiClient('https://localhost:7069/api'); // Replace with your actual API base URL

const EditExercise: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [exercise, setExercise] = useState<Exercise | null>(null);

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                if (id) {
                    const data = await apiClient.getById<Exercise>('/exercise', parseInt(id));
                    setExercise(data);
                }
                else{
                    // Handle error
                }
            } catch (error) {
                console.error('Error fetching exercise:', error);
            }
        };
        fetchExercise();
    }, [id]);

    const handleSave = async (event: React.FormEvent) => {
        event.preventDefault();
        if (exercise) {
            try {
                await apiClient.put(`/exercise`, exercise);
                navigate('/exercises');
            } catch (error) {
                console.error('Error updating exercise:', error);
            }
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (exercise) {
            setExercise({ ...exercise, [name]: value });
        }
    };

    return (
        <div>
            <h1>Edit Exercise</h1>
            {exercise && (
                <form onSubmit={handleSave}>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={exercise.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Muscle:</label>
                        <input type="text" name="muscle" value={exercise.muscle} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Type:</label>
                        <input type="text" name="type" value={exercise.type} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Equipment:</label>
                        <input type="text" name="equipment" value={exercise.equipment} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Difficulty:</label>
                        <input type="text" name="difficulty" value={exercise.difficulty} onChange={handleChange} required />
                    </div>
                    <button type="submit">Save</button>
                </form>
            )}
        </div>
    );
};

export default EditExercise;
