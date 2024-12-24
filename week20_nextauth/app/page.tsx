"use client";
import { useSession, SessionProvider, signOut  } from "next-auth/react";
import { useRouter } from 'next/navigation'

export default  function Home() {

  return <SessionProvider>
    <RealHome />
  </SessionProvider>
}


function RealHome() {
  const session = useSession();
  const router = useRouter();
  {
    if (session.status === "authenticated") {
      return <div>
        <h1>{JSON.stringify(session)}</h1>
        <button className="p-2 bg-red-300" onClick={()=>signOut()}>Logut</button>
      </div>
    }
    else {
      return <div>
        <button className="p-2 bg-green-300" onClick={()=>router.push('/api/auth/signin')}>Login</button>
      </div>
    }
}


}