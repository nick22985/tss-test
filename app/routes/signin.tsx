import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { authClient } from '~/utils/authClient'

export const Route = createFileRoute('/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState<File | null>(null)

	const router = useRouter();

  const signUp = async () => {
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          router.history.push("/")
        },
        onError: (ctx) => {
          alert(ctx.error.message)
        },
      },
    )
    console.log('data', data)
    console.log('error', error)

  }

  return (
    <div>
      email:
      <input
        type="email"
        value={email}
        className="bg-white border-solid border-2 outline-black"
        onChange={(e) => setEmail(e.target.value)}
      />
      password:
      <input
        type="password"
        value={password}
        className="bg-white border-solid border-2 outline-black"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signUp}>Sign in</button>
    </div>
  )
}

