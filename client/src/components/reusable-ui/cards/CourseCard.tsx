import type CourseTypes from '@/components/types/CourseTypes';
import { useUser } from '@/context/UserContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../Button';

interface CourseCardProps {
    course: CourseTypes;
    variant?: 'public' | 'dashboard';
    className?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, variant = 'public', className }) => {
    const navigate = useNavigate();
    const { user } = useUser();

    const handleCourseClick = () => {
        navigate(`/cours/${course.course_id}`);
    };

    const handleFollowClick = async () => {
        // Logique pour suivre le cours
        if (user) {
            await fetch(
                `https://technovice-app-196e28ed15ce.herokuapp.com/api/watches/courses/${course.course_id}/users/${user.user_id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                },
            );
        }
        navigate(`/cours/${course.course_id}`);
    };

    const handleUnfollowClick = async () => {
        await fetch(
            `https://technovice-app-196e28ed15ce.herokuapp.com/api/watches/courses/${course.course_id}/users/${user?.user_id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            },
        );
        navigate(`/tableau-de-bord`);
    };

    return (
        <div
            className={`bg-white border-2 border-indigo-600 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col ${className || ''}`}>
            <div className="relative z-10">
                <img
                    className="rounded-t-lg object-cover h-40 w-full"
                    src="https://picsum.photos/600/400"
                    alt={course.course_title}
                />
                <div className="absolute top-2 left-2 flex flex-wrap">
                    {course.course_tags.map(tag => (
                        <div key={tag} className="bg-blue-600 text-white text-xs px-2 py-1 mr-2 rounded">
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-4 flex-grow">
                <p className="text-xs text-gray-500 mb-2">Enseignant: {course.author_user_id}</p>
                <h5 className="text-lg font-bold mb-2">{course.course_title}</h5>
                <p className="text-sm text-gray-600 mb-4">{course.course_desc}</p>

                {variant === 'public' ? (
                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 sm:justify-between">
                        <Button label="Voir" version="primary" onClick={handleCourseClick} />
                        {user ? (
                            <Button label="S'inscrire" version="tertiary" onClick={handleFollowClick} />
                        ) : null}
                    </div>
                ) : (
                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 sm:justify-between">
                        <Button label="Continuer le cours" version="primary" onClick={handleCourseClick} />
                        <Button label="Arrêter de suivre" version="danger" onClick={handleUnfollowClick} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseCard;
