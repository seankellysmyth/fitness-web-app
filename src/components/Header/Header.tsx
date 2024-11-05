import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/exercises">Exercises</Link></li>
                <li><Link to="/workouts">My Workouts</Link></li>
                <li><Link to="/email">Email</Link></li>
            </ul>
        </nav>
    );
};

export default Header;
