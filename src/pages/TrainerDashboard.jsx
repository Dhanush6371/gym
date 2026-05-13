import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, Calendar, TrendingUp, Clock, Award, BarChart3, Bell, Home as HomeIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { classes } from '../data/mockData';

const TrainerDashboard = () => {
    const navigate = useNavigate();
    const { currentUser } = useApp();

    if (!currentUser) {
        navigate('/login');
        return null;
    }

    const myClasses = classes.filter(c => c.trainer.id === currentUser.id);
    const todayClasses = myClasses.filter(c => c.date === '2026-05-14');

    const stats = [
        { label: 'My Classes', value: myClasses.length, icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-500/20' },
        { label: 'Total Students', value: '45', icon: Users, color: 'text-green-500', bg: 'bg-green-500/20' },
        { label: 'Avg Rating', value: currentUser.rating || '4.9', icon: Award, color: 'text-yellow-500', bg: 'bg-yellow-500/20' },
        { label: 'This Week', value: '12', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/20' },
    ];

    return (
        <div className="min-h-screen bg-dark safe-top">
            <div className="max-w-lg mx-auto px-4 py-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => navigate('/')} className="p-2 glass rounded-xl">
                        <HomeIcon className="w-6 h-6 text-white" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-2xl font-display font-black gradient-text">Trainer Dashboard</h1>
                        <p className="text-sm text-gray-400">Welcome back, {currentUser.name.split(' ')[0]}</p>
                    </div>
                    <button className="p-2 glass rounded-xl relative">
                        <Bell className="w-6 h-6 text-white" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                </div>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass p-6 rounded-2xl mb-6 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent" />
                    <div className="relative flex items-center gap-4">
                        <img
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            className="w-16 h-16 rounded-xl border-2 border-purple-500"
                        />
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-white">{currentUser.name}</h2>
                            <p className="text-sm text-purple-400">{currentUser.specialty}</p>
                            <p className="text-xs text-gray-400">{currentUser.experience} experience</p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-1">
                                <Award className="w-4 h-4 text-yellow-500" />
                                <span className="text-lg font-bold text-white">{currentUser.rating}</span>
                            </div>
                            <p className="text-xs text-gray-400">Rating</p>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass p-4 rounded-xl"
                            >
                                <div className={`${stat.bg} w-10 h-10 rounded-xl flex items-center justify-center mb-2`}>
                                    <Icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                                <p className="text-xs text-gray-400">{stat.label}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="glass p-6 rounded-xl text-center touch-feedback"
                    >
                        <Plus className="w-8 h-8 text-primary mx-auto mb-2" />
                        <p className="font-bold text-white">Create Class</p>
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="glass p-6 rounded-xl text-center touch-feedback"
                    >
                        <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                        <p className="font-bold text-white">My Students</p>
                    </motion.button>
                </div>

                {/* Today's Classes */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-white mb-3">Today's Classes</h3>
                    {todayClasses.length > 0 ? (
                        <div className="space-y-3">
                            {todayClasses.map((cls, index) => (
                                <motion.div
                                    key={cls.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => navigate(`/class/${cls.id}`)}
                                    className="glass p-4 rounded-xl cursor-pointer touch-feedback"
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-white">{cls.name}</h4>
                                        <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                                            {cls.time}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{cls.duration} min</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            <span>{cls.enrolled}/{cls.capacity}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="glass-dark p-6 rounded-xl text-center">
                            <p className="text-gray-400">No classes scheduled for today</p>
                        </div>
                    )}
                </div>

                {/* Performance Chart */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass p-6 rounded-2xl mb-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">Weekly Performance</h3>
                        <BarChart3 className="w-5 h-5 text-primary" />
                    </div>
                    <div className="h-32 flex items-end justify-between gap-2">
                        {[75, 85, 80, 90, 88, 95, 92].map((height, index) => (
                            <motion.div
                                key={index}
                                className="flex-1 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg"
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between mt-3 text-xs text-gray-400">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                    </div>
                </motion.div>

                {/* All Classes */}
                <div className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-white">All My Classes</h3>
                        <button
                            onClick={() => navigate('/schedule')}
                            className="text-primary text-sm font-medium"
                        >
                            View Schedule
                        </button>
                    </div>
                    <div className="space-y-2">
                        {myClasses.map((cls, index) => (
                            <motion.div
                                key={cls.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => navigate(`/class/${cls.id}`)}
                                className="glass p-3 rounded-xl flex items-center justify-between cursor-pointer touch-feedback"
                                whileTap={{ scale: 0.98 }}
                            >
                                <div>
                                    <p className="font-medium text-white text-sm">{cls.name}</p>
                                    <p className="text-xs text-gray-400">{cls.category}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-primary">{cls.time}</p>
                                    <p className="text-xs text-gray-400">{cls.enrolled} enrolled</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainerDashboard;
