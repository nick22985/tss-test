import { createFileRoute, Link } from '@tanstack/react-router'
import { ThemeToggle } from '~/components/ThemeToggle'
import { authClient } from "../utils/authClient";

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { auth } = Route.useRouteContext();
  return (
    <div className="p-2">
			<ThemeToggle />
      <h3>Welcome Home!!!</h3>
      {auth && auth.isAuthenticated ? (
				<div className="flex flex-col gap-2">
					<p>Welcome back, {auth.user?.name}!</p>
					<div>
						More data:
						<pre>{JSON.stringify(auth, null, 2)}</pre>
					</div>

					<button
						onClick={() => {
							authClient.signOut().then(() => {
								window.location.reload();
								window.location.href = "/";
							});
						}}
						className="w-fit"
					>
						Sign out
					</button>
				</div>
			) : (
				<div className="flex flex-col gap-2">
					<p>You are not signed in.</p>
						<Link to="/signin">Sign in</Link>
						<Link to="/signup">Sign up</Link>
				</div>
			)}
    </div>
  )
}
