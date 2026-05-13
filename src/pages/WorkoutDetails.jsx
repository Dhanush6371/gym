import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Clock, Flame, TrendingUp } from 'lucide-react';
import { workouts, exercises } from '../data/mockData';
import { useApp } from '../context/AppContext';

const WorkoutDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { completeWorkout } = useApp();
    const workout = workouts.find(w => w.id === parseInt(id));

    if (!workout) {
        return <div>Workout not found</div>;
    }

    const workoutExercises = exercises.filter(e => workout.exercises.includes(e.id));

    const handleStartWorkout = () => {
        completeWorkout(workout);
        alert('Workout completed! +' + (workout.calories / 10) + ' XP');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-dark safe-top">
            <div className="max-w-lg mx-auto">
                {/* Hero Image */}
                <div className="relative h-72">
                    <img
                        src={workout.thumbnail}
                        alt={workout.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-4 left-4 p-2 glass rounded-xl touch-feedback z-10"
                    >
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </button>
                </div>

                <div className="px-4 -mt-16 relative z-10 pb-8">
                    {/* Main Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass p-6 rounded-3xl space-y-6 mb-6"
                    >
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">{workout.name}</h1>
                            <p className="text-gray-400">{workout.description}</p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="glass-dark p-3 rounded-xl text-center">
                                <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                                <p className="text-sm font-bold text-white">{workout.duration} min</p>
                            </div>
                            <div className="glass-dark p-3 rounded-xl text-center">
                                <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                                <p className="text-sm font-bold text-white">{workout.calories} cal</p>
                            </div>
                            <div className="glass-dark p-3 rounded-xl text-center">
                                <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-1" />
                                <p className="text-sm font-bold text-white">{workout.difficulty}</p>
                            </div>
                        </div>

                        {/* Trainer */}
                        <div className="flex items-center gap-3 glass-dark p-3 rounded-xl">
                            <img
                                src={workout.trainer.avatar}
                                alt={workout.trainer.name}
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <p className="text-xs text-gray-400">Trainer</p>
                                <p className="font-bold text-white">{workout.trainer.name}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Exercises */}
                    <div className="space-y-3 mb-6">
                        <h2 className="text-xl font-bold text-white px-2">Exercises</h2>
                        {workoutExercises.map((exercise, index) => (
                            <motion.div
                                key={exercise.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => navigate(`/exercise/${exercise.id}`)}
                                className="glass p-4 rounded-xl cursor-pointer touch-feedback"
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex gap-4">
                                    <img
                                        src={exercise.thumbnail}
                                        alt={exercise.name}
                                        className="w-20 h-20 rounded-xl object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-white mb-1">{exercise.name}</h3>
                                        <p className="text-sm text-gray-400 mb-2">{exercise.muscleGroup}</p>
                                        <div className="flex items-center gap-3 text-xs text-gray-500">
                                            <span>{exercise.sets} sets</span>
                                            <span>•</span>
                                            <span>{exercise.reps} reps</span>
                                            <span>•</span>
                                            <span>{exercise.restTime}s rest</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Start Button */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleStartWorkout}
                        className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-4 rounded-xl neon-glow flex items-center justify-center gap-2 touch-feedback"
                    >
                        <Play className="w-6 h-6" />
                        Start Workout
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default WorkoutDetails;
