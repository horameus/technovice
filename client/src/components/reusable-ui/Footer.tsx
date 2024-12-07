import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer>
            <div className="container border flex max-md:flex-col">
                <div className="md:w-1/3 flex flex-col place-content-center place-items-center py-2">
                    <a href="" className="font-semibold text-indigo-600">
                        Conditions générales
                    </a>
                    <a href="" className="font-semibold text-indigo-600">
                        Informations légales
                    </a>
                    <a href="" className="font-semibold text-indigo-600">
                        Contact                   
                    </a>
                </div>
                <div className="md:w-1/3 flex flex-col place-items-center py-2">
                    <Link to="/">
                        <img src="/img/logo-small.png" alt="Logo de TechnO'vice" className="max-h-8 m-4" />
                    </Link>
                    <img src="/img/logo.png" alt="Logo de TechnO'vice" className="max-h-8" />
                </div>
                <div className="md:w-1/3 flex flex-col place-items-center py-2">
                    <p className="font-semibold text-indigo-600">Suivez nous !</p>
                    <ul className="flex flex-row">
                        <li>
                            <a href="">
                                <FaInstagram className="h-10 w-14 text-indigo-600" />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <FaTwitter className="h-10 w-14 text-indigo-600" />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <FaLinkedin className="h-10 w-14 text-indigo-600" />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <FaGithub className="h-10 w-14 text-indigo-600" />
                            </a>
                        </li>
                    </ul>
                    <p>TechnO'vice - 2024</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
