import { NextResponse } from "next/server";
import { globalStore } from "@/lib/db";

// GET /api/formcheck - Get all form check videos with auto-purge of expired (>12h)
export async function GET(request: Request) {
  // Purge any video that passed 12 hours
  globalStore.purgeExpiredVideos();

  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("clientId");

  let list = globalStore.formCheckVideos;
  if (clientId) {
    list = list.filter(v => v.clientId === clientId);
  }

  return NextResponse.json({
    success: true,
    videos: list
  });
}

// POST /api/formcheck - Submit a new exercise video or update approval
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, id, clientId, clientName, exerciseName, videoDurationSec, status, coachFeedback, notesAtSeconds } = body;

    // Action: Approve or Request Fix by Coach
    if (action === "review" && id) {
      const idx = globalStore.formCheckVideos.findIndex(v => v.id === id);
      if (idx !== -1) {
        globalStore.formCheckVideos[idx] = {
          ...globalStore.formCheckVideos[idx],
          status: status || globalStore.formCheckVideos[idx].status,
          coachFeedback: coachFeedback || globalStore.formCheckVideos[idx].coachFeedback,
          notesAtSeconds: notesAtSeconds || globalStore.formCheckVideos[idx].notesAtSeconds
        };
        return NextResponse.json({ success: true, video: globalStore.formCheckVideos[idx] });
      }
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    // Action: Client uploads new workout video (12 hour expiration)
    const newVideo = {
      id: `fc-${Date.now()}`,
      clientId: clientId || "client-1",
      clientName: clientName || "متدرب",
      exerciseName: exerciseName || "تمرين مصور",
      videoDurationSec: videoDurationSec || 15,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 12 * 3600 * 1000).toISOString(), // Exactly 12 hours
      notesAtSeconds: []
    };

    globalStore.formCheckVideos.unshift(newVideo);

    return NextResponse.json({ success: true, video: newVideo });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process form check" }, { status: 500 });
  }
}

// DELETE /api/formcheck?id=... - Manual or automated purge
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    globalStore.formCheckVideos = globalStore.formCheckVideos.filter(v => v.id !== id);
    return NextResponse.json({ success: true, message: "Deleted" });
  }

  const purgedCount = globalStore.purgeExpiredVideos();
  return NextResponse.json({ success: true, purgedCount });
}
