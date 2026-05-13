import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, UserCog, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LoginScreen = () => {
    const navigate = useNavigate();
    const { login } = useApp();
    const [selectedRole, setSelectedRole] = useState(null);

    const roles = [
        {
            type: 'member',
            title: 'Member Login',
            icon: User,
            gradient: 'from-primary to-primary-dark',
            description: 'Track workouts, earn XP, compete',
            email: 'alex@gym.com',
        },
        {
            type: 'trainer',
            title: 'Trainer Login',
            icon: UserCog,
            gradient: 'from-purple-500 to-purple-700',
            description: 'Manage classes, track members',
            email: 'mike@gym.com',
        },
        {
            type: 'owner',
            title: 'Owner Login',
            icon: UserCog,
            gradient: 'from-yellow-500 to-orange-600',
            description: 'Full gym management & analytics',
            email: 'owner@gym.com',
        },
    ];

    const handleLogin = (role) => {
        const roleData = roles.find(r => r.type === role);
        if (login(roleData.email, role)) {
            navigate('/');
        }
    };

    const handleGuest = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-dark flex items-center justify-center p-6 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        className="inline-block mb-4"
                        animate={{
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        <Zap className="w-16 h-16 text-primary" />
                    </motion.div>
                    <h1 className="text-4xl font-display font-black mb-2">
                        <span className="gradient-text">Welcome Back</span>
                    </h1>
                    <p className="text-gray-400">Choose your path to greatness</p>
                </motion.div>

                {/* Role Cards */}
                <div className="space-y-4 mb-6">
                    {roles.map((role, index) => {
                        const Icon = role.icon;
                        return (
                            <motion.button
                                key={role.type}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => handleLogin(role.type)}
                                className="w-full glass p-6 rounded-2xl relative overflow-hidden group touch-feedback"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${role.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                                <div className="relative flex items-center gap-4">
                                    <div className={`p-4 rounded-xl bg-gradient-to-br ${role.gradient}`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className="text-xl font-bold text-white mb-1">{role.title}</h3>
                                        <p className="text-sm text-gray-400">{role.description}</p>
                                    </div>
                                    <motion.div
                                        className="w-2 h-2 rounded-full bg-primary"
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.5, 1, 0.5],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: index * 0.5,
                                        }}
                                    />
                                </div>

                                {/* Hover Effect */}
                                <motion.div
                                    className="absolute inset-0 border-2 border-primary rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                                    initial={false}
                                />
                            </motion.button>
                        );
                    })}
                </div>

                {/* Guest Login */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    onClick={handleGuest}
                    className="w-full glass-dark p-4 rounded-xl text-gray-400 hover:text-white transition-colors touch-feedback"
                    whileTap={{ scale: 0.98 }}
                >
                    Continue as Guest
                </motion.button>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 text-center"
                >
                    <p className="text-gray-500 text-sm">
                        Demo Mode • No Real Authentication
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default LoginScreen;
