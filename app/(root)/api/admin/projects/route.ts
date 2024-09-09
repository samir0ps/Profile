import { db, projects } from "@/app/actions"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

const resJson = (message:string , status?:number)=>{
    if(status && status>=400){
    return NextResponse.json({error:message} , {status})
}
    else{
        return NextResponse.json({message})
    }
}
export const POST = async(req:Request)=>{
    try {
        const {title , description , imageUrl} = await req.json()
        if(!title || !description || !imageUrl){
            throw new Error("Some credentials are missing!")
        }
        await db.insert(projects).values({title , description ,imageUrl}).catch(err=>{
            throw new Error(err.message)
        })
        return resJson("Project created successfully")
    } catch (error:any) {
        console.log(error.message)
        return resJson(error.message , 500)
    }
}

export const GET =async (req:Request)=>{
    try {
        const Projects = await db.select().from(projects)
        return NextResponse.json(Projects)
    } catch (error:any) {
        console.log(error.message)
        return resJson(error.message , 500)
    }
}

export const PUT = async (req:Request)=>{
    try {
        const {id, title, description, imageUrl } = await req.json()
        if(!id) {
            throw new Error("Project ID is missing!")
        }
        console.log(id)
        if ( !title || !description || !imageUrl) {
            throw new Error("Some credentials are missing!")
        }
        await db.update(projects)
            .set({ title, description, imageUrl })
            .where(eq(projects.id, id))
            .catch(err => {
                throw new Error(err.message)
            })
        return resJson("Project updated successfully")
    } catch (error:any) {
        console.log(error.message)
        return resJson(error.message, 500)
    }
}

export const DELETE = async (req:Request)=>{
    try {
        const { searchParams } =new URL(req.url)
        const id = searchParams.get('id')
        if (!id) {
            throw new Error("Project ID is missing!")
        }
        await db.delete(projects)
            .where(eq(projects.id, id))
            .catch(err => {
                throw new Error(err.message)
            })
        return resJson("Project deleted successfully")
    } catch (error:any) {
        console.log(error.message)
        return resJson(error.message, 500)
    }
}