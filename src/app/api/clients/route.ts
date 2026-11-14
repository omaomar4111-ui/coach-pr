import { NextResponse } from "next/server";
import { globalStore } from "@/lib/db";

// GET /api/clients - Get all clients or specific client
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("id");

  if (clientId) {
    const client = globalStore.clients.find(c => c.id === clientId);
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, client });
  }

  return NextResponse.json({ success: true, clients: globalStore.clients });
}

// POST /api/clients - Add or update client profile, injuries, attachments
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, name, phone, email, goal, injuries, medicalNotes, attachments } = body;

    const existingIndex = globalStore.clients.findIndex(c => c.id === id);
    if (existingIndex !== -1) {
      globalStore.clients[existingIndex] = {
        ...globalStore.clients[existingIndex],
        name: name ?? globalStore.clients[existingIndex].name,
        phone: phone ?? globalStore.clients[existingIndex].phone,
        email: email ?? globalStore.clients[existingIndex].email,
        goal: goal ?? globalStore.clients[existingIndex].goal,
        injuries: injuries ?? globalStore.clients[existingIndex].injuries,
        medicalNotes: medicalNotes ?? globalStore.clients[existingIndex].medicalNotes,
        attachments: attachments ?? globalStore.clients[existingIndex].attachments
      };
      return NextResponse.json({ success: true, client: globalStore.clients[existingIndex] });
    }

    const newClient = {
      id: id || `client-${Date.now()}`,
      coachId: "coach-demo",
      name: name || "متدرب جديد",
      phone: phone || "",
      email: email || "",
      goal: goal || "بناء عضلات وتنشيف",
      injuries: injuries || [],
      medicalNotes: medicalNotes || "",
      subscriptionStatus: "active" as const,
      subscriptionEnd: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString(),
      streakDays: 0,
      dailyScore: 10,
      attachments: attachments || []
    };

    globalStore.clients.push(newClient);
    return NextResponse.json({ success: true, client: newClient });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
