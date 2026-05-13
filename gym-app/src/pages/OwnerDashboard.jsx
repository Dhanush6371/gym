import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Users,
    DollarSign,
    TrendingUp,
    Calendar,
    Award,
    BarChart3,
    UserPlus,
    Settings,
    Bell
} from 'lucide-react';

const OwnerDashboard = () => {
    const navigate = useNavigate();

    const stats = [
        { label: 'Total Members', value: '245', change: '+12%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/20' },
        { label: 'Monthly Revenue', value: '$45.2k', change: '+8%', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/20' },
        { label: 'Active Classes', value: '32', change: '+5', icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-500/20' },
        { label: 'Avg Attendance', value: '87%', change: '+3%', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/20' },
    ];

    const quickActions = [
        { icon: UserPlus, label: 'Add Member', color: 'from-blue-500 to-blue-700' },
        { icon: Calendar, label: 'Create Class', color: 'from-purple-500 to-purple-700' },
        { icon: Award, label: 'Manage Plans', color: 'from-yellow-500 to-orange-600' },
        { icon: Settings, label: 'Gym Settings', color: 'from-gray-500 to-gray-700' },
    ];

    const recentActivity = [
        { type: 'member', name: 'John Doe joined Premium plan', time: '5 min ago', icon: '👤' },
        { type: 'payment', name: 'Payment received: $59', time: '12 min ago', icon: '💰' },
        { type: 'class', name: 'Morning HIIT class completed', time: '1 hour ago', icon: '🏋️' },
        { type: 'trainer', name: 'New trainer Emma added', time: '2 hours ago', icon: '👨‍🏫' },
    ];

    return (
        <div className="min-h-screen bg-dark safe-top">
            <div className="max-w-lg mx-auto px-4 py-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => navigate(-1)} className="p-2 glass rounded-xl">
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-2xl font-display font-black text-white">Owner Dashboard</h1>
                        <p className="text-sm text-gray-400">Full gym management</p>
                    </div>
                    <button className="p-2 glass rounded-xl relative">
                        <Bell className="w-6 h-6 text-white" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                </div>

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
                                className="glass p-4 rounded-2xl"
                            >
                                <div className={`${stat.bg} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
                                    <Icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                                <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                                <span className="text-xs text-green-500 font-medium">{stat.change}</span>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Revenue Chart */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass p-6 rounded-2xl mb-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">Revenue Overview</h3>
                        <BarChart3 className="w-5 h-5 text-primary" />
                    </div>
                    <div className="h-40 flex items-end justify-between gap-2">
                        {[65, 80, 75, 90, 85, 95, 88].map((height, index) => (
                            <motion.div
                                key={index}
                                className="flex-1 bg-gradient-to-t from-primary to-primary-light rounded-t-lg"
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

                {/* Quick Actions */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-white mb-3">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {quickActions.map((action, index) => {
                            const Icon = action.icon;
                            return (
                                <motion.button
                                    key={action.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`glass p-6 rounded-xl text-center touch-feedback relative overflow-hidden group`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                                    <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
                                    <p className="text-sm font-medium text-white">{action.label}</p>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Activity */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-3">Recent Activity</h3>
                    <div className="space-y-3">
                        {recentActivity.map((activity, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass p-4 rounded-xl flex items-center gap-3"
                            >
                                <div className="text-3xl">{activity.icon}</div>
                                <div className="flex-1">
                                    <p className="text-sm text-white font-medium">{activity.name}</p>
                                    <p className="text-xs text-gray-400">{activity.time}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Management Links */}
                <div className="mt-6 grid grid-cols-2 gap-3 pb-4">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/trainer')}
                        className="glass p-4 rounded-xl text-center"
                    >
                        <p className="font-bold text-white">Trainer View</p>
                        <p className="text-xs text-gray-400 mt-1">Manage classes</p>
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/settings')}
                        className="glass p-4 rounded-xl text-center"
                    >
                        <p className="font-bold text-white">Settings</p>
                        <p className="text-xs text-gray-400 mt-1">Configure gym</p>
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default OwnerDashboard;
