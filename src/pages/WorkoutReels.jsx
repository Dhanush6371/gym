import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Heart,
    MessageCircle,
    Share2,
    Bookmark,
    Play,
    Pause,
    Volume2,
    VolumeX,
    ArrowLeft,
    Flame,
    Trophy,
    TrendingUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useIsDesktop } from '../hooks/useMediaQuery';

// Mock workout video data with real exercise videos
const workoutReels = [
    {
        id: 1,
        user: {
            name: "Alex Thunder",
            avatar: "https://i.pravatar.cc/150?img=12",
            level: 24,
        },
        videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4?autoplay=1&mute=1&controls=0&loop=1&playlist=IODxDxX7oi4",
        thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600",
        title: "Beast Mode Deadlift Session 🔥",
        description: "180kg PR! New personal record unlocked!",
        exercise: "Deadlift",
        stats: {
            weight: "180kg",
            reps: 5,
            sets: 3,
            calories: 450,
        },
        likes: 234,
        comments: 45,
        date: "2 hours ago",
        tags: ["#BeastMode", "#Deadlift", "#PR"],
    },
    {
        id: 2,
        user: {
            name: "Sarah Storm",
            avatar: "https://i.pravatar.cc/150?img=5",
            level: 18,
        },
        videoUrl: "https://www.youtube.com/embed/gC_L9qAHVJ8?autoplay=1&mute=1&controls=0&loop=1&playlist=gC_L9qAHVJ8",
        thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600",
        title: "Morning HIIT Cardio 💪",
        description: "30 min intense cardio to start the day right!",
        exercise: "HIIT",
        stats: {
            duration: "30 min",
            calories: 520,
            heartRate: "165 bpm",
        },
        likes: 189,
        comments: 32,
        date: "5 hours ago",
        tags: ["#HIIT", "#Cardio", "#MorningWorkout"],
    },
    {
        id: 3,
        user: {
            name: "Mike Tyson Jr.",
            avatar: "https://i.pravatar.cc/150?img=33",
            level: 35,
        },
        videoUrl: "https://www.youtube.com/embed/rT7DgCr-3pg?autoplay=1&mute=1&controls=0&loop=1&playlist=rT7DgCr-3pg",
        thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600",
        title: "Chest Day Perfection 💯",
        description: "Form check: Bench press technique breakdown",
        exercise: "Bench Press",
        stats: {
            weight: "120kg",
            reps: 8,
            sets: 4,
            calories: 380,
        },
        likes: 456,
        comments: 78,
        date: "1 day ago",
        tags: ["#ChestDay", "#BenchPress", "#FormCheck"],
    },
    {
        id: 4,
        user: {
            name: "Alex Thunder",
            avatar: "https://i.pravatar.cc/150?img=12",
            level: 24,
        },
        videoUrl: "https://www.youtube.com/embed/ultWZbUMPL8?autoplay=1&mute=1&controls=0&loop=1&playlist=ultWZbUMPL8",
        thumbnail: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600",
        title: "Leg Day Destroyer 🦵",
        description: "Squat form tutorial - 150kg working sets",
        exercise: "Squats",
        stats: {
            weight: "150kg",
            reps: 10,
            sets: 5,
            calories: 490,
        },
        likes: 312,
        comments: 56,
        date: "2 days ago",
        tags: ["#LegDay", "#Squats", "#FormTutorial"],
    },
    {
        id: 5,
        user: {
            name: "Emma Warrior",
            avatar: "https://i.pravatar.cc/150?img=9",
            level: 22,
        },
        videoUrl: "https://www.youtube.com/embed/dZgVxmf6jkA?autoplay=1&mute=1&controls=0&loop=1&playlist=dZgVxmf6jkA",
        thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600",
        title: "Burpee Challenge Complete! 🎯",
        description: "100 burpees in 10 minutes. Challenge accepted!",
        exercise: "Burpees",
        stats: {
            reps: 100,
            duration: "10 min",
            calories: 650,
        },
        likes: 523,
        comments: 92,
        date: "3 days ago",
        tags: ["#BurpeeChallenge", "#Cardio", "#Challenge"],
    },
];

const WorkoutReels = () => {
    const navigate = useNavigate();
    const { currentUser, addXP } = useApp();
    const isDesktop = useIsDesktop();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startY, setStartY] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [liked, setLiked] = useState({});
    const [saved, setSaved] = useState({});
    const videoRefs = useRef([]);

    const currentReel = workoutReels[currentIndex];

    // Handle swipe
    const handleTouchStart = (e) => {
        setStartY(e.touches[0].clientY);
    };

    const handleTouchEnd = (e) => {
        const endY = e.changedTouches[0].clientY;
        const diff = startY - endY;

        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentIndex < workoutReels.length - 1) {
                // Swipe up - next video
                setCurrentIndex(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe down - previous video
                setCurrentIndex(currentIndex - 1);
            }
        }
    };

    const handleLike = (id) => {
        setLiked(prev => ({ ...prev, [id]: !prev[id] }));
        if (!liked[id]) {
            addXP(5); // Reward for engagement
        }
    };

    const handleSave = (id) => {
        setSaved(prev => ({ ...prev, [id]: !prev[id] }));
    };

    // Keyboard navigation for desktop
    useEffect(() => {
        if (!isDesktop) return;

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp' && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            } else if (e.key === 'ArrowDown' && currentIndex < workoutReels.length - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, isDesktop]);

    return (
        <div
            className={`bg-black overflow-hidden ${isDesktop ? 'h-[calc(100vh-6rem)] rounded-2xl' : 'fixed inset-0'}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className={`${isDesktop ? 'absolute' : 'fixed'} top-6 left-4 z-50 p-3 glass rounded-full ${isDesktop ? 'hover:bg-white/20' : 'touch-feedback'}`}
            >
                <ArrowLeft className="w-6 h-6 text-white" />
            </button>

            {/* Mute Toggle */}
            <button
                onClick={() => setIsMuted(!isMuted)}
                className={`${isDesktop ? 'absolute' : 'fixed'} top-6 right-4 z-50 p-3 glass rounded-full ${isDesktop ? 'hover:bg-white/20' : 'touch-feedback'}`}
            >
                {isMuted ? (
                    <VolumeX className="w-6 h-6 text-white" />
                ) : (
                    <Volume2 className="w-6 h-6 text-white" />
                )}
            </button>

            {/* Desktop Navigation Arrows */}
            {isDesktop && (
                <>
                    {currentIndex > 0 && (
                        <button
                            onClick={() => setCurrentIndex(currentIndex - 1)}
                            className="absolute left-1/2 top-4 -translate-x-1/2 z-50 p-3 glass rounded-full hover:bg-white/20 transition-colors"
                        >
                            <motion.div
                                animate={{ y: [-3, 0, -3] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                ▲
                            </motion.div>
                        </button>
                    )}
                    {currentIndex < workoutReels.length - 1 && (
                        <button
                            onClick={() => setCurrentIndex(currentIndex + 1)}
                            className="absolute left-1/2 bottom-4 -translate-x-1/2 z-50 p-3 glass rounded-full hover:bg-white/20 transition-colors"
                        >
                            <motion.div
                                animate={{ y: [0, 3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                ▼
                            </motion.div>
                        </button>
                    )}
                </>
            )}

            {/* Video Container */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                >
                    {/* Video Background */}
                    <div className="absolute inset-0">
                        <iframe
                            src={currentReel.videoUrl}
                            className="w-full h-full object-cover"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            style={{ border: 'none' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                    </div>

                    {/* Content Overlay */}
                    <div className={`relative h-full flex flex-col justify-end ${isDesktop ? 'p-8 pb-12' : 'p-6 pb-24'}`}>
                        {/* User Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-3 mb-4"
                        >
                            <img
                                src={currentReel.user.avatar}
                                alt={currentReel.user.name}
                                className="w-12 h-12 rounded-full border-2 border-primary"
                            />
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-white">{currentReel.user.name}</p>
                                    <div className="px-2 py-0.5 bg-primary/20 rounded-full">
                                        <span className="text-xs text-primary font-bold">L{currentReel.user.level}</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400">{currentReel.date}</p>
                            </div>
                            <button className="ml-auto px-4 py-1.5 bg-primary rounded-full text-white text-sm font-bold">
                                Follow
                            </button>
                        </motion.div>

                        {/* Title & Description */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mb-4"
                        >
                            <h2 className="text-xl font-bold text-white mb-2">{currentReel.title}</h2>
                            <p className="text-sm text-gray-300 mb-3">{currentReel.description}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {currentReel.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="text-xs text-primary font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Stats Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="grid grid-cols-3 gap-3 mb-4"
                        >
                            {Object.entries(currentReel.stats).map(([key, value], index) => (
                                <div key={index} className="glass-dark p-3 rounded-xl text-center">
                                    <p className="text-xs text-gray-400 capitalize mb-1">{key}</p>
                                    <p className="text-sm font-bold text-white">{value}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Side Actions */}
                    <div className={`absolute right-4 ${isDesktop ? 'bottom-12' : 'bottom-32'} flex flex-col gap-6`}>
                        {/* Like */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleLike(currentReel.id)}
                            className="flex flex-col items-center gap-1"
                        >
                            <div className={`p-3 rounded-full ${liked[currentReel.id] ? 'bg-red-500' : 'glass'}`}>
                                <Heart
                                    className={`w-7 h-7 ${liked[currentReel.id] ? 'text-white fill-white' : 'text-white'}`}
                                />
                            </div>
                            <span className="text-xs text-white font-bold">
                                {currentReel.likes + (liked[currentReel.id] ? 1 : 0)}
                            </span>
                        </motion.button>

                        {/* Comment */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="flex flex-col items-center gap-1"
                        >
                            <div className="p-3 glass rounded-full">
                                <MessageCircle className="w-7 h-7 text-white" />
                            </div>
                            <span className="text-xs text-white font-bold">{currentReel.comments}</span>
                        </motion.button>

                        {/* Save */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleSave(currentReel.id)}
                            className="flex flex-col items-center gap-1"
                        >
                            <div className={`p-3 rounded-full ${saved[currentReel.id] ? 'bg-primary' : 'glass'}`}>
                                <Bookmark
                                    className={`w-7 h-7 ${saved[currentReel.id] ? 'text-white fill-white' : 'text-white'}`}
                                />
                            </div>
                        </motion.button>

                        {/* Share */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="flex flex-col items-center gap-1"
                        >
                            <div className="p-3 glass rounded-full">
                                <Share2 className="w-7 h-7 text-white" />
                            </div>
                        </motion.button>
                    </div>

                    {/* Progress Indicator */}
                    <div className="absolute top-20 left-0 right-0 flex justify-center gap-1 px-4">
                        {workoutReels.map((_, index) => (
                            <div
                                key={index}
                                className={`h-1 flex-1 rounded-full transition-all ${index === currentIndex
                                    ? 'bg-primary'
                                    : index < currentIndex
                                        ? 'bg-primary/50'
                                        : 'bg-white/30'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Swipe Hint */}
                    {currentIndex === 0 && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 0 }}
                            transition={{ delay: 3, duration: 1 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
                        >
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-white text-sm font-medium glass px-4 py-2 rounded-full"
                            >
                                Swipe up for next video
                            </motion.div>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default WorkoutReels;
