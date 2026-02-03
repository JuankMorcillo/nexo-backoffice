import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PUBLIC_ROUTES = [
    '/login',
];

export async function proxy(request) {

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    });

    const path = request.nextUrl.pathname;

    const isPublicPath = PUBLIC_ROUTES.some(route => {
        // Check if the route is a dynamic route
        if (route.includes('[') && route.includes(']')) {
            const dynamicRoute = route.replace(/\[.*?\]/g, '([^/]+)');
            const regex = new RegExp(`^${dynamicRoute}$`);
            return regex.test(path);
        }
        // Check for exact match
        return path === route;
    });

    // Si la ruta no es pública y no hay token, redirige a login
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL(`/login`, request.url));
    }

    // Si hay token y está en login, redirige a home
    if (token && path === '/login') {
        return NextResponse.redirect(new URL(`/`, request.url));
    }

    // Si hay token, chequea permisos
    if (token) {
        // const haveAccess = DoesRoleHaveAccessToURL(token?.role, path);
        // if (!haveAccess) {
        //     return NextResponse.redirect(new URL(`${BASE_PATH}/`, request.url));
        // }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|images/|audio/).*)',
};
