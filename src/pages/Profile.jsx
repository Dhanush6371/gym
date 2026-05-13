import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
    Settings as SettingsIcon,
    Trophy,
    Flame,
    Zap,
    TrendingUp,
    Calendar,
    Award,
    Target,
    BarChart3,
    Swords,
    Heart,
} from 'lucide-react';

const Profile = () => {
    const navigate = useNavigate();
    const { currentUser, logout } = useApp();

    // Safety check - redirect if no user
    if (!currentUser) {
        navigate('/login');
        return null;
    }

    // Ensure all required properties exist
    const safeUser = {
        ...currentUser,
        badges: currentUser.badges || [],
        achievements: currentUser.achievements || [],
        personalRecords: currentUser.personalRecords || {},
        todayStats: currentUser.todayStats || { workouts: 0, calories: 0, duration: 0, hydration: 0, sleep: 0 },
        weeklyStats: currentUser.weeklyStats || { workouts: [], calories: [] },
    };

    const menuItems = [
        { icon: BarChart3, label: 'Personal Records', path: '/records', color: 'text-yellow-500' },
        { icon: Calendar, label: 'Attendance', path: '/attendance', color: 'text-blue-500' },
        { icon: Award, label: 'Membership', path: '/membership', color: 'text-purple-500' },
        { icon: Swords, label: 'Battles', path: '/battles', color: 'text-red-500' },
        { icon: Heart, label: 'Social Feed', path: '/social', color: 'text-pink-500' },
        { icon: SettingsIcon, label: 'Settings', path: '/settings', color: 'text-gray-400' },
    ];

    const stats = [
        { label: 'Workouts', value: safeUser.totalWorkouts, icon: Zap },
        { label: 'Calories', value: `${(safeUser.caloriesBurned / 1000).toFixed(1)}k`, icon: Flame },
        { label: 'Streak', value: `${safeUser.streak} days`, icon: TrendingUp },
        { label: 'Level', value: safeUser.level, icon: Trophy },
    ];

    return (
        <div className="min-h-screen bg-dark safe-top">
            <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass p-6 rounded-3xl relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />

                    <div className="relative flex items-center gap-4">
                        <div className="relative">
                            <img
                                src={safeUser.avatar}
                                alt={safeUser.name}
                                className="w-20 h-20 rounded-2xl border-4 border-primary"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-lg">
                                L{safeUser.level}
                            </div>
                        </div>

                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-white mb-1">{safeUser.name}</h1>
                            <p className="text-gray-400 text-sm mb-2">{safeUser.email}</p>
                            <div className="flex items-center gap-2">
                                {safeUser.badges.slice(0, 3).map((badge, index) => (
                                    <span key={index} className="text-lg">
                                        {badge === 'Beast Mode' && '👹'}
                                        {badge === 'Cardio Demon' && '😈'}
                                        {badge === 'Protein Predator' && '🥩'}
                                        {badge === 'Early Bird' && '🌅'}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* XP Bar */}
                    <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">Level {safeUser.level}</span>
                            <span className="text-gray-400">{safeUser.xp} / {safeUser.xpToNextLevel} XP</span>
                        </div>
                        <div className="h-2 bg-dark-lighter rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-primary to-yellow-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${(safeUser.xp / safeUser.xpToNextLevel) * 100}%` }}
                                transition={{ duration: 1 }}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
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
                                <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                                <p className="text-xl font-bold text-white">{stat.value}</p>
                                <p className="text-xs text-gray-400">{stat.label}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Aura Card */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass p-6 rounded-2xl relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20" />
                    <div className="relative">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-bold text-white">Current Aura</h3>
                            <Target className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-3xl font-black gradient-text">{safeUser.aura || 'Gym Warrior'}</p>
                    </div>
                </motion.div>

                {/* Badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass p-6 rounded-2xl"
                >
                    <h3 className="text-lg font-bold text-white mb-4">Badges Earned</h3>
                    <div className="flex flex-wrap gap-3">
                        {safeUser.badges.map((badge, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-dark px-4 py-2 rounded-xl"
                            >
                                <span className="text-sm font-medium text-white">{badge}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Menu Items */}
                <div className="space-y-2">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.button
                                key={item.path}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => navigate(item.path)}
                                className="w-full glass p-4 rounded-xl flex items-center gap-4 touch-feedback"
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="w-10 h-10 bg-dark-lighter rounded-xl flex items-center justify-center">
                                    <Icon className={`w-5 h-5 ${item.color}`} />
                                </div>
                                <span className="flex-1 text-left font-medium text-white">{item.label}</span>
                                <div className="w-2 h-2 rounded-full bg-gray-600" />
                            </motion.button>
                        );
                    })}
                </div>

                {/* Logout Button */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => {
                        if (confirm('Are you sure you want to logout?')) {
                            logout();
                            navigate('/login');
                        }
                    }}
                    className="w-full glass-dark p-4 rounded-xl text-red-500 font-medium touch-feedback"
                    whileTap={{ scale: 0.98 }}
                >
                    Logout
                </motion.button>
            </div>
        </div>
    );
};

export default Profile;
