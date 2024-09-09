import { handlegettingProjects } from "@/app/actions";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const projects = await handlegettingProjects();

    // Set headers to prevent caching
    return NextResponse.json(projects, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
};
