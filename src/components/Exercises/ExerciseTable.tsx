import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseApiClient from '../../api/ExerciseApiClient';
import { Exercise } from '../../models/Exercise';

const ExerciseTable: React.FC<{ canAddToWorkout: boolean, canAddNewExercises: boolean }> = ({ canAddToWorkout, canAddNewExercises }) => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const navigate = useNavigate();
    const apiClient = new ExerciseApiClient('https://localhost:7069/api');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7069/api/exercise');
                if (!response.ok) {
                    throw new Error('Failed to fetch exercises');
                }
                const data = await response.json() as Exercise[];
                setExercises(data);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };
        fetchData();
    }, [apiClient]);

    const handleDelete = async (id: number) => {
        try {
            await apiClient.delete(`/exercise`, id);
            setExercises(exercises.filter(exercise => exercise.exerciseId !== id));
        } catch (error) {
            console.error('Error deleting exercise:', error);
        }
    };

    const handleEdit = (id: number) => {
        navigate(`/edit-exercise/${id}`);
    };

    const handleAdd = () => {
        navigate('/add-exercise');
    };

    return (
        <div>
            {canAddNewExercises && <button onClick={handleAdd}>Add</button>}
            <table>
                <thead>
                    <tr>
                        {canAddToWorkout && <th>Select</th>}
                        <th>Name</th>
                        <th>Muscle</th>
                        <th>Type</th>
                        <th>Equipment</th>
                        <th>Difficulty</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((exercise) => (
                        <tr key={exercise.exerciseId}>
                            {canAddToWorkout && <td><input type="checkbox" /></td>}
                            <td>{exercise.name}</td>
                            <td>{exercise.muscle}</td>
                            <td>{exercise.type}</td>
                            <td>{exercise.equipment}</td>
                            <td>{exercise.difficulty}</td>
                            <td>
                                <button onClick={() => handleEdit(exercise.exerciseId ?? 0)}>Edit</button>
                                <button onClick={() => handleDelete(exercise.exerciseId ?? 0)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExerciseTable;
