import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

const PersonalRecords = () => {
    const navigate = useNavigate();
    const { currentUser } = useApp();

    const records = [
        { name: 'Bench Press', value: `${currentUser.personalRecords.benchPress}kg`, icon: '💪' },
        { name: 'Deadlift', value: `${currentUser.personalRecords.deadlift}kg`, icon: '🏋️' },
        { name: 'Squat', value: `${currentUser.personalRecords.squat}kg`, icon: '🦵' },
        { name: '5K Run', value: currentUser.personalRecords.running5k, icon: '🏃' },
    ];

    return (
        <div className="min-h-screen bg-dark safe-top">
            <div className="max-w-lg mx-auto px-4 py-6">
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => navigate(-1)} className="p-2 glass rounded-xl">
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </button>
                    <h1 className="text-2xl font-display font-black text-white">Personal Records</h1>
                </div>

                <div className="space-y-4">
                    {records.map((record, index) => (
                        <motion.div
                            key={record.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-6 rounded-2xl"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl">{record.icon}</div>
                                    <div>
                                        <p className="text-sm text-gray-400">{record.name}</p>
                                        <p className="text-3xl font-bold gradient-text">{record.value}</p>
                                    </div>
                                </div>
                                <TrendingUp className="w-6 h-6 text-green-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PersonalRecords;
