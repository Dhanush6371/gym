import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle } from 'lucide-react';
import { socialPosts } from '../data/mockData';

const Social = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-dark safe-top">
            <div className="max-w-lg mx-auto px-4 py-6">
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => navigate(-1)} className="p-2 glass rounded-xl">
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </button>
                    <h1 className="text-2xl font-display font-black text-white">Social Feed</h1>
                </div>

                <div className="space-y-4">
                    {socialPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-4 rounded-2xl"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-bold text-white">{post.user.name}</p>
                                    <p className="text-xs text-gray-400">{post.time}</p>
                                </div>
                            </div>
                            <p className="text-white mb-3">{post.content}</p>
                            {post.image && (
                                <img src={post.image} alt="Post" className="w-full h-48 object-cover rounded-xl mb-3" />
                            )}
                            <div className="flex items-center gap-4 text-sm">
                                <button className="flex items-center gap-1 text-gray-400">
                                    <Heart className={`w-5 h-5 ${post.liked ? 'fill-red-500 text-red-500' : ''}`} />
                                    <span>{post.likes}</span>
                                </button>
                                <button className="flex items-center gap-1 text-gray-400">
                                    <MessageCircle className="w-5 h-5" />
                                    <span>{post.comments}</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Social;
