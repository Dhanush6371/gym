import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useEffect } from 'react';
import { useIsDesktop } from '../hooks/useMediaQuery';
import {
    Flame,
    Zap,
    Trophy,
    TrendingUp,
    Droplets,
    Moon,
    Target,
    Calendar,
    Users,
    Activity,
    Sparkles,
    MessageSquare,
    Video,
} from 'lucide-react';
import { classes } from '../data/mockData';

const Home = () => {
    const navigate = useNavigate();
    const { currentUser, dailyQuote, aiMessage, updateAura } = useApp();
    const isDesktop = useIsDesktop();

    // Redirect based on role using useEffect
    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        if (currentUser.role === 'trainer') {
            navigate('/trainer');
            return;
        }

        if (currentUser.role === 'owner') {
            navigate('/owner');
            return;
        }
    }, [currentUser, navigate]);

    // Safety check - don't render if redirecting
    if (!currentUser || currentUser.role !== 'member') {
        return null;
    }

    // Ensure todayStats exists for members
    if (!currentUser.todayStats) {
        currentUser.todayStats = {
            workouts: 0,
            calories: 0,
            duration: 0,
            hydration: 0,
            sleep: 0,
        };
    }

    const stats = [
        {
            label: 'Streak',
            value: `${currentUser.streak} days`,
            icon: Flame,
            color: 'text-orange-500',
            bg: 'bg-orange-500/20',
        },
        {
            label: 'Level',
            value: currentUser.level,
            icon: Trophy,
            color: 'text-yellow-500',
            bg: 'bg-yellow-500/20',
        },
        {
            label: 'Workouts',
            value: currentUser.totalWorkouts,
            icon: Zap,
            color: 'text-primary',
            bg: 'bg-primary/20',
        },
        {
            label: 'Calories',
            value: `${(currentUser.caloriesBurned / 1000).toFixed(1)}k`,
            icon: TrendingUp,
            color: 'text-green-500',
            bg: 'bg-green-500/20',
        },
    ];

    const todayStats = [
        {
            label: 'Workouts',
            value: currentUser.todayStats.workouts,
            max: 3,
            icon: Activity,
            color: 'primary',
        },
        {
            label: 'Calories',
            value: currentUser.todayStats.calories,
            max: 600,
            icon: Zap,
            color: 'orange-500',
        },
        {
            label: 'Hydration',
            value: currentUser.todayStats.hydration,
            max: 8,
            icon: Droplets,
            color: 'blue-500',
        },
        {
            label: 'Sleep',
            value: currentUser.todayStats.sleep,
            max: 8,
            icon: Moon,
            color: 'purple-500',
        },
    ];

    const upcomingClasses = classes.slice(0, 3);

    const xpPercentage = (currentUser.xp / currentUser.xpToNextLevel) * 100;

    // Desktop Layout - Multi-column grid
    if (isDesktop) {
        return (
            <div className="space-y-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                >
                    <h1 className="text-3xl font-display font-black">
                        Hey, <span className="gradient-text">{currentUser.name.split(' ')[0]}</span>
                    </h1>
                    <p className="text-gray-400">{dailyQuote}</p>
                </motion.div>

                {/* Top Row - XP, Aura, AI Message */}
                <div className="grid grid-cols-3 gap-6">
                    {/* XP Progress */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass p-6 rounded-2xl"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Trophy className="w-6 h-6 text-yellow-500" />
                                <span className="font-bold text-white text-lg">Level {currentUser.level}</span>
                            </div>
                        </div>
                        <div className="h-3 bg-dark-lighter rounded-full overflow-hidden mb-2">
                            <motion.div
                                className="h-full bg-gradient-to-r from-primary to-yellow-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${xpPercentage}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                            />
                        </div>
                        <span className="text-sm text-gray-400">
                            {currentUser.xp} / {currentUser.xpToNextLevel} XP
                        </span>
                    </motion.div>

                    {/* Aura Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => updateAura()}
                        className="glass p-6 rounded-2xl relative overflow-hidden cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20" />
                        <div className="relative flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Today's Aura</p>
                                <h3 className="text-2xl font-bold gradient-text">{currentUser.aura}</h3>
                            </div>
                            <Sparkles className="w-12 h-12 text-primary animate-pulse-glow" />
                        </div>
                    </motion.div>

                    {/* Gym Energy */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass p-6 rounded-2xl relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-400">Gym Energy</span>
                                <Flame className="w-5 h-5 text-primary animate-pulse-glow" />
                            </div>
                            <div className="flex items-end gap-1">
                                <span className="text-4xl font-black gradient-text">87</span>
                                <span className="text-xl text-gray-400 mb-1">%</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* AI Message - Full Width */}
                {aiMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-dark p-6 rounded-2xl border-l-4 border-primary"
                    >
                        <div className="flex items-start gap-4">
                            <MessageSquare className="w-6 h-6 text-primary mt-1" />
                            <div>
                                <p className="text-sm text-gray-400 mb-2">AI Coach Says:</p>
                                <p className="text-white font-medium text-lg">{aiMessage}</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Main Content Grid - 2 Columns */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="glass p-6 rounded-xl text-center"
                                    >
                                        <div className={`${stat.bg} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                                            <Icon className={`w-7 h-7 ${stat.color}`} />
                                        </div>
                                        <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                                        <p className="text-sm text-gray-400">{stat.label}</p>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Today's Progress */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="glass p-6 rounded-2xl"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">Today's Progress</h2>
                                <Target className="w-6 h-6 text-primary" />
                            </div>
                            <div className="space-y-5">
                                {todayStats.map((stat, index) => {
                                    const Icon = stat.icon;
                                    const percentage = Math.min((stat.value / stat.max) * 100, 100);
                                    return (
                                        <div key={stat.label}>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <Icon className={`w-5 h-5 text-${stat.color}`} />
                                                    <span className="text-sm text-gray-400">{stat.label}</span>
                                                </div>
                                                <span className="text-sm font-bold text-white">
                                                    {stat.value} / {stat.max}
                                                </span>
                                            </div>
                                            <div className="h-2 bg-dark-lighter rounded-full overflow-hidden">
                                                <motion.div
                                                    className={`h-full bg-${stat.color}`}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${percentage}%` }}
                                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-2 gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/mood')}
                                className="glass p-6 rounded-xl text-center"
                            >
                                <div className="text-5xl mb-3">😤</div>
                                <p className="font-bold text-white text-lg">Start Workout</p>
                                <p className="text-xs text-gray-400 mt-2">Choose your mood</p>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/battles')}
                                className="glass p-6 rounded-xl text-center"
                            >
                                <div className="text-5xl mb-3">⚔️</div>
                                <p className="font-bold text-white text-lg">Battles</p>
                                <p className="text-xs text-gray-400 mt-2">Challenge friends</p>
                            </motion.button>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Upcoming Classes */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-white">Upcoming Classes</h2>
                                <button
                                    onClick={() => navigate('/schedule')}
                                    className="text-primary text-sm font-medium hover:underline"
                                >
                                    View All
                                </button>
                            </div>
                            {upcomingClasses.map((cls, index) => (
                                <motion.div
                                    key={cls.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => navigate(`/class/${cls.id}`)}
                                    className="glass p-5 rounded-xl cursor-pointer"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center flex-shrink-0">
                                            <Calendar className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-white mb-1">{cls.name}</h3>
                                            <p className="text-sm text-gray-400">{cls.trainer.name}</p>
                                            <div className="flex items-center gap-3 mt-2 text-xs">
                                                <span className="text-primary font-medium">{cls.time}</span>
                                                <span className="text-gray-500">•</span>
                                                <span className="text-gray-400">{cls.duration} min</span>
                                                <span className="text-gray-500">•</span>
                                                <div className="flex items-center gap-1">
                                                    <Users className="w-3 h-3" />
                                                    <span className="text-gray-400">{cls.enrolled}/{cls.capacity}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Gym Energy Details */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="glass p-6 rounded-2xl"
                        >
                            <h3 className="text-lg font-bold text-white mb-4">Gym Insights</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Peak Hours</span>
                                    <span className="text-white font-medium">6-8 PM</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Most Active</span>
                                    <span className="text-white font-medium">Chest & Arms</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Crowd Level</span>
                                    <span className="text-primary font-medium">🔥 High Energy</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Your Rank</span>
                                    <span className="text-yellow-500 font-medium">Top 15%</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        );
    }

    // Mobile Layout - Original design
    return (
        <div className="min-h-screen bg-dark safe-top">
            <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                >
                    <h1 className="text-3xl font-display font-black">
                        Hey, <span className="gradient-text">{currentUser.name.split(' ')[0]}</span>
                    </h1>
                    <p className="text-gray-400">{dailyQuote}</p>
                </motion.div>

                {/* XP Progress */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass p-4 rounded-2xl"
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-yellow-500" />
                            <span className="font-bold text-white">Level {currentUser.level}</span>
                        </div>
                        <span className="text-sm text-gray-400">
                            {currentUser.xp} / {currentUser.xpToNextLevel} XP
                        </span>
                    </div>
                    <div className="h-3 bg-dark-lighter rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary to-yellow-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${xpPercentage}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        />
                    </div>
                </motion.div>

                {/* Aura Card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => updateAura()}
                    className="glass p-6 rounded-2xl relative overflow-hidden cursor-pointer touch-feedback"
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20" />
                    <div className="relative flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400 mb-1">Today's Aura</p>
                            <h3 className="text-2xl font-bold gradient-text">{currentUser.aura}</h3>
                        </div>
                        <Sparkles className="w-12 h-12 text-primary animate-pulse-glow" />
                    </div>
                </motion.div>

                {/* AI Message */}
                {aiMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-dark p-4 rounded-2xl border-l-4 border-primary"
                    >
                        <div className="flex items-start gap-3">
                            <MessageSquare className="w-5 h-5 text-primary mt-1" />
                            <div>
                                <p className="text-sm text-gray-400 mb-1">AI Coach Says:</p>
                                <p className="text-white font-medium">{aiMessage}</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-4 gap-3">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass p-4 rounded-xl text-center"
                            >
                                <div className={`${stat.bg} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2`}>
                                    <Icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <p className="text-xl font-bold text-white">{stat.value}</p>
                                <p className="text-xs text-gray-400">{stat.label}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Today's Progress */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass p-6 rounded-2xl"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-white">Today's Progress</h2>
                        <Target className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-4">
                        {todayStats.map((stat, index) => {
                            const Icon = stat.icon;
                            const percentage = Math.min((stat.value / stat.max) * 100, 100);
                            return (
                                <div key={stat.label}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Icon className={`w-4 h-4 text-${stat.color}`} />
                                            <span className="text-sm text-gray-400">{stat.label}</span>
                                        </div>
                                        <span className="text-sm font-bold text-white">
                                            {stat.value} / {stat.max}
                                        </span>
                                    </div>
                                    <div className="h-2 bg-dark-lighter rounded-full overflow-hidden">
                                        <motion.div
                                            className={`h-full bg-${stat.color}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percentage}%` }}
                                            transition={{ duration: 0.8, delay: index * 0.1 }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Gym Energy Meter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass p-6 rounded-2xl relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">Gym Energy Today</h2>
                            <Flame className="w-6 h-6 text-primary animate-pulse-glow" />
                        </div>
                        <div className="flex items-end gap-2 mb-4">
                            <span className="text-5xl font-black gradient-text">87</span>
                            <span className="text-2xl text-gray-400 mb-2">%</span>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Peak Hours</span>
                                <span className="text-white font-medium">6-8 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Most Active</span>
                                <span className="text-white font-medium">Chest & Arms</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Crowd Level</span>
                                <span className="text-primary font-medium">🔥 High Energy</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Upcoming Classes */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Upcoming Classes</h2>
                        <button
                            onClick={() => navigate('/schedule')}
                            className="text-primary text-sm font-medium"
                        >
                            View All
                        </button>
                    </div>
                    {upcomingClasses.map((cls, index) => (
                        <motion.div
                            key={cls.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => navigate(`/class/${cls.id}`)}
                            className="glass p-4 rounded-xl cursor-pointer touch-feedback"
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                                    <Calendar className="w-8 h-8 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-white mb-1">{cls.name}</h3>
                                    <p className="text-sm text-gray-400">{cls.trainer.name}</p>
                                    <div className="flex items-center gap-3 mt-2 text-xs">
                                        <span className="text-primary">{cls.time}</span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-gray-400">{cls.duration} min</span>
                                        <span className="text-gray-500">•</span>
                                        <div className="flex items-center gap-1">
                                            <Users className="w-3 h-3" />
                                            <span className="text-gray-400">{cls.enrolled}/{cls.capacity}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3 pb-4">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/mood')}
                        className="glass p-6 rounded-xl text-center touch-feedback"
                    >
                        <div className="text-4xl mb-2">😤</div>
                        <p className="font-bold text-white">Start Workout</p>
                        <p className="text-xs text-gray-400 mt-1">Choose your mood</p>
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/battles')}
                        className="glass p-6 rounded-xl text-center touch-feedback"
                    >
                        <div className="text-4xl mb-2">⚔️</div>
                        <p className="font-bold text-white">Battles</p>
                        <p className="text-xs text-gray-400 mt-1">Challenge friends</p>
                    </motion.button>
                </div>

                {/* Role-Based Dashboard Access */}
                {(currentUser.role === 'trainer' || currentUser.role === 'owner') && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(currentUser.role === 'owner' ? '/owner' : '/trainer')}
                        className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold py-4 rounded-xl mb-4 flex items-center justify-center gap-2"
                    >
                        <span className="text-2xl">
                            {currentUser.role === 'owner' ? '👑' : '👨‍🏫'}
                        </span>
                        <span>
                            {currentUser.role === 'owner' ? 'Owner Dashboard' : 'Trainer Dashboard'}
                        </span>
                    </motion.button>
                )}
            </div>

            {/* Floating Reels Button */}
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/reels')}
                className="fixed bottom-24 right-6 z-40 w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center neon-glow shadow-2xl touch-feedback"
                animate={{
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                <Video className="w-8 h-8 text-white" />
            </motion.button>
        </div>
    );
};

export default Home;
