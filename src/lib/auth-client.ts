import { createAuthClient } from "better-auth/react";

// Same-origin, so no baseURL is needed (works locally and on Vercel)
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, updateUser, useSession } = authClient;