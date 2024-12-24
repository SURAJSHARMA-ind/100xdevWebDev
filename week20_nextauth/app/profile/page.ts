import { getServerSession } from "next-auth"

export default async function page() {
  const session = getServerSession();
  const userprofile = session.user;
  return (
    <div>
    { userprofile.name }
    </div>
  )
}
