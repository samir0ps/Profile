import dynamic from "next/dynamic";
import { handlegettingProjects } from "../actions";
const Main  = dynamic(()=>import('../components/Main'))
const Skills  = dynamic(()=>import('../components/Skills'))
const Projects  = dynamic(()=>import("../ui/components/Projects"))

type Projects = {
  id:string,
  title : string ,
  imageUrl:string,
  description:string,
}
export default async function Home() {
  return (
    <>  
          <Main/>
          <Skills/>
          <Projects />
          <div className="mb-3 w-full text-center py-3 dark:text-content text-neutral-800">© 2024 Mahmoud Samir</div>
    </>
  );
}
