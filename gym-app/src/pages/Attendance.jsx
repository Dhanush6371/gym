import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Attendance = () => {
    const navigate = useNavigate();
    const { currentUser } = useApp();

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeks = Array.from({ length: 12 }, (_, i) => i);

    return (
        <div className="min-h-screen bg-dark safe-top">
            <div className="max-w-lg mx-auto px-4 py-6">
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => navigate(-1)} className="p-2 glass rounded-xl">
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </button>
                    <h1 className="text-2xl font-display font-black text-white">Attendance</h1>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass p-6 rounded-2xl mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-gray-400 text-sm">This Month</p>
                            <p className="text-4xl font-bold gradient-text">87%</p>
                        </div>
                        <TrendingUp className="w-12 h-12 text-green-500" />
                    </div>
                    <p className="text-sm text-gray-400">You're crushing it! Keep the momentum going.</p>
                </motion.div>

                <div className="glass p-6 rounded-2xl">
                    <h3 className="font-bold text-white mb-4">Workout Heatmap</h3>
                    <div className="space-y-2">
                        {weeks.map((week) => (
                            <div key={week} className="flex gap-2">
                                {days.map((day, index) => {
                                    const hasWorkout = Math.random() > 0.3;
                                    return (
                                        <div
                                            key={index}
                                            className={`flex-1 h-8 rounded ${hasWorkout ? 'bg-primary' : 'bg-dark-lighter'
                                                }`}
                                            title={`${day} - ${hasWorkout ? 'Workout' : 'Rest'}`}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
                        <span>Less</span>
                        <div className="flex gap-1">
                            <div className="w-4 h-4 bg-dark-lighter rounded" />
                            <div className="w-4 h-4 bg-primary/30 rounded" />
                            <div className="w-4 h-4 bg-primary/60 rounded" />
                            <div className="w-4 h-4 bg-primary rounded" />
                        </div>
                        <span>More</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
