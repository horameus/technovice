import Footer from '@/components/reusable-ui/Footer';
import Header from '@/components/reusable-ui/Header';
import React, { useEffect, useState } from 'react';
import { FaChalkboardTeacher, FaUser, FaUserShield } from 'react-icons/fa'; // Icônes pour les rôles
import { useNavigate, useParams } from 'react-router-dom'; // useNavigate pour la redirection
import type UserTypes from '../types/UserTypes';

import { useUser } from '@/context/UserContext'; // Importer le contexte utilisateur

const Profile: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Récupérer l'ID du profil
    const navigate = useNavigate(); // Utilisé pour rediriger après soumission
    const [userData, setUserData] = useState<UserTypes | null>(null); // Stocker les données utilisateur
    const [loading, setLoading] = useState<boolean>(true); // État de chargement
    //const [showPassword, setShowPassword] = useState<boolean>(false); // État pour afficher/masquer le mot de passe
    //const [, setPassword] = useState<string>(''); // Gérer l'affichage du mot de passe
    const { user } = useUser(); // Récupérer l'utilisateur du contexte
    // Fonction pour afficher l'alerte de confirmation avant suppression
    const showDeleteConfirmation = (): boolean => {
        return window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ?');
    };

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
                console.error('Erreur lors de la récupération des données utilisateur :', error);
            } finally {
                setLoading(false); // Désactivation de l'état de chargement
            }
        };

        fetchUserData();
    }, [user]); // Dépendance à l'utilisateur du contexte

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `https://technovice-app-196e28ed15ce.herokuapp.com/api/users/${id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData), // Envoi des nouvelles données
                },
            );
            if (response.ok) {
                navigate('/'); // Redirection vers la page d'accueil
            }
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des modifications :', error);
        }
    };

    // Fonction pour gérer la suppression du compte
    const handleDelete = async () => {
        if (showDeleteConfirmation()) {
            try {
                const response = await fetch(
                    `https://technovice-app-196e28ed15ce.herokuapp.com/api/users/${id}`,
                    {
                        method: 'DELETE',
                    },
                );
                if (response.ok) {
                    navigate('/'); // Redirection vers l'accueil après suppression
                }
            } catch (error) {
                console.error('Erreur lors de la suppression du compte :', error);
            }
        }
    };

    // Fonction pour déterminer l'icône du rôle de l'utilisateur
    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'Professeur':
                return <FaChalkboardTeacher className="text-white text-lg" />;
            case 'Administrateur':
                return <FaUserShield className="text-white text-lg" />;
            default:
                return <FaUser className="text-white text-lg" />;
        }
    };

    // Fonction pour extraire les initiales du prénom et du nom
    const getInitials = (firstName: string, lastName: string) => {
        const firstInitial = firstName.charAt(0).toUpperCase();
        const lastInitial = lastName.charAt(0).toUpperCase();
        return `${firstInitial}${lastInitial}`;
    };

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (!userData) {
        return <p>Aucun utilisateur trouvé.</p>;
    }

    return (
        <>
            <Header />
            <div className="mt-32 w-screen min-h-screen flex items-center justify-center bg-teal-400 bg-opacity-50 px-4 sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit} className="relative py-3 sm:max-w-xs sm:mx-auto">
                    <div className="flex flex-col justify-center items-center h-full select-none p-6 bg-indigo-600 rounded-t-xl">
                        {/* Ajout des initiales dans le rond */}
                        <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 flex items-center justify-center text-3xl font-bold text-indigo-800">
                            {getInitials(userData?.first_name, userData?.last_name)}
                        </div>
                        <h2 className="text-white text-2xl font-semibold">
                            {userData?.first_name} {userData?.last_name}
                        </h2>
                        <h3 className="text-white text-lg flex items-center gap-2">
                            {userData?.nickname}
                            <span className="flex items-center gap-1">
                                {getRoleIcon(userData?.role_name)} ({userData?.role_name})
                            </span>
                        </h3>
                    </div>

                    <div className="min-h-96 px-8 py-4 text-left bg-white rounded-b-xl shadow-lg">
                        <div className="w-full flex flex-col gap-1">
                            <label className="font-semibold">Nom</label>
                            <input
                                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full"
                                placeholder="Votre nom..."
                                type="text"
                                name="lastname"
                                defaultValue={userData?.last_name}
                                onChange={e => setUserData({ ...userData, last_name: e.target.value })}
                            />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <label className="font-semibold">Prénom</label>
                            <input
                                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full"
                                placeholder="Votre prénom..."
                                type="text"
                                name="firstname"
                                defaultValue={userData?.first_name}
                                onChange={e => setUserData({ ...userData, first_name: e.target.value })}
                            />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <label className="font-semibold">Email</label>
                            <input
                                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full"
                                placeholder="Votre email..."
                                type="email"
                                name="email"
                                defaultValue={userData?.mail}
                                onChange={e => setUserData({ ...userData, mail: e.target.value })}
                            />
                        </div>
                        {/*}
                        <div className="w-full flex flex-col gap-1 relative">
                            <label className="font-semibold">Mot de passe</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full"
                                placeholder="••••••••"
                                value={userData?.password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            {/*}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-9">
                                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </button>
                            
                        </div>
                        {*/}
                        <div className="mt-5">
                            <button
                                type="submit"
                                className="py-1 px-8 bg-sky-500 hover:bg-sky-700 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none">
                                Sauvegarder
                            </button>
                        </div>

                        <div className="w-full flex flex-col gap-2 mt-4">
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="text-red-500 font-semibold mt-4 hover:underline">
                                Supprimer son compte
                            </button>
                        </div>
                        <div className="text-center pt-3">
                            <button
                                className="text-teal-500 font-semibold hover:underline"
                                onClick={() => navigate('/')}>
                                Retour à l'accueil
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Profile;
