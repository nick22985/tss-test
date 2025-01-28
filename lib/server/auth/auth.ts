import { betterAuth, Session, User } from "better-auth";
import Database from "better-sqlite3";

export type Auth =
	| { isAuthenticated: false; user: null; session: null }
	| { isAuthenticated: true; user: User; session: Session };

export const auth = betterAuth({
	trustedOrigins: process.env!.BETTER_AUTH_TRUSTED_ORIGINS!.split(',') ,
    database: new Database("./sqlite.db"),
	emailAndPassword: {
		enabled: true,
		autoSignIn: true
  },
});
