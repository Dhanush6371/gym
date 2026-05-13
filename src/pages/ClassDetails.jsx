import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Flame, Calendar, MapPin, Award } from 'lucide-react';
import { classes } from '../data/mockData';

const ClassDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const classData = classes.find(c => c.id === parseInt(id));

    if (!classData) {
        return <div>Class not found</div>;
    }

    const capacityPercentage = (classData.enrolled / classData.capacity) * 100;

    return (
        <div className="min-h-screen bg-dark safe-top">
            <div className="max-w-lg mx-auto">
                {/* Header */}
                <div className="relative h-64">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-purple-500/50" />
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-4 left-4 p-2 glass rounded-xl touch-feedback z-10"
                    >
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </button>
                </div>

                <div className="px-4 -mt-20 relative z-10 pb-8">
                    {/* Main Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass p-6 rounded-3xl space-y-6"
                    >
                        {/* Title */}
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">{classData.name}</h1>
                            <p className="text-gray-400">{classData.description}</p>
                        </div>

                        {/* Trainer */}
                        <div className="flex items-center gap-4 glass-dark p-4 rounded-xl">
                            <img
                                src={classData.trainer.avatar}
                                alt={classData.trainer.name}
                                className="w-16 h-16 rounded-xl"
                            />
                            <div>
                                <p className="text-sm text-gray-400">Trainer</p>
                                <p className="text-lg font-bold text-white">{classData.trainer.name}</p>
                                <p className="text-sm text-primary">{classData.trainer.specialty}</p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="glass-dark p-4 rounded-xl">
                                <Clock className="w-5 h-5 text-primary mb-2" />
                                <p className="text-xs text-gray-400">Duration</p>
                                <p className="text-lg font-bold text-white">{classData.duration} min</p>
                            </div>
                            <div className="glass-dark p-4 rounded-xl">
                                <Flame className="w-5 h-5 text-orange-500 mb-2" />
                                <p className="text-xs text-gray-400">Calories</p>
                                <p className="text-lg font-bold text-white">{classData.calories}</p>
                            </div>
                            <div className="glass-dark p-4 rounded-xl">
                                <Calendar className="w-5 h-5 text-blue-500 mb-2" />
                                <p className="text-xs text-gray-400">Time</p>
                                <p className="text-lg font-bold text-white">{classData.time}</p>
                            </div>
                            <div className="glass-dark p-4 rounded-xl">
                                <Award className="w-5 h-5 text-yellow-500 mb-2" />
                                <p className="text-xs text-gray-400">Difficulty</p>
                                <p className="text-lg font-bold text-white">{classData.difficulty}</p>
                            </div>
                        </div>

                        {/* Capacity */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-primary" />
                                    <span className="font-bold text-white">Capacity</span>
                                </div>
                                <span className="text-sm text-gray-400">
                                    {classData.enrolled} / {classData.capacity}
                                </span>
                            </div>
                            <div className="h-3 bg-dark-lighter rounded-full overflow-hidden">
                                <motion.div
                                    className={`h-full ${capacityPercentage >= 90
                                            ? 'bg-red-500'
                                            : capacityPercentage >= 70
                                                ? 'bg-yellow-500'
                                                : 'bg-green-500'
                                        }`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${capacityPercentage}%` }}
                                    transition={{ duration: 1 }}
                                />
                            </div>
                        </div>

                        {/* Equipment */}
                        <div>
                            <h3 className="font-bold text-white mb-3">Equipment Needed</h3>
                            <div className="flex flex-wrap gap-2">
                                {classData.equipment.map((item, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Book Button */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-4 rounded-xl neon-glow touch-feedback"
                        >
                            Book This Class
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ClassDetails;
