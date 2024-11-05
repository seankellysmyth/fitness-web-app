import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import ExerciseList from './components/Exercises/ExerciseList';
import MyWorkouts from './components/MyWorkouts/MyWorkouts';
import EmailForm from './components/Email/EmailForm';
import ExerciseApiClient from './api/ExerciseApiClient';
import DataService from './services/DataService';
import { IDataService } from './interfaces/IDataService';
import MyWorkoutsApiClient from './api/MyWorkoutsApiClient';
import './App.css';
import EditExercise from './components/Exercises/EditExercise';
import AddExercise from './components/Exercises/AddExercise';
import MyWorkoutsPage from './components/MyWorkouts/MyWorkoutsPage';

// Replace with the correct port
const exerciseApiClient = new ExerciseApiClient('http://localhost:0000/api'); 
const exerciseDataService: IDataService = new DataService(exerciseApiClient);

const myWorkoutApiClient = new MyWorkoutsApiClient('http://localhost:0000/api'); 
const myWorkoutDataService: IDataService = new DataService(myWorkoutApiClient);

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<ExerciseList />} />
          <Route path="/workouts" element={<MyWorkoutsPage />} />
          <Route path="/email" element={<EmailForm />} />
          <Route path="/edit-exercise/:id" element={<EditExercise />} />
          <Route path="/add-exercise" element={<AddExercise />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
