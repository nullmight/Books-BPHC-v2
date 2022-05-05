import { useSession, signIn, signOut } from "next-auth/react"
import Button from '@mui/material/Button';
import Link from '../src/Link';

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} {' '} <br />
        <Button variant="contained" component={Link} noLinkStyle href="/"
      onClick={() => signOut()}>
          Sign out
        </Button>
      </>
    )
  }
  return (
    <>
      <Button variant="contained" component={Link} noLinkStyle href="/"
      onClick={() => signIn()}>
          Sign in
        </Button>
    </>
  )
}