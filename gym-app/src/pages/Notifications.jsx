import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell } from 'lucide-react';
import { notifications } from '../data/mockData';

const Notifications = () => {
    const navigate = useNavigate();

    const getNotificationIcon = (type) => {
        const icons = {
            workout: '🏋️',
            achievement: '🏆',
            social: '❤️',
            ai: '🤖',
            birthday: '🎉',
            trainer: '📢',
        };
        return icons[type] || '🔔';
    };

    return (
        <div className="min-h-screen bg-dark safe-top">
            <div className="max-w-lg mx-auto px-4 py-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 glass rounded-xl touch-feedback"
                    >
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </button>
                    <h1 className="text-2xl font-display font-black text-white">Notifications</h1>
                </div>

                {/* Notifications List */}
                <div className="space-y-3">
                    {notifications.map((notif, index) => (
                        <motion.div
                            key={notif.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`glass p-4 rounded-xl ${!notif.read ? 'border-l-4 border-primary' : ''}`}
                        >
                            <div className="flex gap-3">
                                <div className="text-3xl">{getNotificationIcon(notif.type)}</div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-white mb-1">{notif.title}</h3>
                                    <p className="text-sm text-gray-400 mb-2">{notif.message}</p>
                                    <span className="text-xs text-gray-500">{notif.time}</span>
                                </div>
                                {!notif.read && (
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notifications;
