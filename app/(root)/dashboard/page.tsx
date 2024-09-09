import Navbar from "@/app/ui/components/admincomponents/navbar"
import { clerkClient } from "@clerk/nextjs/server"
import Dashboard from "./users"
import { User } from "@clerk/nextjs/server"

const Page = async () => {
    const response = await clerkClient().users.getUserList()
    const users = response.data.map((user: User) => ({
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        imageUrl : user.imageUrl
    }))
    return (
        <div>
            <Dashboard users={users as any} />
            <Navbar />
        </div>
    )
}

export default Page