import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Home,
    Calendar,
    Dumbbell,
    User,
    Bell,
    Video,
    TrendingUp,
    Users,
    Settings,
    LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const DesktopLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, notifications, logout } = useApp();

    // Safety check
    if (!currentUser) {
        return null;
    }

    // Define navigation items based on role
    const getMemberNavItems = () => [
        { path: '/', icon: Home, label: 'Dashboard' },
        { path: '/schedule', icon: Calendar, label: 'Schedule' },
        { path: '/workouts', icon: Dumbbell, label: 'Workouts' },
        { path: '/reels', icon: Video, label: 'Reels' },
        { path: '/battles', icon: TrendingUp, label: 'Battles' },
        { path: '/social', icon: Users, label: 'Social' },
        { path: '/profile', icon: User, label: 'Profile' },
    ];

    const getTrainerNavItems = () => [
        { path: '/trainer', icon: Home, label: 'Dashboard' },
        { path: '/schedule', icon: Calendar, label: 'Schedule' },
        { path: '/workouts', icon: Dumbbell, label: 'Workouts' },
        { path: '/social', icon: Users, label: 'Social' },
        { path: '/profile', icon: User, label: 'Profile' },
    ];

    const getOwnerNavItems = () => [
        { path: '/owner', icon: Home, label: 'Dashboard' },
        { path: '/schedule', icon: Calendar, label: 'Schedule' },
        { path: '/workouts', icon: Dumbbell, label: 'Workouts' },
        { path: '/social', icon: Users, label: 'Social' },
        { path: '/profile', icon: User, label: 'Profile' },
    ];

    // Get navigation items based on role
    let navItems = getMemberNavItems();
    if (currentUser.role === 'trainer') {
        navItems = getTrainerNavItems();
    } else if (currentUser.role === 'owner') {
        navItems = getOwnerNavItems();
    }

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="min-h-screen bg-dark flex">
            {/* Sidebar Navigation - Fixed */}
            <aside className="w-64 bg-dark-card border-r border-white/5 flex flex-col fixed left-0 top-0 bottom-0 z-50">
                {/* Logo */}
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
                            <Dumbbell className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-display font-black gradient-text">IRONPULSE</h1>
                            <p className="text-xs text-gray-500">Train Beyond Limits</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <motion.button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-primary/20 text-primary'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="ml-auto w-1 h-6 bg-primary rounded-full"
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-white/5">
                    <div className="glass p-4 rounded-xl mb-2">
                        <div className="flex items-center gap-3 mb-3">
                            <img
                                src={currentUser?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                                alt={currentUser?.name || 'User'}
                                className="w-12 h-12 rounded-xl border-2 border-primary"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-white text-sm truncate">{currentUser?.name || 'User'}</p>
                                <p className="text-xs text-gray-400 truncate">{currentUser?.email || ''}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">Level {currentUser?.level || 1}</span>
                            <span className="text-primary font-bold">{currentUser?.xp || 0} XP</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => navigate('/settings')}
                            className="flex-1 glass p-3 rounded-xl hover:bg-white/10 transition-colors"
                        >
                            <Settings className="w-5 h-5 text-gray-400 mx-auto" />
                        </button>
                        <button
                            onClick={() => {
                                if (confirm('Logout?')) {
                                    logout();
                                    navigate('/login');
                                }
                            }}
                            className="flex-1 glass p-3 rounded-xl hover:bg-red-500/20 transition-colors"
                        >
                            <LogOut className="w-5 h-5 text-red-500 mx-auto" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area - With left margin to account for fixed sidebar */}
            <div className="flex-1 flex flex-col ml-64">
                {/* Top Bar - Fixed */}
                <header className="h-16 bg-dark-card border-b border-white/5 flex items-center justify-between px-6 fixed top-0 right-0 left-64 z-40">
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
                        </h2>
                        <p className="text-xs text-gray-400">Welcome back, {currentUser?.name?.split(' ')[0] || 'User'}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Notifications */}
                        <button
                            onClick={() => navigate('/notifications')}
                            className="relative p-2 glass rounded-xl hover:bg-white/10 transition-colors"
                        >
                            <Bell className="w-5 h-5 text-white" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                    </div>
                </header>

                {/* Page Content - Scrollable with top margin */}
                <main className="flex-1 overflow-y-auto p-6 mt-16">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DesktopLayout;
