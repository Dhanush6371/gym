import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Bell, Lock, User } from 'lucide-react';

const Settings = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-dark safe-top">
            <div className="max-w-lg mx-auto px-4 py-6">
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => navigate(-1)} className="p-2 glass rounded-xl">
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </button>
                    <h1 className="text-2xl font-display font-black text-white">Settings</h1>
                </div>

                <div className="space-y-4">
                    {[
                        { icon: Moon, label: 'Dark Mode', value: 'On' },
                        { icon: Bell, label: 'Notifications', value: 'Enabled' },
                        { icon: Lock, label: 'Privacy', value: 'Manage' },
                        { icon: User, label: 'Account', value: 'Edit' },
                    ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass p-4 rounded-xl flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className="w-5 h-5 text-primary" />
                                    <span className="font-medium text-white">{item.label}</span>
                                </div>
                                <span className="text-sm text-gray-400">{item.value}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Settings;
