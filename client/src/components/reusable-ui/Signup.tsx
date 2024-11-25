// Homepage.tsx
import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import api from '../../api';

const USERNAME_REGEX = /^[a-zA-Z0-9]{3,23}$/;
const FIRSTNAME_REGEX = /^[a-zA-Z]{3,23}$/;
const LASTNAME_REGEX = /^[a-zA-Z]{2,23}$/;
const MAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUpComponent = () => {
    const [user, setUser] = useState('');
    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [firstname, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [, setFirstNameFocus] = useState(false);

    const [lastname, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [, setLastNameFocus] = useState(false);

    const [mail, setMail] = useState('');
    const [validMail, setValidMail] = useState(false);
    const [mailFocus, setMailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [role, setRole] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        const result = USERNAME_REGEX.test(user);
        setValidUser(result);
    }, [user]);

    useEffect(() => {
        const result = FIRSTNAME_REGEX.test(firstname);
        setValidFirstName(result);
    }, [firstname]);

    useEffect(() => {
        const result = LASTNAME_REGEX.test(lastname);
        setValidLastName(result);
    }, [lastname]);

    useEffect(() => {
        const result = MAIL_REGEX.test(mail);
        setValidMail(result);
    }, [mail]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
    }, [pwd]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, firstname, lastname, pwd, matchPwd, role]);

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        console.log('Submit');
        event.preventDefault();
        if (!validUser || !validMail || !validFirstName || !validLastName || !validPwd || !validMatch) {
            console.log('Invalid form');
            setErrMsg('Veuillez remplir correctement tous les champs');
            return;
        }
        console.log('User:', user);
        console.log('Mail:', mail);
        console.log('First Name:', firstname);
        console.log('Last Name:', lastname);
        console.log('Password:', pwd);
        console.log('Role:', role);

        try {
            const response = await api.post(
                '/api/users',
                JSON.stringify({
                    nickname: user,
                    mail: mail,
                    password: pwd,
                    first_name: firstname,
                    last_name: lastname,
                    role_name: role,
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                },
            );
            console.log(JSON.stringify(response?.data));
            console.log(response.status);
            console.log(JSON.stringify(response));
            setSuccess(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {success === true ? (
                <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-teal-400 bg-opacity-50 px-4 sm:px-6 lg:px-8 ">
                    <div className="relative py-3 sm:max-w-xs sm:mx-auto">
                        <div className="flex flex-col justify-center items-center h-full select-none p-6 bg-indigo-600 rounded-t-xl">
                            <img className="max-w-20" src="img/logo-small.png" alt="" />
                        </div>
                        <div className="px-8 py-4 text-left bg-white rounded-b-xl shadow-lg">
                            <div className="flex flex-col justify-center items-center h-full select-none">
                                <div className="flex flex-col items-center justify-center gap-2 mb-4"></div>
                                <section className="flex flex-col items-center">
                                    <h1 className="text-center">
                                        Votre compte a été créé ! Vous pouvez maintenant vous connecter
                                    </h1>
                                    <p className="text-indigo-600 hover:text-indigo-800 font-semibold py-8">
                                        <Link to="/connexion">Page de connexion</Link>
                                    </p>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <section>
                    <p className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
                    <div className="w-screen min-h-screen flex items-center justify-center bg-teal-400 bg-opacity-50 px-4 sm:px-6 lg:px-8">
                        <form
                            action="post"
                            className="relative py-3 sm:max-w-xs sm:mx-auto"
                            onSubmit={handleSubmit}>
                            <div className="flex flex-col justify-center items-center h-full select-none p-6 bg-indigo-600 rounded-t-xl">
                                <img className="max-w-20" src="img/logo-small.png" alt="" />
                            </div>
                            <div className="min-h-96 px-8 py-4 text-left bg-white rounded-b-xl shadow-lg">
                                <div className="flex flex-col justify-center items-center h-full select-none">
                                    <div className="flex flex-col items-center justify-center gap-2 mb-4">
                                        <h1 className="m-0 font-semibold text-2xl">Inscrivez-vous!</h1>
                                        <span className="m-0 text-xs text-center">
                                            Rejoignez-nous pour accéder à tous nos services, c'est gratuit et
                                            ça ne vous prendra que deux minutes!
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-1">
                                    <label className="font-semibold">
                                        Votre nom d'utilisateur :
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className={validUser ? 'valid' : 'hide'}
                                        />
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            className={validUser ? 'hide' : 'invalid'}
                                        />
                                    </label>
                                    <input
                                        className="border rounded-lg px-3 py-2 mb-5 text-sm w-full"
                                        placeholder="Votre nom d'utilisateur..."
                                        type="text"
                                        name="username"
                                        onChange={e => setUser(e.target.value)}
                                        onFocus={() => setUserFocus(true)}
                                        onBlur={() => setUserFocus(false)}
                                        required
                                    />
                                    <p
                                        className={
                                            userFocus && user && !validUser ? 'instructions' : 'offscreen'
                                        }>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        De 3 à 23 caractères
                                        <br />
                                        Les minuscules, majuscules et chiffres sont autorisés
                                        <br />
                                    </p>
                                </div>
                                <div className="w-full flex flex-col gap-1">
                                    <label className="font-semibold">
                                        Votre adresse mail :
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className={validMail ? 'valid' : 'hide'}
                                        />
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            className={validMail || !user ? 'hide' : 'invalid'}
                                        />
                                    </label>
                                    <input
                                        className="border rounded-lg px-3 py-2 mb-5 text-sm w-full"
                                        placeholder="Votre email..."
                                        type="text"
                                        name="email"
                                        onChange={e => setMail(e.target.value)}
                                        onFocus={() => setMailFocus(true)}
                                        onBlur={() => setMailFocus(false)}
                                        required
                                    />
                                    <p
                                        className={
                                            mailFocus && mail && !validMail ? 'instructions' : 'offscreen'
                                        }>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        Les adresses mail sont au format "xxxxxx@xxxxxx.xx", exemple :
                                        "martinedupont@gmail.com"
                                    </p>
                                </div>
                                <div className="w-full flex flex-col gap-1">
                                    <label className="font-semibold">
                                        Votre prénom:
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className={validFirstName ? 'valid' : 'hide'}
                                        />
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            className={validFirstName || !user ? 'hide' : 'invalid'}
                                        />
                                    </label>
                                    <input
                                        className="border rounded-lg px-3 py-2 mb-5 text-sm w-full"
                                        placeholder="Votre prénom..."
                                        type="text"
                                        name="firstname"
                                        onChange={e => setFirstName(e.target.value)}
                                        onFocus={() => setFirstNameFocus(true)}
                                        onBlur={() => setFirstNameFocus(false)}
                                        required
                                    />
                                </div>
                                <div className="w-full flex flex-col gap-1">
                                    <label className="font-semibold">
                                        Votre nom de famille:
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className={validLastName ? 'valid' : 'hide'}
                                        />
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            className={validLastName || !user ? 'hide' : 'invalid'}
                                        />
                                    </label>
                                    <input
                                        className="border rounded-lg px-3 py-2 mb-5 text-sm w-full"
                                        placeholder="Votre nom..."
                                        type="text"
                                        name="lastname"
                                        onChange={e => setLastName(e.target.value)}
                                        onFocus={() => setLastNameFocus(true)}
                                        onBlur={() => setLastNameFocus(false)}
                                        required
                                    />
                                </div>
                                <div className="w-full flex flex-col gap-1">
                                    <label className="font-semibold">
                                        Mot de passe:
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className={validPwd ? 'valid' : 'hide'}
                                        />
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            className={validPwd || !user ? 'hide' : 'invalid'}
                                        />
                                    </label>
                                    <div className="flex flex-row">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            className="border rounded-lg px-3 py-2 mb-5 text-sm w-full"
                                            placeholder="••••••••"
                                            onChange={e => setPwd(e.target.value)}
                                            onFocus={() => setPwdFocus(true)}
                                            onBlur={() => setPwdFocus(false)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="flex">
                                            {showPassword ? (
                                                <AiFillEyeInvisible className="place-items-center w-8" />
                                            ) : (
                                                <AiFillEye className="place-items-center w-8" />
                                            )}
                                        </button>
                                    </div>

                                    <p
                                        className={
                                            pwdFocus && pwd && !validPwd ? 'instructions' : 'offscreen'
                                        }>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        De 8 à 24 caractères
                                        <br />
                                        Les minuscules, majuscules, chiffres et caractères spéciaux sont
                                        autorisés
                                        <br />
                                        Votre mot de passe doit contenir au moins une minuscule, une
                                        majuscule, un chiffre et un caractère spécial (!, @, #, $ ou %)
                                    </p>
                                </div>
                                <div className="w-full flex flex-col gap-1">
                                    <label className="font-semibold" htmlFor="confirm_pwd">
                                        Confirmez votre mot de passe:
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className={validMatch ? 'valid' : 'hide'}
                                        />
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            className={validMatch || !user ? 'hide' : 'invalid'}
                                        />
                                    </label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password-confirm"
                                        className="border rounded-lg px-3 py-2 mb-5 text-sm w-full"
                                        placeholder="••••••••"
                                        onChange={e => setMatchPwd(e.target.value)}
                                        onFocus={() => setMatchFocus(true)}
                                        onBlur={() => setMatchFocus(false)}
                                        required
                                    />
                                    <p
                                        className={
                                            matchFocus && matchPwd && !validMatch
                                                ? 'instructions'
                                                : 'offscreen'
                                        }>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        Les mots de passe doivent être identiques
                                    </p>
                                </div>
                                <div className="w-full flex flex-col gap-1">
                                    <label className="font-semibold" htmlFor="role">
                                        Je souhaite m'inscrire en tant que :
                                    </label>
                                    <div className="flex flex-row gap-1">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="Étudiant"
                                            checked={role === 'Étudiant'}
                                            onChange={e => setRole(e.target.value)}
                                        />
                                        <label htmlFor="role">Étudiant</label>
                                    </div>
                                    <div className="flex flex-row">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="Professeur"
                                            checked={role === 'Professeur'}
                                            onChange={e => setRole(e.target.value)}
                                        />
                                        <label htmlFor="role"> Professeur</label>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <button
                                        onClick={handleSubmit}
                                        type="submit"
                                        className="py-1 px-8 bg-sky-500 hover:bg-sky-700 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none">
                                        S'inscrire
                                    </button>
                                </div>
                                <div className="w-full flex flex-col gap-2 mt-4">
                                    <Link
                                        className="font-semibold text-sm text-center text-indigo-600 hover:underline hover:underline-offset-2"
                                        to="/connexion">
                                        Déjà un compte ? Connectez-vous ici !
                                    </Link>
                                    <Link
                                        className="font-semibold text-sm text-center text-indigo-600 hover:underline hover:underline-offset-2"
                                        to="/">
                                        Retour à l'accueil
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            )}
        </>
    );
};

export default SignUpComponent;
