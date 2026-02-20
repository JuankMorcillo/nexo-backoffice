'use client';

import React, { useEffect, useState } from 'react'

type initialsProps = {
    name?: string;
    lastName?: string;
}

export default function useUserInitials({ name, lastName }: initialsProps) {

    const [color, setColor] = useState('')
    const [initials, setInitials] = useState('')

    function stringToColor(name: string) {
        // Simple hash to generate a color from a string
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        // Convert hash to hex color
        let color = '#';
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xff;
            color += ('00' + value.toString(16)).slice(-2);
        }
        return color;
    }

    function getInitials(name: string, lastName: string) {
        const n = name ? name.trim().split(' ')[0][0] : '';
        const a = lastName ? lastName.trim().split(' ')[0][0] : '';
        return (n + a).toUpperCase();
    }

    useEffect(() => {

        if (name || lastName) {
            setColor(stringToColor((name || '') + (lastName || '')));
            setInitials(getInitials(name || '', lastName || ''));
        }

    }, [name, lastName])

    return { color, initials };

}