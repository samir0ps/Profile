import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { integer, pgTable, primaryKey, serial, text, timestamp, uuid ,boolean } from 'drizzle-orm/pg-core';
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);



export const projects = pgTable('projects', {
    id: uuid('id').default('gen_random_uuid()').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    imageUrl : text('imageurl').notNull()
  });
  export const notifications = pgTable('notifications' , {
    id : serial('id').primaryKey() ,
    sender: text('sender').notNull(),
    title:text('title').notNull() , 
    unread:boolean('unread').notNull().default(true),
    created_at : timestamp("created_at").defaultNow().notNull()
  })
export const messages = pgTable('message', {
    id: serial('id').primaryKey(),
    from: text('from').notNull(),
    to: text('to').notNull(),
    content:text("content").notNull(),
    created_at : timestamp("created_at").defaultNow().notNull()
  });
  export const handlegettingProjects = async()=>{
    
      try {
        const proj =await db.select().from(projects)
        return proj
      } catch (error:any) {
        console.log(error.message)
      }

  }
  export const handleGettingNotifications = async()=>{
    try {
      const Notifications = await db.select().from(notifications)
      return Notifications
    } catch (error:any) {
      console.log(error.message)
      
    }
  }
