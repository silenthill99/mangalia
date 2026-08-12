import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} | ${appName}`,
    progress: {
        color: '#4B5563',
    },
    withApp: (app) => (
        app
    )
});

// This will set light / dark mode on load...
initializeTheme();
