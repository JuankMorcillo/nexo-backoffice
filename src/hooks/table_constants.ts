'use client';

import { useMemo } from "react";
import { createTheme } from '@mui/material';

export function tableConstants() {
    const SHADES = {
        primary: {
            100: "#FFFFFF",
            200: "#999999",
            300: "#666666",
            400: "#333333",
            500: "#000000",
            600: "#000000",
        },
        secondary: {
            100: "#f7ccd2",
            200: "#ef99a4",
            300: "#e66677",
            400: "#de3349",
            500: "#FFFFFF",
            600: "#ab0016",
            700: "#800011",
            800: "#56000b",
            900: "#2b0006",
        },
        neutral: {
            100: "#f5f5f5",
            200: "#ecebeb",
            300: "#e2e1e1",
            400: "#d9d7d7",
            500: "#cfcdcd",
            600: "#212631",
        },
    };

    const BASEBACKGROUNDCOLOR = 'rgba(0, 0, 0, 0)';

    const TABLETHEME = useMemo(() => createTheme({
        palette: {
            primary: {
                main: SHADES.primary[600],
            },
            text: {
                primary: SHADES.primary[600],
                secondary: SHADES.primary[600],
            },
            background: {
                default: SHADES.primary[600],
                paper: SHADES.primary[100],
            },
        }
    }), [])

    return { SHADES, BASEBACKGROUNDCOLOR, TABLETHEME }

}



