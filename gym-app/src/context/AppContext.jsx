import { createContext, useContext, useState, useEffect } from 'react';
import { users, trainers, motivationalQuotes, aiMessages, auraTypes } from '../data/mockData';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    // Load from localStorage or use default
    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem('currentUser');
        if (saved) {
            try {
                const user = JSON.parse(saved);
                // Validate that user has required properties
                if (user && user.email && user.role) {
                    return user;
                }
            } catch (e) {
                console.error('Invalid user data in localStorage');
            }
        }
        // Clear invalid data
        localStorage.removeItem('currentUser');
        return null;
    });

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    const [notifications, setNotifications] = useState([]);
    const [dailyQuote, setDailyQuote] = useState('');
    const [aiMessage, setAiMessage] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);

    // Save to localStorage whenever currentUser changes
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    }, [currentUser]);

    // Set daily quote
    useEffect(() => {
        const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        setDailyQuote(quote);
    }, []);

    // Generate AI message based on user activity
    useEffect(() => {
        if (currentUser && currentUser.todayStats) {
            if (currentUser.todayStats.workouts === 0) {
                const messages = aiMessages.skipWorkout;
                setAiMessage(messages[Math.floor(Math.random() * messages.length)]);
            } else {
                const messages = aiMessages.workoutComplete;
                setAiMessage(messages[Math.floor(Math.random() * messages.length)]);
            }
        }
    }, [currentUser]);

    const updateUserStats = (stats) => {
        if (!currentUser) return;
        setCurrentUser(prev => ({
            ...prev,
            todayStats: { ...prev.todayStats, ...stats }
        }));
    };

    const addXP = (amount) => {
        if (!currentUser) return;
        setCurrentUser(prev => {
            const newXP = prev.xp + amount;
            const leveledUp = newXP >= prev.xpToNextLevel;

            if (leveledUp) {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 3000);

                return {
                    ...prev,
                    xp: newXP - prev.xpToNextLevel,
                    level: prev.level + 1,
                    xpToNextLevel: Math.floor(prev.xpToNextLevel * 1.2),
                };
            }

            return { ...prev, xp: newXP };
        });
    };

    const incrementStreak = () => {
        if (!currentUser) return;
        setCurrentUser(prev => ({
            ...prev,
            streak: prev.streak + 1,
        }));
    };

    const breakStreak = () => {
        if (!currentUser) return;
        setCurrentUser(prev => ({
            ...prev,
            streak: 0,
        }));
    };

    const completeWorkout = (workout) => {
        if (!currentUser) return;
        updateUserStats({
            workouts: currentUser.todayStats.workouts + 1,
            calories: currentUser.todayStats.calories + workout.calories,
            duration: currentUser.todayStats.duration + workout.duration,
        });

        addXP(workout.calories / 10); // 1 XP per 10 calories

        setCurrentUser(prev => ({
            ...prev,
            totalWorkouts: prev.totalWorkouts + 1,
            caloriesBurned: prev.caloriesBurned + workout.calories,
        }));
    };

    const updateMood = (mood) => {
        if (!currentUser) return;
        setCurrentUser(prev => ({ ...prev, mood }));
    };

    const updateAura = () => {
        if (!currentUser) return;
        const newAura = auraTypes[Math.floor(Math.random() * auraTypes.length)];
        setCurrentUser(prev => ({ ...prev, aura: newAura }));
    };

    const addNotification = (notification) => {
        setNotifications(prev => [notification, ...prev]);
    };

    const markNotificationRead = (id) => {
        setNotifications(prev =>
            prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
        );
    };

    const login = (email, role) => {
        const allUsers = [...users, ...trainers];
        const user = allUsers.find(u => u.email === email && u.role === role);
        if (user) {
            setCurrentUser(user);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        localStorage.clear(); // Clear everything
        sessionStorage.clear(); // Clear session storage (splash screen flag, etc.)
        setCurrentUser(null);
        window.location.href = '/login'; // Force reload to login
    };

    const value = {
        currentUser,
        setCurrentUser,
        theme,
        setTheme,
        notifications,
        addNotification,
        markNotificationRead,
        dailyQuote,
        aiMessage,
        showConfetti,
        updateUserStats,
        addXP,
        incrementStreak,
        breakStreak,
        completeWorkout,
        updateMood,
        updateAura,
        login,
        logout,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
