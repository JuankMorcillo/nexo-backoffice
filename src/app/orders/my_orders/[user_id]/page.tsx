import React from 'react'
import User_Orders from './user_orders'
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { user_id: string } }): Promise<Metadata> {
    return {
        title: `Mis órdenes - Usuario`,
        description: 'Visualiza tus órdenes pendientes',
    };
}

export default function page() {
    return (
        <User_Orders />
    )
}