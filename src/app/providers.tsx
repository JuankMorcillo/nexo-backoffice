"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import { store } from "./store";
import Toast from "./components/ui/toast";
import Sidebar from "./components/ui/sidebar";
import Header from "./components/ui/header";

export function Providers({ children }: { children: ReactNode }) {

    return <Provider store={store}>
        <SessionProvider>
            <Toast />
            <Sidebar />
            <Header />
            {children}
        </SessionProvider>
    </Provider>;
}