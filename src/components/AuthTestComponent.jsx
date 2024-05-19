// src/components/AuthTestComponent.js (if using custom src directory)

import { signIn, signOut, useSession } from "next-auth/react";

const AuthTestComponent = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {session ? (
        <>
          <p>Signed in as {session.user.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <p>Not signed in</p>
          <button onClick={() => signIn("google")}>Sign in with Google</button>
        </>
      )}
    </div>
  );
};

export default AuthTestComponent;
