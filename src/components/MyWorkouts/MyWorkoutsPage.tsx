import React, { useEffect, useState } from 'react';
import MyWorkoutsApiClient from '../../api/MyWorkoutsApiClient';
import ExerciseTable from '../Exercises/ExerciseTable';
import { WorkoutPlan } from '../../models/WorkoutPlan';
import { Workout } from '../../models/Workout';
import { Exercise } from '../../models/Exercise';

const apiClient = new MyWorkoutsApiClient('https://localhost:7069/api');

const MyWorkoutsPage: React.FC = () => {
    const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
    const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState<WorkoutPlan | null>(null);
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    useEffect(() => {
        const fetchWorkoutPlans = async () => {
            try {
                const response = await fetch('https://localhost:7069/api/workoutplan');
                const data: WorkoutPlan[] = await response.json();
                setWorkoutPlans(data);
            } catch (error) {
                console.error('Error fetching workout plans:', error);
            }
        };
        fetchWorkoutPlans();
    }, []);

    useEffect(() => {
        const fetchWorkouts = async () => {
            if (selectedWorkoutPlan) {
                try {
                    const data = await apiClient.getById<Workout[]>(`/workoutplans/${selectedWorkoutPlan.id}/workouts`, selectedWorkoutPlan.id);
                    setWorkouts(data);
                } catch (error) {
                    console.error('Error fetching workouts:', error);
                }
            }
        };
        fetchWorkouts();
    }, [selectedWorkoutPlan]);

    const handleSelectWorkoutPlan = (workoutPlan: WorkoutPlan) => {
        setSelectedWorkoutPlan(workoutPlan);
    };

    return (
        <div>
            <h1>My Workout Plans</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workoutPlans.map((plan) => (
                            <tr key={plan.id} onClick={() => handleSelectWorkoutPlan(plan)}>
                                <td>{plan.name}</td>
                                <td>{plan.detailsJson}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ display: 'flex', marginTop: '20px' }}>
                <div style={{ flex: 1, marginRight: '20px' }}>
                    <h2>Workouts</h2>
                    {selectedWorkoutPlan ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Exercise ID</th>
                                    <th>Sets</th>
                                    <th>Rep Range</th>
                                    <th>Training Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {workouts.map((workout) => (
                                    <tr key={workout.id}>
                                        <td>{workout.exerciseId}</td>
                                        <td>{workout.sets}</td>
                                        <td>{workout.repRange}</td>
                                        <td>{workout.trainingType}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Select a workout plan to see the workouts</p>
                    )}
                </div>
                <div style={{ flex: 1 }}>
                    <h2>Exercises</h2>
                    <ExerciseTable canAddToWorkout={true} canAddNewExercises={false} />
                </div>
            </div>
        </div>
    );
};

export default MyWorkoutsPage;
