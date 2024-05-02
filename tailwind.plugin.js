export const plugins = [
    ({ addUtilities }) => {
        addUtilities({
            ".flex": {
                "&-col": {
                    "&-center": {
                        "@apply flex flex-col items-center": {},
                        "&-center": {
                            "@apply flex flex-col items-center justify-center": {},
                        },
                        "&-between": {
                            "@apply flex flex-col items-center justify-between": {},
                        },
                        "&-start": {
                            "@apply flex flex-col items-center justify-start": {},
                        },
                        "&-end": { "@apply flex flex-col items-center justify-end": {} },
                        "&-around": {
                            "@apply flex flex-col items-center justify-around": {},
                        },
                        "&-evenly": {
                            "@apply flex flex-col items-center justify-evenly": {},
                        },
                    },
                    "&-start": {
                        "@apply flex flex-col items-start": {},
                        "&-center": {
                            "@apply flex flex-col items-start justify-center": {},
                        },
                        "&-between": {
                            "@apply flex flex-col items-start justify-between": {},
                        },
                        "&-start": {
                            "@apply flex flex-col items-start justify-start": {},
                        },
                        "&-end": { "@apply flex flex-col items-start justify-end": {} },
                        "&-around": {
                            "@apply flex flex-col items-start justify-around": {},
                        },
                        "&-evenly": {
                            "@apply flex flex-col items-start justify-evenly": {},
                        },
                    },
                    "&-end": {
                        "@apply flex flex-col items-end": {},
                        "&-center": {
                            "@apply flex flex-col items-end justify-center": {},
                        },
                        "&-between": {
                            "@apply flex flex-col items-end justify-between": {},
                        },
                        "&-start": { "@apply flex flex-col items-end justify-start": {} },
                        "&-end": { "@apply flex flex-col items-end justify-end": {} },
                        "&-around": {
                            "@apply flex flex-col items-end justify-around": {},
                        },
                        "&-evenly": {
                            "@apply flex flex-col items-end justify-evenly": {},
                        },
                    },
                },
                "&-center": {
                    "@apply flex items-center": {},
                    "&-center": { "@apply flex items-center justify-center": {} },
                    "&-between": { "@apply flex items-center justify-between": {} },
                    "&-start": { "@apply flex items-center justify-start": {} },
                    "&-end": { "@apply flex items-center justify-end": {} },
                    "&-around": { "@apply flex items-center justify-around": {} },
                    "&-evenly": { "@apply flex items-center justify-evenly": {} },
                },
                "&-start": {
                    "@apply flex items-start": {},
                    "&-center": { "@apply flex items-start justify-center": {} },
                    "&-between": { "@apply flex items-start justify-between": {} },
                    "&-start": { "@apply flex items-start justify-start": {} },
                    "&-end": { "@apply flex items-start justify-end": {} },
                    "&-around": { "@apply flex items-start justify-around": {} },
                    "&-evenly": { "@apply flex items-start justify-evenly": {} },
                },
                "&-end": {
                    "@apply flex items-end": {},
                    "&-center": { "@apply flex items-end justify-center": {} },
                    "&-between": { "@apply flex items-end justify-between": {} },
                    "&-start": { "@apply flex items-end justify-start": {} },
                    "&-end": { "@apply flex items-end justify-end": {} },
                    "&-around": { "@apply flex items-end justify-around": {} },
                    "&-evenly": { "@apply flex items-end justify-evenly": {} },
                },
            },
        });
    },
];
export const important = true;