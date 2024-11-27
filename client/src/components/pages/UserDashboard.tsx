import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Footer from '../reusable-ui/Footer';
import Header from '../reusable-ui/Header';
import type UserTypes from '../types/UserTypes';
import CourseList from './lists/CourseList';
import TopicList from './lists/TopicList';

const UserDashboard: React.FC = () => {
    console.log('UserDashboard component is rendering');
    const { user_id } = useParams<{ user_id: string }>();
    console.log('user_id', user_id);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserTypes | null>(null);
    const { user } = useUser();

    useEffect(() => {
        if (!user) {
            console.error('Utilsateur non connecté');
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch(
                    `https://technovice-app-196e28ed15ce.herokuapp.com/api/users/${user?.user_id}`, // Utilisation de l'ID de l'utilisateur du contexte
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Si tu utilises un token pour l'authentification
                        },
                    },
                );
                const data = await response.json();
                setUserData(data); // Mise à jour des données utilisateur
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setLoading(false); // Désactivation de l'état de chargement
            }
        };

        fetchUserData();
    }, [user]); // Dépendance à l'utilisateur du contexte

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Header />
            <main className="mt-32">
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold mb-6">Tableau de bord de {userData?.nickname}</h1>
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="lg:w-1/2 border-teal-200 rounded-3xl p-8 border-2">
                            <h2 className="text-2xl font-semibold mb-4">Mes cours suivis</h2>
                            <div className="space-y-6">
                                <CourseList
                                    variant="dashboard"
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                />
                            </div>
                        </div>
                        <div className="lg:w-1/2 border-teal-200 rounded-3xl p-8 border-2">
                            <h2 className="text-2xl font-semibold mb-4">Mes topics créés</h2>
                            <div className="space-y-6">
                                <TopicList variant="dashboard" />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </>
    );
};

export default UserDashboard;
