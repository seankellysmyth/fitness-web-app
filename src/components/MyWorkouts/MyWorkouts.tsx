import React, { useEffect, useState } from 'react';
import { Accordion, Card, Button, Table } from 'react-bootstrap';
import { WorkoutPlan } from '../../models/WorkoutPlan';
import { Workout } from '../../models/Workout';
import MyWorkoutsApiClient from '../../api/MyWorkoutsApiClient';
import { useNavigate } from 'react-router-dom';


const MyWorkouts: React.FC = () => {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const navigate = useNavigate();
  const apiClient = new MyWorkoutsApiClient('http://localhost:7069/api');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:7069/api/workoutplan');

        if (!response.ok) {
            throw new Error('Failed to fetch exercises');
        }

        const data = await response.json() as WorkoutPlan[];

        // Parse the detailsJson into details for each WorkoutPlan
        const plans = data.map(plan => ({
          ...plan,
          details: JSON.parse(plan.detailsJson)
        }));
        setWorkoutPlans(plans);
      } catch (error) {
        console.error('Error fetching workout plans:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (workoutId: number) => {
    // Handle edit functionality here
    console.log(`Edit workout with id: ${workoutId}`);
  };

  const handleDelete = async (planId: number) => {
    try {
      await apiClient.delete(`/workoutplan`, planId);
      setWorkoutPlans(workoutPlans.filter(plan => plan.id !== planId));
    } catch (error) {
      console.error('Error deleting workout plan:', error);
    }
  };

  return (
    <div>
      <h1>My Workouts</h1>
      <Accordion>
        {workoutPlans.map((plan, index) => (
          <Card key={plan.id}>
            <Accordion.Header as={Card.Header} eventKey={String(index)}>
              {plan.name}
            </Accordion.Header>
            <Accordion.Collapse eventKey={String(index)}>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Exercise ID</th>
                      <th>Sets</th>
                      <th>Rep Range</th>
                      <th>Training Type</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan.details.map((workout: Workout) => (
                      <tr key={workout.id}>
                        <td>{workout.exerciseId}</td>
                        <td>{workout.sets}</td>
                        <td>{workout.repRange}</td>
                        <td>{workout.trainingType}</td>
                        <td>
                          <Button variant="warning" onClick={() => handleEdit(workout.id)}>Edit</Button>
                          <Button variant="danger" onClick={() => handleDelete(plan.id)}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </div>
  );
};

export default MyWorkouts;
