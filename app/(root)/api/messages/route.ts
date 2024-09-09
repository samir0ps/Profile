import { db, messages, notifications } from "@/app/actions"
import { auth, clerkClient } from "@clerk/nextjs/server"
import { asc, eq, or } from "drizzle-orm"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    const { json } = NextResponse
    try {
        const { from, to, content } = await req.json()
        if (!from || !to || !content) {
            return json({ message: "Some credentials missing" }, { status: 400 })
        }
        const [createdMessage] = await db.insert(messages).values({ from, to, content }).returning({ id: messages.id })
        if (!createdMessage) {
            return json({ message: "Couldn't send the message!" }, { status: 500 })
        }
        if(from !== "mahmoud7samirr@gmail.com"){
            await db.insert(notifications).values({ title: 'New Message', sender:from }).then(message=>{console.log("done.....")}).catch(err=>{
                throw new Error(err.message)
            })
        }
        
        return json({ message: "Message sent successfully" })
    } catch (error: any) {
        console.error(error.message)
        return json({ message: error.message }, { status: 500 })
    }
}

export const GET = async () => {
    const { json } = NextResponse
    try {
        const { userId } = auth()
        if (!userId) {
            return json({ message: "Please login first" }, { status: 401 })
        }
        const user = await clerkClient().users.getUser(userId)
        const userEmail = user.emailAddresses[0]?.emailAddress
        if (!userEmail) {
            return json({ message: "Couldn't get the user" }, { status: 404 })
        }
        const Messages = await db
            .select()
            .from(messages)
            .where(or(eq(messages.from, userEmail), eq(messages.to, userEmail)))
            .orderBy(asc(messages.created_at))
        if (!Messages.length) {
            return json({ message: "No messages found" }, { status: 404 })
        }
        
        return json( Messages)
    } catch (error) {
        console.error(error)
        return json(
            { message: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: 500 }
        )
    }
}