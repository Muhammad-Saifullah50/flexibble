import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET!

export const GET = async (req: NextRequest) => {
         // ignore typecheckig in next line
    const token = await getToken({ req, secret, raw: true })

    return NextResponse.json({ token }, { status: 200 })
}
