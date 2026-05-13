import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { workouts, moodWorkouts } from '../data/mockData';

const MoodSelector = () => {
    const navigate = useNavigate();
    const { updateMood } = useApp();
    const [selectedMood, setSelectedMood] = useState(null);

    const moods = [
        { emoji: '😴', label: 'Lazy', color: 'from-gray-500 to-gray-700', description: 'Light & Easy' },
        { emoji: '😤', label: 'Angry', color: 'from-red-500 to-red-700', description: 'Channel that rage' },
        { emoji: '💔', label: 'Heartbroken', color: 'from-pink-500 to-purple-700', description: 'Pain into power' },
        { emoji: '😎', label: 'Confident', color: 'from-blue-500 to-cyan-500', description: 'Show them who\'s boss' },
        { emoji: '🧠', label: 'Focused', color: 'from-purple-500 to-indigo-600', description: 'Mind & body' },
        { emoji: '🔥', label: 'Beast Mode', color: 'from-orange-500 to-red-600', description: 'Unleash the beast' },
    ];

    const handleMoodSelect = (mood) => {
        setSelectedMood(mood);
        updateMood(mood.label);

        // Get recommended workouts for this mood
        setTimeout(() => {
            const workoutIds = moodWorkouts[mood.label] || [];
            if (workoutIds.length > 0) {
                navigate(`/workout/${workoutIds[0]}`);
            } else {
                navigate('/workouts');
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-dark safe-top">
            <div className="max-w-lg mx-auto px-4 py-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 glass rounded-xl touch-feedback"
                    >
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-display font-black text-white">
                            How are you feeling?
                        </h1>
                        <p className="text-gray-400 text-sm">We'll match your vibe</p>
                    </div>
                </div>

                {/* Mood Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {moods.map((mood, index) => (
                        <motion.button
                            key={mood.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => handleMoodSelect(mood)}
                            className="relative glass p-6 rounded-2xl overflow-hidden touch-feedback"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {/* Background Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${mood.color} opacity-20`} />

                            {/* Content */}
                            <div className="relative text-center">
                                <motion.div
                                    className="text-6xl mb-3"
                                    animate={{
                                        scale: selectedMood?.label === mood.label ? [1, 1.2, 1] : 1,
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {mood.emoji}
                                </motion.div>
                                <h3 className="font-bold text-white mb-1">{mood.label}</h3>
                                <p className="text-xs text-gray-400">{mood.description}</p>
                            </div>

                            {/* Selection Effect */}
                            <AnimatePresence>
                                {selectedMood?.label === mood.label && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute inset-0 border-4 border-primary rounded-2xl"
                                    >
                                        <div className="absolute inset-0 bg-primary/20" />
                                        <motion.div
                                            className="absolute top-2 right-2"
                                            initial={{ rotate: 0 }}
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        >
                                            <Sparkles className="w-6 h-6 text-primary" />
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    ))}
                </div>

                {/* Info Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 glass-dark p-6 rounded-2xl"
                >
                    <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-primary mt-1" />
                        <div>
                            <h3 className="font-bold text-white mb-2">AI-Powered Matching</h3>
                            <p className="text-sm text-gray-400">
                                Our AI analyzes your mood and recommends the perfect workout to match your energy.
                                Whether you're feeling lazy or ready to destroy the gym, we've got you covered.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Loading State */}
                <AnimatePresence>
                    {selectedMood && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-dark/90 backdrop-blur-sm flex items-center justify-center z-50"
                        >
                            <div className="text-center">
                                <motion.div
                                    className="text-8xl mb-4"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 10, -10, 0],
                                    }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                >
                                    {selectedMood.emoji}
                                </motion.div>
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    Finding your perfect workout...
                                </h2>
                                <div className="flex justify-center gap-2">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="w-3 h-3 bg-primary rounded-full"
                                            animate={{
                                                scale: [1, 1.5, 1],
                                                opacity: [0.3, 1, 0.3],
                                            }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                delay: i * 0.2,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MoodSelector;
