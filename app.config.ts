import { defineConfig } from '@tanstack/start/config'
import tsConfigPaths from 'vite-tsconfig-paths'
import type { App } from "vinxi";

const tanstackApp = defineConfig({
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
  },
})

const routers = tanstackApp.config.routers.map((r) => {
	return {
		...r,
		middleware: r.target === "server" ? "./app/middleware.tsx" : undefined,
	};
});

const app: App = {
	...tanstackApp,
	config: {
		...tanstackApp.config,
		routers: routers,
	},
};

export default app;