import { NextRequest, NextResponse } from "next/server";

export interface CoachApplication {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  instagram: string;
  traineeCount: string;
  currentTool: string;
  status: "pending" | "approved" | "rejected";
  appliedAt: string;
  pricingTierInterest: "Starter" | "Pro" | "Elite";
  deviceInfo?: string;
}

// In-memory / DB synced applications list
let applications: CoachApplication[] = [
  {
    id: "app-101",
    fullName: "عمر مصطفى (Omar Mostafa)",
    phone: "+201012345678",
    email: "omar.coach@gmail.com",
    instagram: "@omar_fitness_pro",
    traineeCount: "11-50 لاعب",
    currentTool: "واتساب وشيتات إكسيل",
    status: "pending",
    appliedAt: "منذ ساعتين",
    pricingTierInterest: "Pro",
    deviceInfo: "iPhone 15 Pro Max (Ultra-High Tier)"
  },
  {
    id: "app-102",
    fullName: "كابتن سيف الدين (Seif Eldin)",
    phone: "+201123456789",
    email: "seif.champion@hotmail.com",
    instagram: "@seif_bodybuilding",
    traineeCount: "50+ لاعب",
    currentTool: "أبلكيشن قديم وبطيء",
    status: "pending",
    appliedAt: "منذ 4 ساعات",
    pricingTierInterest: "Elite",
    deviceInfo: "Samsung Galaxy S24 Ultra"
  },
  {
    id: "app-103",
    fullName: "محمود صابر (Mahmoud Saber)",
    phone: "+201209876543",
    email: "mahmoud.saber@yahoo.com",
    instagram: "@coach_saber",
    traineeCount: "1-10 لاعبين",
    currentTool: "واتساب فقط",
    status: "approved",
    appliedAt: "أمس",
    pricingTierInterest: "Starter",
    deviceInfo: "MacBook Pro M3"
  }
];

export async function GET() {
  return NextResponse.json({
    success: true,
    total: applications.length,
    pendingCount: applications.filter(a => a.status === "pending").length,
    approvedCount: applications.filter(a => a.status === "approved").length,
    applications
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, action } = body; // action: 'approve' | 'reject'

    const target = applications.find(a => a.id === id);
    if (!target) {
      return NextResponse.json({ success: false, error: "Application not found" }, { status: 404 });
    }

    if (action === "approve") {
      target.status = "approved";
    } else if (action === "reject") {
      target.status = "rejected";
    }

    return NextResponse.json({
      success: true,
      message: `تم تحديث حالة حساب الكابتن ${target.fullName} إلى: ${target.status === 'approved' ? 'مقبول ومفعّل ✓' : 'مرفوض'} بنجاح!`,
      application: target
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
