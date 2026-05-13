import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Crown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { membershipPlans } from '../data/mockData';

const Membership = () => {
    const navigate = useNavigate();
    const { currentUser } = useApp();

    return (
        <div className="min-h-screen bg-dark safe-top">
            <div className="max-w-lg mx-auto px-4 py-6">
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => navigate(-1)} className="p-2 glass rounded-xl">
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </button>
                    <h1 className="text-2xl font-display font-black text-white">Membership</h1>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass p-6 rounded-2xl mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Crown className="w-8 h-8 text-yellow-500" />
                        <div>
                            <p className="text-sm text-gray-400">Current Plan</p>
                            <p className="text-2xl font-bold text-white">{currentUser.membershipType}</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-400">Expires: {currentUser.membershipExpiry}</p>
                </motion.div>

                <div className="space-y-4">
                    {membershipPlans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`glass p-6 rounded-2xl relative ${plan.popular ? 'border-2 border-primary' : ''}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full">
                                    <span className="text-xs font-bold text-white">MOST POPULAR</span>
                                </div>
                            )}
                            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                            <div className="flex items-end gap-1 mb-4">
                                <span className="text-4xl font-black gradient-text">${plan.price}</span>
                                <span className="text-gray-400 mb-1">/{plan.period}</span>
                            </div>
                            <ul className="space-y-2 mb-6">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <Check className="w-5 h-5 text-primary mt-0.5" />
                                        <span className="text-sm text-gray-400">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className={`w-full py-3 rounded-xl font-bold ${currentUser.membershipType === plan.name
                                    ? 'bg-gray-700 text-gray-400'
                                    : 'bg-gradient-to-r from-primary to-primary-dark text-white'
                                }`}>
                                {currentUser.membershipType === plan.name ? 'Current Plan' : 'Upgrade'}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Membership;
