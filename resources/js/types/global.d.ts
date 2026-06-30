import "@inertiajs/core"

declare module "@inertiajs/core" {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            quote: { message: string; author: string };
            auth: Auth;
            ziggy: Config & { location: string };
            sidebarOpen: boolean;
            [key: string]: unknown;
            is_admin?: boolean;
        };
    }
}
