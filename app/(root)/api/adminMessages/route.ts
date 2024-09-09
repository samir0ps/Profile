import { db, messages, notifications } from "@/app/actions";
import { eq, or } from "drizzle-orm";
import { NextResponse } from "next/server";

const createJsonResponse = (data: any, status = 200) => NextResponse.json(data, { status });

export const POST = async (req: Request) => {
    try {
        const { from, to, content } = await req.json();
        
        if (!from || !to || !content) {
            return createJsonResponse({ error: "Missing required fields" }, 400);
        }

        const [createdMessage] = await db.insert(messages)
            .values({ from, to, content })
            .returning({ id: messages.id });

        if (!createdMessage) {
            return createJsonResponse({ error: "Failed to send message" }, 500);
        }

        return createJsonResponse({ message: "Message sent successfully", id: createdMessage.id });
    } catch (error: any) {
        console.error("Error sending message:", error.message);
        return createJsonResponse({ error: "Internal server error" }, 500);
    }
};

export const GET = async (req: Request) => {
    try {
        const url = new URL(req.url)
        const searchParams = url.searchParams
        const chatRoom = searchParams.get('chat-room')
        if(!chatRoom){
            throw new Error("cannot find empty chat room")
        }
        const messagesList = await db.select()
            .from(messages)
            .where(or(eq(messages.from, chatRoom), eq(messages.to, chatRoom)))
            .orderBy(messages.created_at);

        return createJsonResponse({messages: messagesList });
    } catch (error: any) {
        console.error("Error fetching messages:", error.message);
        return createJsonResponse({ error: "Internal server error" }, 500);
    }
};
export const PUT = async (req: Request) => {
    try {
        const { email } = await req.json()
        if (!email) {
            return createJsonResponse({ error: "Cannot find the email" }, 400)
        }
        await db.update(notifications)
            .set({ unread: false })
            .where(eq(notifications.sender, email))
        return createJsonResponse({ message: "Notifications updated successfully" })
    } catch (error: any) {
        console.error("Error updating notifications:", error.message)
        return createJsonResponse({ error: "Internal server error" }, 500)
    }
}