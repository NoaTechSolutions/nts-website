// Constantes de tema server-safe (SIN "use client"): se importan tanto desde el
// server (app/layout.tsx, que resuelve la cookie y SSR la clase `dark`) como
// desde el cliente (app/components/theme-provider.tsx). Importar un valor desde
// un módulo "use client" hacia un server component da una referencia de cliente,
// no el string real → por eso la clave vive acá.

export type Theme = "light" | "dark";

export const themeStorageKey = "ntssign-theme";
