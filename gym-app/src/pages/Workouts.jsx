import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock, Flame, TrendingUp, X, Heart, Zap, ArrowUp } from 'lucide-react';
import { workouts } from '../data/mockData';

const Workouts = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [savedWorkouts, setSavedWorkouts] = useState([]);

    const currentWorkout = workouts[currentIndex];
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

    const handleDragEnd = (event, info) => {
        if (info.offset.x > 100) {
            // Swipe right - Save
            handleSave();
        } else if (info.offset.x < -100) {
            // Swipe left - Skip
            handleSkip();
        } else if (info.offset.y < -100) {
            // Swipe up - Start workout
            handleStart();
        }
    };

    const handleSave = () => {
        setSavedWorkouts([...savedWorkouts, currentWorkout.id]);
        nextWorkout();
    };

    const handleSkip = () => {
        nextWorkout();
    };

    const handleStart = () => {
        navigate(`/workout/${currentWorkout.id}`);
    };

    const nextWorkout = () => {
        if (currentIndex < workouts.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner':
                return 'text-green-500';
            case 'Intermediate':
                return 'text-yellow-500';
            case 'Advanced':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <div className="min-h-screen bg-dark safe-top relative overflow-hidden">
            {/* Header */}
            <div className="max-w-lg mx-auto px-4 py-6">
                <h1 className="text-3xl font-display font-black text-white mb-2">
                    Discover <span className="gradient-text">Workouts</span>
                </h1>
                <p className="text-gray-400 text-sm">Swipe to find your perfect match</p>
            </div>

            {/* Swipe Instructions */}
            <div className="max-w-lg mx-auto px-4 mb-4">
                <div className="glass-dark p-3 rounded-xl flex items-center justify-around text-xs">
                    <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-red-500" />
                        <span className="text-gray-400">Skip</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ArrowUp className="w-4 h-4 text-primary" />
                        <span className="text-gray-400">Start</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-pink-500" />
                        <span className="text-gray-400">Save</span>
                    </div>
                </div>
            </div>

            {/* Workout Cards Stack */}
            <div className="relative h-[500px] max-w-lg mx-auto px-4">
                {workouts.slice(currentIndex, currentIndex + 3).map((workout, index) => {
                    const isTop = index === 0;

                    return (
                        <motion.div
                            key={workout.id}
                            className="absolute inset-0"
                            style={{
                                zIndex: workouts.length - index,
                                x: isTop ? x : 0,
                                rotate: isTop ? rotate : 0,
                                opacity: isTop ? opacity : 1,
                                scale: 1 - index * 0.05,
                                y: index * 10,
                            }}
                            drag={isTop ? true : false}
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            dragElastic={1}
                            onDragEnd={isTop ? handleDragEnd : undefined}
                            whileTap={isTop ? { scale: 1.05 } : {}}
                        >
                            <div className="glass rounded-3xl overflow-hidden h-full relative">
                                {/* Workout Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={workout.thumbnail}
                                        alt={workout.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />

                                    {/* Difficulty Badge */}
                                    <div className="absolute top-4 right-4">
                                        <div className={`glass px-3 py-1 rounded-full ${getDifficultyColor(workout.difficulty)}`}>
                                            <span className="text-xs font-bold">{workout.difficulty}</span>
                                        </div>
                                    </div>

                                    {/* Mood Badge */}
                                    <div className="absolute top-4 left-4">
                                        <div className="glass px-3 py-1 rounded-full">
                                            <span className="text-xs font-bold text-primary">{workout.mood}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Workout Info */}
                                <div className="p-6 space-y-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-2">{workout.name}</h2>
                                        <p className="text-gray-400 text-sm">{workout.description}</p>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="glass-dark p-3 rounded-xl text-center">
                                            <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                                            <p className="text-xs text-gray-400">Duration</p>
                                            <p className="text-sm font-bold text-white">{workout.duration} min</p>
                                        </div>
                                        <div className="glass-dark p-3 rounded-xl text-center">
                                            <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                                            <p className="text-xs text-gray-400">Calories</p>
                                            <p className="text-sm font-bold text-white">{workout.calories}</p>
                                        </div>
                                        <div className="glass-dark p-3 rounded-xl text-center">
                                            <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-1" />
                                            <p className="text-xs text-gray-400">Category</p>
                                            <p className="text-sm font-bold text-white">{workout.category}</p>
                                        </div>
                                    </div>

                                    {/* Trainer */}
                                    <div className="flex items-center gap-3 glass-dark p-3 rounded-xl">
                                        <img
                                            src={workout.trainer.avatar}
                                            alt={workout.trainer.name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <p className="text-xs text-gray-400">Trainer</p>
                                            <p className="text-sm font-bold text-white">{workout.trainer.name}</p>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {workout.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full font-medium"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Action Buttons */}
            <div className="max-w-lg mx-auto px-4 mt-8 pb-8">
                <div className="flex items-center justify-center gap-6">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={handleSkip}
                        className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center touch-feedback"
                    >
                        <X className="w-8 h-8 text-red-500" />
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={handleStart}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center neon-glow touch-feedback"
                    >
                        <Zap className="w-10 h-10 text-white" />
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={handleSave}
                        className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center touch-feedback"
                    >
                        <Heart className="w-8 h-8 text-pink-500" />
                    </motion.button>
                </div>
            </div>

            {/* Progress Indicator */}
            <div className="max-w-lg mx-auto px-4 pb-4">
                <div className="flex items-center justify-center gap-1">
                    {workouts.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1 rounded-full transition-all ${index === currentIndex
                                    ? 'w-8 bg-primary'
                                    : index < currentIndex
                                        ? 'w-1 bg-primary/50'
                                        : 'w-1 bg-gray-700'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Workouts;
