// vite-env.d.ts
/// <reference types="vite/client" />

//environment variables
interface ImportMetaEnv {
    readonly VITE_ClubCore_Server_API: string;
    // Add other environment variables as needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
