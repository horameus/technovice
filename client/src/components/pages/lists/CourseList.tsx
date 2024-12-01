import type CourseTypes from '@/components/types/CourseTypes';
import type WatchesTypes from '@/components/types/WatchesTypes';
import { useUser } from '@/context/UserContext';
import React, { useEffect, useState } from 'react';
import CourseCard from '../../reusable-ui/cards/CourseCard';

export interface CourseListProps {
    className?: string;
    carouselClassName?: string;
    style?: React.CSSProperties;
    slicer?: number;
    tagFilter?: string;
    variant?: 'public' | 'dashboard';
}

const CourseList: React.FC<CourseListProps> = ({
    className,
    carouselClassName,
    style,
    slicer,
    tagFilter,
    variant = 'public',
}) => {
    const [courses, setCourses] = useState<CourseTypes[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { user } = useUser();
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                if (variant === 'dashboard') {
                    const response = await fetch(
                        `https://technovice-app-196e28ed15ce.herokuapp.com/api/watches/users/${user?.user_id}`,
                    );

                    if (!response.ok) {
                        throw new Error('Failed to fetch courses');
                    }

                    const watchesData: WatchesTypes[] = await response.json();
                    const coursesIds = watchesData.map(watch => watch.course_id);
                    const responseCourses = await fetch(
                        `https://technovice-app-196e28ed15ce.herokuapp.com/api/courses`,
                    );

                    if (!responseCourses.ok) {
                        throw new Error('Failed to fetch courses');
                    }
                    let data: CourseTypes[] = await responseCourses.json();
                    data = data.filter(course => coursesIds.includes(course.course_id));

                    setCourses(data);
                } else {
                    const response = await fetch(
                        `https://technovice-app-196e28ed15ce.herokuapp.com/api/courses`,
                    );
                    if (!response.ok) {
                        throw new Error('Failed to fetch courses');
                    }
                    let data: CourseTypes[] = await response.json();

                    if (tagFilter) {
                        const tagsArray = tagFilter.split(','); // filter by tags
                        data = data.filter(course =>
                            tagsArray.every(tag => course.course_tags.includes(tag)),
                        );
                    }
                    if (slicer) {
                        data = data.slice(0, slicer); // To limit courses displayed
                    }
                    setCourses(data);
                }
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, [slicer, tagFilter, variant]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={className} style={style}>
            {courses.map(course => (
                <CourseCard
                    key={course.course_id}
                    course={course}
                    className={carouselClassName}
                    variant={variant}
                />
            ))}
        </div>
    );
};

export default CourseList;
