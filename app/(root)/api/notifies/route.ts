import { NextResponse } from 'next/server';
import { desc } from 'drizzle-orm';
import { db, notifications } from '@/app/actions';
import { clerkClient } from '@clerk/nextjs/server';
import _ from "lodash"
import { User } from '../../dashboard/messages/messagesComponent';

export async function GET(request: Request) {
  try {
    const { data } = await clerkClient().users.getUserList();
    const users: User[] = data
      .filter(d => d.emailAddresses[0].emailAddress !== "mahmoud7samirr@gmail.com")
      .map(d => ({
        id: d.id,
        email: d.emailAddresses[0].emailAddress,
        avatar: d.imageUrl,
      }));

    const userNotifications = await db.select()
      .from(notifications)
      .orderBy(desc(notifications.created_at))
      .limit(10);

    const count = userNotifications.reduce((acc, notification) => notification.unread ? acc + 1 : acc, 0);

    return NextResponse.json({ users, notifications: userNotifications, count });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}