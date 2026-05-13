import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, Flame, Calendar as CalendarIcon, Play, X } from 'lucide-react';
import { classes } from '../data/mockData';

const Schedule = () => {
    const navigate = useNavigate();
    const [selectedVideo, setSelectedVideo] = useState(null);

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner':
                return 'bg-green-500/20 text-green-500';
            case 'Intermediate':
                return 'bg-yellow-500/20 text-yellow-500';
            case 'Advanced':
                return 'bg-red-500/20 text-red-500';
            default:
                return 'bg-gray-500/20 text-gray-500';
        }
    };

    const getCapacityColor = (enrolled, capacity) => {
        const percentage = (enrolled / capacity) * 100;
        if (percentage >= 90) return 'text-red-500';
        if (percentage >= 70) return 'text-yellow-500';
        return 'text-green-500';
    };

    // Add video URLs to classes
    const classesWithVideos = [
        { ...classes[0], videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4" },
        { ...classes[1], videoUrl: "https://www.youtube.com/embed/gC_L9qAHVJ8" },
        { ...classes[2], videoUrl: "https://www.youtube.com/embed/dZgVxmf6jkA" },
        { ...classes[3], videoUrl: "https://www.youtube.com/embed/v7AYKMP6rOE" },
        { ...classes[4], videoUrl: "https://www.youtube.com/embed/rT7DgCr-3pg" },
        { ...classes[5], videoUrl: "https://www.youtube.com/embed/v7AYKMP6rOE" },
    ];

    const handleVideoPreview = (e, cls) => {
        e.stopPropagation();
        setSelectedVideo(cls);
    };

    return (
        <div className="min-h-screen bg-dark safe-top">
            <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl font-display font-black text-white mb-2">
                        Class <span className="gradient-text">Schedule</span>
                    </h1>
                    <p className="text-gray-400">Preview classes before booking</p>
                </motion.div>

                {/* Today's Classes */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <CalendarIcon className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-bold text-white">Today - May 14</h2>
                    </div>

                    <div className="space-y-3">
                        {classesWithVideos.filter(c => c.date === '2026-05-14').map((cls, index) => (
                            <motion.div
                                key={cls.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass rounded-2xl overflow-hidden"
                            >
                                {/* Video Thumbnail with Play Button */}
                                <div
                                    className="relative h-48 cursor-pointer group"
                                    onClick={(e) => handleVideoPreview(e, cls)}
                                >
                                    <img
                                        src={cls.thumbnail || `https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600`}
                                        alt={cls.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                    {/* Play Button Overlay */}
                                    <motion.div
                                        className="absolute inset-0 flex items-center justify-center"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center neon-glow group-hover:bg-primary transition-colors">
                                            <Play className="w-8 h-8 text-white ml-1" />
                                        </div>
                                    </motion.div>

                                    {/* Difficulty Badge */}
                                    <div className="absolute top-3 right-3">
                                        <span className={`text-xs px-3 py-1 rounded-full font-bold ${getDifficultyColor(cls.difficulty)}`}>
                                            {cls.difficulty}
                                        </span>
                                    </div>

                                    {/* Category Badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className="text-xs px-3 py-1 rounded-full font-bold bg-primary/20 text-primary">
                                            {cls.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Class Info */}
                                <div
                                    className="p-4 cursor-pointer"
                                    onClick={() => navigate(`/class/${cls.id}`)}
                                >
                                    <div className="flex gap-4 mb-3">
                                        {/* Time */}
                                        <div className="flex flex-col items-center justify-center bg-primary/20 rounded-xl px-3 py-2 min-w-[70px]">
                                            <span className="text-2xl font-bold text-primary">
                                                {cls.time.split(':')[0]}
                                            </span>
                                            <span className="text-xs text-primary">
                                                {cls.time.split(' ')[1]}
                                            </span>
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1">
                                            <h3 className="font-bold text-white text-lg mb-1">{cls.name}</h3>

                                            {/* Trainer */}
                                            <div className="flex items-center gap-2 mb-2">
                                                <img
                                                    src={cls.trainer.avatar}
                                                    alt={cls.trainer.name}
                                                    className="w-6 h-6 rounded-full"
                                                />
                                                <span className="text-sm text-gray-400">{cls.trainer.name}</span>
                                            </div>

                                            {/* Stats */}
                                            <div className="flex items-center gap-4 text-xs">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4 text-gray-400" />
                                                    <span className="text-gray-400">{cls.duration} min</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Flame className="w-4 h-4 text-orange-500" />
                                                    <span className="text-gray-400">{cls.calories} cal</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users className={`w-4 h-4 ${getCapacityColor(cls.enrolled, cls.capacity)}`} />
                                                    <span className={getCapacityColor(cls.enrolled, cls.capacity)}>
                                                        {cls.enrolled}/{cls.capacity}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Book Button */}
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/class/${cls.id}`);
                                        }}
                                        className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-3 rounded-xl"
                                    >
                                        Book This Class
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Weekend Classes */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <CalendarIcon className="w-5 h-5 text-purple-500" />
                        <h2 className="text-xl font-bold text-white">This Weekend</h2>
                    </div>

                    <div className="space-y-3">
                        {classesWithVideos.filter(c => c.date !== '2026-05-14').map((cls, index) => (
                            <motion.div
                                key={cls.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (index + 4) * 0.1 }}
                                className="glass rounded-2xl overflow-hidden"
                            >
                                {/* Video Thumbnail */}
                                <div
                                    className="relative h-48 cursor-pointer group"
                                    onClick={(e) => handleVideoPreview(e, cls)}
                                >
                                    <img
                                        src={cls.thumbnail || `https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600`}
                                        alt={cls.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                    <motion.div
                                        className="absolute inset-0 flex items-center justify-center"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <div className="w-16 h-16 bg-purple-500/90 rounded-full flex items-center justify-center neon-glow group-hover:bg-purple-500 transition-colors">
                                            <Play className="w-8 h-8 text-white ml-1" />
                                        </div>
                                    </motion.div>

                                    <div className="absolute top-3 right-3">
                                        <span className={`text-xs px-3 py-1 rounded-full font-bold ${getDifficultyColor(cls.difficulty)}`}>
                                            {cls.difficulty}
                                        </span>
                                    </div>

                                    <div className="absolute top-3 left-3">
                                        <span className="text-xs px-3 py-1 rounded-full font-bold bg-purple-500/20 text-purple-500">
                                            {cls.category}
                                        </span>
                                    </div>
                                </div>

                                <div
                                    className="p-4 cursor-pointer"
                                    onClick={() => navigate(`/class/${cls.id}`)}
                                >
                                    <div className="flex gap-4 mb-3">
                                        <div className="flex flex-col items-center justify-center bg-purple-500/20 rounded-xl px-3 py-2 min-w-[70px]">
                                            <span className="text-2xl font-bold text-purple-500">
                                                {cls.time.split(':')[0]}
                                            </span>
                                            <span className="text-xs text-purple-500">
                                                {cls.time.split(' ')[1]}
                                            </span>
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="font-bold text-white text-lg mb-1">{cls.name}</h3>

                                            <div className="flex items-center gap-2 mb-2">
                                                <img
                                                    src={cls.trainer.avatar}
                                                    alt={cls.trainer.name}
                                                    className="w-6 h-6 rounded-full"
                                                />
                                                <span className="text-sm text-gray-400">{cls.trainer.name}</span>
                                            </div>

                                            <div className="flex items-center gap-4 text-xs">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4 text-gray-400" />
                                                    <span className="text-gray-400">{cls.duration} min</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Flame className="w-4 h-4 text-orange-500" />
                                                    <span className="text-gray-400">{cls.calories} cal</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users className={`w-4 h-4 ${getCapacityColor(cls.enrolled, cls.capacity)}`} />
                                                    <span className={getCapacityColor(cls.enrolled, cls.capacity)}>
                                                        {cls.enrolled}/{cls.capacity}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/class/${cls.id}`);
                                        }}
                                        className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold py-3 rounded-xl"
                                    >
                                        Book This Class
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Video Preview Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-4xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute -top-12 right-0 p-2 glass rounded-full z-10"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>

                            {/* Video Player */}
                            <div className="aspect-video bg-black rounded-2xl overflow-hidden">
                                <iframe
                                    src={`${selectedVideo.videoUrl}?autoplay=1`}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>

                            {/* Video Info */}
                            <div className="mt-4 glass p-4 rounded-xl">
                                <h3 className="text-xl font-bold text-white mb-2">{selectedVideo.name}</h3>
                                <p className="text-gray-400 text-sm mb-3">{selectedVideo.description}</p>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={selectedVideo.trainer.avatar}
                                        alt={selectedVideo.trainer.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <p className="text-white font-medium">{selectedVideo.trainer.name}</p>
                                        <p className="text-xs text-gray-400">{selectedVideo.trainer.specialty}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Schedule;
