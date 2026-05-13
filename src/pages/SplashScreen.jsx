import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, Zap } from 'lucide-react';

const SplashScreen = () => {
    const navigate = useNavigate();
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Generate particles
        const newParticles = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 3 + 2,
        }));
        setParticles(newParticles);

        // Navigate to login after 3 seconds
        const timer = setTimeout(() => {
            navigate('/login');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-dark flex items-center justify-center relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-lighter to-dark">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full bg-primary/20"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: particle.size,
                            height: particle.size,
                        }}
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center px-6">
                {/* Logo */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 15,
                        duration: 1,
                    }}
                    className="mb-8"
                >
                    <div className="relative inline-block">
                        <motion.div
                            className="absolute inset-0 bg-primary rounded-full blur-3xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                        <div className="relative bg-gradient-to-br from-primary to-primary-dark p-8 rounded-3xl neon-glow">
                            <Dumbbell className="w-20 h-20 text-white" strokeWidth={2.5} />
                        </div>
                    </div>
                </motion.div>

                {/* App Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-5xl font-display font-black mb-4"
                >
                    <span className="gradient-text">IRON</span>
                    <span className="text-white">PULSE</span>
                </motion.h1>

                {/* Slogan */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="space-y-2"
                >
                    <motion.p
                        className="text-xl font-semibold text-primary neon-text"
                        animate={{
                            opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        Train Beyond Limits
                    </motion.p>
                    <p className="text-gray-400 text-sm">Built Different</p>
                </motion.div>

                {/* Loading Animation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-12 flex items-center justify-center gap-2"
                >
                    <Zap className="w-5 h-5 text-primary" />
                    <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 bg-primary rounded-full"
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
                </motion.div>
            </div>

            {/* Bottom Tagline */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-0 right-0 text-center"
            >
                <p className="text-gray-500 text-sm">Discipline Creates Legends</p>
            </motion.div>
        </div>
    );
};

export default SplashScreen;
