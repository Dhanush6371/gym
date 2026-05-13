import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Swords, Trophy } from 'lucide-react';
import { battles } from '../data/mockData';

const Battles = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-dark safe-top">
            <div className="max-w-lg mx-auto px-4 py-6">
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => navigate(-1)} className="p-2 glass rounded-xl">
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </button>
                    <h1 className="text-2xl font-display font-black text-white">Battles</h1>
                </div>

                <div className="space-y-4">
                    {battles.map((battle, index) => (
                        <motion.div
                            key={battle.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-6 rounded-2xl"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-white">{battle.name}</h3>
                                <Swords className="w-6 h-6 text-primary" />
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <div className="text-center">
                                    <p className="text-sm text-gray-400 mb-1">You</p>
                                    <p className="text-3xl font-bold gradient-text">{battle.yourScore}</p>
                                </div>
                                <div className="text-4xl">⚔️</div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-400 mb-1">{battle.opponent.name.split(' ')[0]}</p>
                                    <p className="text-3xl font-bold text-white">{battle.opponentScore}</p>
                                </div>
                            </div>

                            <div className="glass-dark p-3 rounded-xl text-center">
                                <p className="text-xs text-gray-400">Ends in</p>
                                <p className="text-sm font-bold text-white">{battle.endDate}</p>
                            </div>

                            <div className="mt-4 flex items-center justify-center gap-2">
                                <Trophy className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm text-gray-400">Prize: {battle.prize}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Battles;
