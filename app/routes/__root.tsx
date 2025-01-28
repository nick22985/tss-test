import { QueryClient } from '@tanstack/react-query'
import {
  Link,
  Outlet,
  ScriptOnce,
  ScrollRestoration,
  createRootRoute,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Meta, Scripts } from '@tanstack/start'
import { getAuthSessionOptions } from 'lib/server/auth/auth-functions'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import { getThemeCookie, useThemeStore } from '~/components/ThemeToggle'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  loader: async () => {
    const themeCookie = await getThemeCookie()
    console.log('themeCookie', themeCookie)
    return {
      themeCookie,
    }
  },
  beforeLoad: async ({ context }) => {
		const auth = await context.queryClient.ensureQueryData(
			getAuthSessionOptions()
		)
    console.log('auth', auth)

		return { auth };
	},
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { themeCookie } = Route.useLoaderData()
  React.useEffect(() => {
    useThemeStore.setState({ mode: themeCookie })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const themeClass = themeCookie === 'dark' ? 'dark' : ''
  console.log('themeClass client', themeClass)
  console.log('themeCookie', themeCookie)

  return (
    <html lang="en" className={themeClass}>
      <head>
      {themeCookie === 'auto' ? (
					<ScriptOnce
						children={`window.matchMedia('(prefers-color-scheme: dark)').matches ? document.documentElement.classList.add('dark') : null`}
					/>
				) : null}
        <Meta />
      </head>
      <body>
        <hr />
        {children}
        <ScrollRestoration />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
