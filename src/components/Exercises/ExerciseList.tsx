import React, { useEffect, useState } from 'react';
import ExerciseTable from './ExerciseTable';

const ExerciseList: React.FC = () => {
    return (
        <div>
            <h1>Exercises</h1>
            <ExerciseTable canAddToWorkout={false} canAddNewExercises={true}/>
        </div>
    );
};

export default ExerciseList;