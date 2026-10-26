import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: Request) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !(token as any).accessToken) {
      return NextResponse.json({
        success: false,
        mock: true,
        message: "Running in mock test mode (Authentication token missing)."
      });
    }

    // Verify YouTube API connectivity
    const accessToken = (token as any).accessToken;
    const res = await fetch("https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) {
      return NextResponse.json({ success: false, error: "YouTube API test failed", status: res.status });
    }

    return NextResponse.json({ success: true, message: "YouTube API connection verified successfully!" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
