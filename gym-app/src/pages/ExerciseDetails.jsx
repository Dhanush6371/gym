import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import { exercises } from '../data/mockData';

const ExerciseDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const exercise = exercises.find(e => e.id === parseInt(id));

    if (!exercise) return <div>Exercise not found</div>;

    return (
        <div className="min-h-screen bg-dark safe-top">
            <div className="max-w-lg mx-auto">
                <div className="relative h-64">
                    <img src={exercise.thumbnail} alt={exercise.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
                    <button onClick={() => navigate(-1)} className="absolute top-4 left-4 p-2 glass rounded-xl">
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </button>
                </div>

                <div className="px-4 -mt-16 relative z-10 pb-8 space-y-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-6 rounded-3xl">
                        <h1 className="text-3xl font-bold text-white mb-2">{exercise.name}</h1>
                        <p className="text-gray-400 mb-4">{exercise.description}</p>

                        <div className="grid grid-cols-3 gap-3 mb-6">
                            <div className="glass-dark p-3 rounded-xl text-center">
                                <p className="text-xs text-gray-400">Sets</p>
                                <p className="text-xl font-bold text-white">{exercise.sets}</p>
                            </div>
                            <div className="glass-dark p-3 rounded-xl text-center">
                                <p className="text-xs text-gray-400">Reps</p>
                                <p className="text-xl font-bold text-white">{exercise.reps}</p>
                            </div>
                            <div className="glass-dark p-3 rounded-xl text-center">
                                <p className="text-xs text-gray-400">Rest</p>
                                <p className="text-xl font-bold text-white">{exercise.restTime}s</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-bold text-white mb-3">Instructions</h3>
                            <ol className="space-y-2">
                                {exercise.instructions.map((instruction, index) => (
                                    <li key={index} className="flex gap-3">
                                        <span className="text-primary font-bold">{index + 1}.</span>
                                        <span className="text-gray-400">{instruction}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div className="aspect-video bg-dark-lighter rounded-xl overflow-hidden">
                            <iframe
                                src={exercise.videoUrl}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ExerciseDetails;
