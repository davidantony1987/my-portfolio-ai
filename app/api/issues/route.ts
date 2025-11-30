import { NextRequest, NextResponse } from "next/server";
import z from "zod";
//import { PrismaClient } from "prisma/client";

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

//import { prisma } from '@/lib/prisma'
import { prisma } from '../../../lib/prisma'


const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);

    console.log('Request Body:', body);

    if (!validation.success) {
        return new Response(JSON.stringify({ errors: validation.error.flatten() }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }

    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    });

    return NextResponse.json(newIssue, { status: 201 });

}

export async function GET() {
    const users = await prisma.issue.findFirst();
    return NextResponse.json(users, { status: 200 });
}
