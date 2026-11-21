import { NextRequest, NextResponse } from "next/server";

export interface DeviceTelemetry {
  ip?: string;
  userAgent: string;
  deviceType: "Mobile" | "Tablet" | "Desktop";
  brand: string;
  model: string;
  os: string;
  browser: string;
  purchasingTier: "Ultra-High (Flagship)" | "High (Modern)" | "Mid-Range" | "Budget" | "Unknown";
  screenResolution?: string;
  estimatedNetWorthIndex?: string;
  timestamp: string;
}

export function parseDeviceDetails(ua: string): Omit<DeviceTelemetry, "timestamp"> {
  let deviceType: "Mobile" | "Tablet" | "Desktop" = "Desktop";
  let brand = "Generic PC / Mac";
  let model = "Desktop Device";
  let os = "Unknown OS";
  let browser = "Unknown Browser";
  let purchasingTier: DeviceTelemetry["purchasingTier"] = "Mid-Range";
  let estimatedNetWorthIndex = "متوسط (Mid purchasing power)";

  // 1. Detect OS
  if (/iPhone/i.test(ua)) {
    deviceType = "Mobile";
    brand = "Apple";
    os = "iOS";
    // Check iPhone generation hints
    if (/iPhone OS 17|iPhone OS 18/i.test(ua)) {
      model = "iPhone 15 / 16 Pro (Flagship)";
      purchasingTier = "Ultra-High (Flagship)";
      estimatedNetWorthIndex = "مرتفع جداً (VIP / High Net Worth - قدرة شرائية ممتازة)";
    } else if (/iPhone OS 15|iPhone OS 16/i.test(ua)) {
      model = "iPhone 13 / 14";
      purchasingTier = "High (Modern)";
      estimatedNetWorthIndex = "مرتفع (High purchasing power)";
    } else {
      model = "iPhone (Legacy / Standard)";
      purchasingTier = "Mid-Range";
      estimatedNetWorthIndex = "متوسط";
    }
  } else if (/iPad/i.test(ua)) {
    deviceType = "Tablet";
    brand = "Apple";
    model = "iPad Pro / Air";
    os = "iPadOS";
    purchasingTier = "Ultra-High (Flagship)";
    estimatedNetWorthIndex = "مرتفع جداً (VIP / High Tier)";
  } else if (/Android/i.test(ua)) {
    os = "Android";
    deviceType = /Mobile/i.test(ua) ? "Mobile" : "Tablet";

    // Detect Top Android Brands
    if (/Samsung|SM-|GT-/i.test(ua)) {
      brand = "Samsung";
      if (/SM-S9|SM-S8|Fold|Flip/i.test(ua)) {
        model = "Galaxy S23/S24 Ultra / Z Fold (Ultra Flagship)";
        purchasingTier = "Ultra-High (Flagship)";
        estimatedNetWorthIndex = "مرتفع جداً (VIP / High purchasing power)";
      } else if (/SM-A|SM-M/i.test(ua)) {
        model = "Galaxy A/M Series (Budget/Mid)";
        purchasingTier = "Mid-Range";
        estimatedNetWorthIndex = "متوسط (Standard purchasing power)";
      } else {
        model = "Samsung Galaxy";
        purchasingTier = "High (Modern)";
      }
    } else if (/Xiaomi|Redmi|POCO/i.test(ua)) {
      brand = "Xiaomi";
      model = "Xiaomi / Redmi Device";
      purchasingTier = "Mid-Range";
      estimatedNetWorthIndex = "متوسط إلى اقتصادي";
    } else if (/HUAWEI|Honor/i.test(ua)) {
      brand = "Huawei";
      model = "Huawei / Honor Device";
      purchasingTier = "High (Modern)";
    } else {
      brand = "Android Device";
      model = "Standard Smartphone";
      purchasingTier = "Mid-Range";
    }
  } else if (/Macintosh|Mac OS X/i.test(ua)) {
    brand = "Apple";
    model = "MacBook / iMac / Mac Studio";
    os = "macOS";
    purchasingTier = "Ultra-High (Flagship)";
    estimatedNetWorthIndex = "مرتفع جداً (VIP High Tier Coach/Athlete)";
  } else if (/Windows NT/i.test(ua)) {
    brand = "PC";
    model = "Windows Computer";
    os = "Windows";
    purchasingTier = "High (Modern)";
  }

  // 2. Detect Browser
  if (/Edg/i.test(ua)) browser = "Microsoft Edge";
  else if (/Chrome/i.test(ua)) browser = "Google Chrome";
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "Apple Safari";
  else if (/Firefox/i.test(ua)) browser = "Mozilla Firefox";

  return {
    userAgent: ua,
    deviceType,
    brand,
    model,
    os,
    browser,
    purchasingTier,
    estimatedNetWorthIndex
  };
}

// In-memory telemetry log for current session & analytics
const telemetryStore: DeviceTelemetry[] = [];

export async function POST(req: NextRequest) {
  try {
    const ua = req.headers.get("user-agent") || "";
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "Unknown IP";
    const body = await req.json().catch(() => ({}));

    const parsed = parseDeviceDetails(ua);
    const record: DeviceTelemetry = {
      ip,
      ...parsed,
      screenResolution: body.screenResolution || "Unknown",
      timestamp: new Date().toISOString()
    };

    telemetryStore.unshift(record);
    if (telemetryStore.length > 200) telemetryStore.pop();

    return NextResponse.json({
      success: true,
      telemetry: record,
      message: `تم رصد جهاز العميل [${record.brand} ${record.model}] وتصنيف فئته الشرائية بنجاح: [${record.purchasingTier}].`
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    totalTracked: telemetryStore.length,
    recentDevices: telemetryStore.slice(0, 50),
    summary: {
      applePercentage: Math.round((telemetryStore.filter(d => d.brand === "Apple").length / (telemetryStore.length || 1)) * 100),
      flagshipPercentage: Math.round((telemetryStore.filter(d => d.purchasingTier.includes("Flagship")).length / (telemetryStore.length || 1)) * 100)
    }
  });
}
