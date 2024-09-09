import { clerkClient, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)','/api/adminMessages(.*)'])
export default clerkMiddleware(async(auth , req)=>{
    if(isProtectedRoute(req)){
        if(!auth().userId) auth().protect()
        const user = await clerkClient().users.getUser(auth().userId!)
        if(!user || user.emailAddresses[0].emailAddress !== 'mahmoud7samirr@gmail.com'){
            auth().protect()
        }
    }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};