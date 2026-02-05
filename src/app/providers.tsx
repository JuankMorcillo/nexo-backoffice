"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import { store } from "./store";

export function Providers({ children }: { children: ReactNode }) {

    return <Provider store={store}>
        <SessionProvider>{children}</SessionProvider>
    </Provider>;
}