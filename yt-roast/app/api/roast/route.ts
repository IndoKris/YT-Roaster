import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { subscriptions, likedVideos } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    // Summarize items for prompt
    const subTitles = (subscriptions || []).map((s: any) => s.snippet?.title).join(", ");
    const likedTitles = (likedVideos || []).map((v: any) => v.snippet?.title).join(", ");

    const prompt = `You are a savage, witty, unapologetic stand-up comedian and internet culture expert. Analyze this user's YouTube data and generate a brutal, humorous roast.

Subscriptions: ${subTitles || "None found (touch grass)"}
Liked Videos: ${likedTitles || "None found (lurker)"}

Provide your response strictly in valid JSON format with the following keys:
{
  "brainrotScore": <integer between 0 and 100>,
  "roastTitle": "<funny punchy title>",
  "primaryRoast": "<brutal 3-4 sentence paragraph roasting their taste>",
  "redFlags": ["<red flag 1>", "<red flag 2>", "<red flag 3>"],
  "prescription": "<absurd advice on how to fix their life>"
}
`;

    if (!apiKey || apiKey === "your-gemini-api-key") {
      // Fallback mock roast if Gemini API key is not configured yet
      return NextResponse.json({
        brainrotScore: 89,
        roastTitle: "The 3 AM Algorithm Victim",
        primaryRoast: "Your subscription list reads like a cry for help from a sleep-deprived raccoon. You watch enough 4-hour video essays on dead internet theory to qualify for an honorary psychology degree, yet your liked videos suggest your attention span peaks at cat memes.",
        redFlags: [
          "Watches 3-hour video essays at 2x speed while eating shredded cheese over the sink",
          "Subscribed to 47 competing philosophy channels and understands none of them",
          "Liked videos include 'How to fix sleep schedule' uploaded at 4:15 AM"
        ],
        prescription: "Throw your router out the window, touch actual soil, and delete your watch history before the feds arrive."
      });
    }

    // Call Gemini API
    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!geminiRes.ok) {
      const err = await geminiRes.text();
      return NextResponse.json({ error: "Gemini API error", details: err }, { status: 500 });
    }

    const geminiData = await geminiRes.json();
    const textOutput = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    // Clean markdown code blocks if present
    const cleanedJson = textOutput.replace(/```json/g, "").replace(/```/g, "").trim();
    const roastJson = JSON.parse(cleanedJson);

    return NextResponse.json(roastJson);
  } catch (error: any) {
    return NextResponse.json({ error: "Roast generation failed", message: error.message }, { status: 500 });
  }
}
