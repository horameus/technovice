import { useUser } from '@/context/UserContext';
import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';

const Header: React.FC = () => {
    const { user, setUser } = useUser();

    const handleDisconnect = async () => {
        // Disconnect the user
        if (user) {
            localStorage.removeItem('accessToken');
            setUser(null);
        }
    };

    return (
        <header className="flex fixed border-b top-0 left-0 w-full z-50 bg-white shadow-md">
            <div className="max-md:hidden container flex flex-col place-items-center w-1/5">
                <Link to="/">
                    <img src="/img/logo.png" alt="Logo de TechnO'vice" className="" />
                </Link>
                <h1 className="text-center text-lg text-sky-500 font-semibold">Ne restez plus un novice!</h1>
            </div>

            <div className="md:hidden container w-1/4">
                <Link to="/">
                    <img src="/img/logo-small.png" alt="Logo de TechnO'vice" className="max-h-16" />
                </Link>
            </div>

            <div className="flex place-content-center container w-2/5 max-md:w-1/4">
                <div className="group relative cursor-pointer place-content-center">
                    <div className="flex items-center justify-between space-x-2 border-teal-400 border rounded-lg min-h-12 p-3">
                        <a className="menu-hover text-base text-black">Parcourir</a>
                        <span>
                            <IoIosArrowDown className="h-6 w-6" />
                        </span>
                    </div>

                    <div className="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible rounded-lg">
                        <Link
                            to="/forums"
                            className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-indigo-600 md:mx-2">
                            Forum
                        </Link>
                        <Link
                            to="/catalogue-des-cours"
                            className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-indigo-600 md:mx-2">
                            Catalogue
                        </Link>
                        {user ? (
                            <>
                                <Link
                                    to="/profil"
                                    className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-indigo-600 md:mx-2">
                                    Profile
                                </Link>
                                <Link
                                    to="/tableau-de-bord"
                                    className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-indigo-600 md:mx-2">
                                    Tableau de bord
                                </Link>
                                <button
                                    onClick={() => {
                                        handleDisconnect();
                                    }}
                                    className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-indigo-600 md:mx-2">
                                    Se déconnecter
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/connexion"
                                    className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-indigo-600 md:mx-2">
                                    Connexion
                                </Link>
                                <Link
                                    to="/inscription"
                                    className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-indigo-600 md:mx-2">
                                    Inscription
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                <div className="max-md:hidden max-w-[480px] w-full pl-4 place-content-center">
                    <Searchbar
                        searchKeys={['course_title', 'course_tags']} // Keys to search on
                        mobile={false}
                    />
                </div>
            </div>

            <div className="max-md:w-1/2 container w-2/5 place-content-center">
                <nav className="font-semibold">
                    <ul className="flex justify-around items-center">
                        {' '}
                        {user ? (
                            <>
                                <li>
                                    <Link
                                        to="/tableau-de-bord"
                                        className="text-indigo-600 hover:text-indigo-800 max-md:hidden">
                                        Tableau de bord
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/profil"
                                        className="text-indigo-600 hover:text-indigo-800 max-md:hidden">
                                        Profil
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link
                                    to="/inscription"
                                    className="text-indigo-600 hover:text-indigo-800 max-md:hidden">
                                    S'inscrire
                                </Link>
                            </li>
                        )}
                        <li>
                            {' '}
                            {user ? (
                                <button
                                    onClick={() => {
                                        handleDisconnect();
                                    }}
                                    className="text-indigo-600 hover:text-indigo-800 max-md:hidden">
                                    Se déconnecter
                                </button>
                            ) : (
                                <Link
                                    to="/connexion"
                                    className="text-indigo-600 hover:text-indigo-800 max-md:hidden">
                                    Se connecter
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
