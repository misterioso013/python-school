import { UserButton } from '@clerk/nextjs'
import { auth, currentUser } from '@clerk/nextjs/server'

export async function UserProfile() {
  const { userId } = auth()
  const user = await currentUser()

  return (
    <div className="flex items-center gap-4 mb-8">
      <UserButton afterSignOutUrl="/" />
      <div>
        <h2 className="text-xl font-semibold">
          Olá, {user?.firstName || "Estudante"}!
        </h2>
        <p className="text-sm text-gray-500">
          Continue de onde parou
        </p>
      </div>
    </div>
  )
}