import type TopicTypes from '@/components/types/TopicTypes';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

interface TopicCardProps {
    topic: TopicTypes;
    variant?: 'public' | 'dashboard';
    className?: string;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, className }) => {
    const navigate = useNavigate();

    const handleTopicClick = () => {
        navigate(`/forums/${topic.topic_id}`);
    };

    return (
        <div
            className={`bg-white border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col ${className || ''}`}>
            <div className="relative z-10">
                <img
                    className="rounded-t-lg object-cover h-40 w-full"
                    src="https://placehold.co/600x400"
                    alt={topic.topic_title}
                />
                <div className="absolute top-2 right-2 flex flex-wrap">
                    {topic.topic_tag.map(tag => (
                        <div key={tag} className="bg-indigo-600 text-white text-xs px-2 py-1 mr-2 rounded">
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-4 flex-grow">
                <h5 className="text-lg font-bold mb-2">{topic.topic_title}</h5>
                <p className="text-sm text-gray-600 mb-4">{topic.topic_content}</p>
                {topic.topic_date && (
                    <p className="text-xs text-gray-400 mb-4">
                        {new Date(topic.topic_date).toLocaleDateString()}
                    </p>
                )}
                <div className="flex justify-center">
                    <Button label="Voir ce forum" version="primary" onClick={handleTopicClick} />
                </div>
            </div>
        </div>
    );
};

export default TopicCard;
