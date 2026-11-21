import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { pin } = await req.json();

    // Secure Admin Passcode: 4111
    if (pin === "4111") {
      const response = NextResponse.json({
        success: true,
        authenticated: true,
        role: "SUPER_ADMIN",
        message: "تم التحقق من هوية مالك المنصة بنجاح!"
      });

      // Set HTTP-only secure cookie for admin session (valid for 30 days)
      response.cookies.set("coachpr_owner_session", "owner_token_4111_authorized", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "رمز المرور غير صحيح. تم تسجيل محاولة الدخول لأسباب أمنية." },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("coachpr_owner_session");
  const isAuthenticated = cookie?.value === "owner_token_4111_authorized";

  return NextResponse.json({
    authenticated: isAuthenticated
  });
}
