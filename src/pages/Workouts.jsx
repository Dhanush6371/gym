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
            <div className="relative h-[520px] max-w-lg mx-auto px-4">
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
                            dragElastic={0.7}
                            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                            onDragEnd={isTop ? handleDragEnd : undefined}
                            whileTap={isTop ? { scale: 1.02 } : {}}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <div className="glass rounded-3xl overflow-hidden h-full relative flex flex-col">
                                {/* Workout Image */}
                                <div className="relative h-52 overflow-hidden flex-shrink-0">
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
                                <div className="p-5 space-y-3 flex-1 flex flex-col overflow-y-auto">
                                    <div className="flex-shrink-0">
                                        <h2 className="text-xl font-bold text-white mb-1.5 leading-tight">{workout.name}</h2>
                                        <p className="text-gray-400 text-xs line-clamp-2">{workout.description}</p>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-2 flex-shrink-0">
                                        <div className="glass-dark p-2.5 rounded-xl text-center">
                                            <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                                            <p className="text-[10px] text-gray-400 mb-0.5">Duration</p>
                                            <p className="text-xs font-bold text-white">{workout.duration} min</p>
                                        </div>
                                        <div className="glass-dark p-2.5 rounded-xl text-center">
                                            <Flame className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                                            <p className="text-[10px] text-gray-400 mb-0.5">Calories</p>
                                            <p className="text-xs font-bold text-white">{workout.calories}</p>
                                        </div>
                                        <div className="glass-dark p-2.5 rounded-xl text-center">
                                            <TrendingUp className="w-4 h-4 text-green-500 mx-auto mb-1" />
                                            <p className="text-[10px] text-gray-400 mb-0.5">Category</p>
                                            <p className="text-xs font-bold text-white truncate">{workout.category}</p>
                                        </div>
                                    </div>

                                    {/* Trainer */}
                                    <div className="flex items-center gap-2.5 glass-dark p-2.5 rounded-xl flex-shrink-0">
                                        <img
                                            src={workout.trainer.avatar}
                                            alt={workout.trainer.name}
                                            className="w-9 h-9 rounded-full"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] text-gray-400">Trainer</p>
                                            <p className="text-xs font-bold text-white truncate">{workout.trainer.name}</p>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5 flex-shrink-0 pb-2">
                                        {workout.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2.5 py-0.5 bg-primary/20 text-primary text-[10px] rounded-full font-medium"
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
