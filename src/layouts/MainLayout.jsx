import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Calendar, Dumbbell, User, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useEffect, useState } from 'react';

const MainLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { notifications, showConfetti } = useApp();
    const [confettiPieces, setConfettiPieces] = useState([]);

    const navItems = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/schedule', icon: Calendar, label: 'Schedule' },
        { path: '/workouts', icon: Dumbbell, label: 'Workouts' },
        { path: '/profile', icon: User, label: 'Profile' },
    ];

    const unreadCount = notifications.filter(n => !n.read).length;

    // Confetti effect - Reduced for performance
    useEffect(() => {
        if (showConfetti) {
            const pieces = Array.from({ length: 30 }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                delay: Math.random() * 0.3,
                duration: 1.5 + Math.random() * 1,
            }));
            setConfettiPieces(pieces);
        } else {
            setConfettiPieces([]);
        }
    }, [showConfetti]);

    return (
        <div className="min-h-screen bg-dark pb-20 relative overflow-hidden">
            {/* Confetti */}
            {confettiPieces.map(piece => (
                <motion.div
                    key={piece.id}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                        left: `${piece.left}%`,
                        top: -20,
                        background: `hsl(${Math.random() * 360}, 70%, 60%)`,
                    }}
                    initial={{ y: -20, opacity: 1, rotate: 0 }}
                    animate={{
                        y: window.innerHeight + 20,
                        opacity: 0,
                        rotate: 360,
                    }}
                    transition={{
                        duration: piece.duration,
                        delay: piece.delay,
                        ease: 'linear',
                    }}
                />
            ))}

            {/* Notification Bell */}
            <motion.button
                className="fixed top-4 right-4 z-50 glass p-3 rounded-full touch-feedback"
                onClick={() => navigate('/notifications')}
                whileTap={{ scale: 0.9 }}
            >
                <Bell className="w-6 h-6 text-white" />
                {unreadCount > 0 && (
                    <motion.span
                        className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                    >
                        {unreadCount}
                    </motion.span>
                )}
            </motion.button>

            {/* Main Content */}
            <motion.main
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="pb-4"
            >
                <Outlet />
            </motion.main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 glass-dark border-t border-white/10 safe-bottom z-40">
                <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-4">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <motion.button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className="flex flex-col items-center justify-center flex-1 relative touch-feedback"
                                whileTap={{ scale: 0.9 }}
                            >
                                <motion.div
                                    className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-primary/20' : ''
                                        }`}
                                    animate={{
                                        scale: isActive ? 1.1 : 1,
                                    }}
                                >
                                    <Icon
                                        className={`w-6 h-6 transition-colors ${isActive ? 'text-primary' : 'text-gray-400'
                                            }`}
                                    />
                                </motion.div>
                                <span
                                    className={`text-xs mt-1 font-medium transition-colors ${isActive ? 'text-primary' : 'text-gray-400'
                                        }`}
                                >
                                    {item.label}
                                </span>
                                {isActive && (
                                    <motion.div
                                        className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"
                                        layoutId="activeTab"
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
};

export default MainLayout;
