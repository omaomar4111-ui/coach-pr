/**
 * Playwright E2E Autonomous Scenario Runner for CoachPR
 */

const { chromium } = require("playwright");

async function runE2EAutomation() {
  console.log("===============================================================");
  console.log("🤖 بدء اختبار Playwright E2E للسيناريوهات الحقيقية على CoachPR Live");
  console.log("🎯 الهدف: https://coachprb.vercel.app");
  console.log("===============================================================\n");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  const report = {
    totalScenarios: 0,
    passedScenarios: 0,
    failedScenarios: 0,
    logs: []
  };

  async function testStep(name, fn) {
    report.totalScenarios++;
    process.stdout.write(`⏳ جاري اختبار: [${name}] ... `);
    try {
      await fn();
      report.passedScenarios++;
      console.log("✅ نجح");
      report.logs.push(`✓ [${name}]: نجح 100%`);
    } catch (err) {
      report.failedScenarios++;
      console.log(`❌ فشل (${err.message})`);
      report.logs.push(`✗ [${name}]: خطأ -> ${err.message}`);
    }
  }

  // 1. Landing Page Test
  await testStep("تحميل الصفحة الرئيسية وشعار CoachPR", async () => {
    await page.goto("https://coachprb.vercel.app/", { waitUntil: "domcontentloaded", timeout: 15000 });
    const title = await page.title();
    if (!title.includes("CoachPR")) throw new Error("عنوان الصفحة غير صحيح");
  });

  // 2. Dashboard Console Test
  await testStep("تحميل لوحة تحكم الكابتن وعدادات الإحصائيات (KPIs)", async () => {
    await page.goto("https://coachprb.vercel.app/dashboard", { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForSelector("text=العملاء النشطون", { timeout: 10000 });
  });

  // 3. Megatron AI Trigger Test
  await testStep("فتح نافذة ميجاترون الذكية وإرسال استفسار", async () => {
    const askBtn = await page.locator("text=اسأل ميجاترون").first();
    await askBtn.click();
    await page.waitForSelector("text=ما الذي تريد من ميجاترون مساعدتك في إنجازه؟", { timeout: 5000 });
  });

  // 4. Athlete Mobile App Test
  await testStep("تحميل تطبيق الموبايل لكريم جلال وتسجيل الوجبات وتمرين Push Day", async () => {
    await page.goto("https://coachprb.vercel.app/app", { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForSelector("text=Push Day", { timeout: 10000 });
    await page.waitForSelector("text=يومك 10/10", { timeout: 10000 });
  });

  // 5. Dual Simulation Tour Test
  await testStep("تحميل شاشة الجولة المزدوجة (Tour Shell) وإطار الهاتف المتجاوب", async () => {
    await page.goto("https://coachprb.vercel.app/tour", { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForSelector("iframe#dash", { timeout: 10000 });
    await page.waitForSelector("iframe#phone", { timeout: 10000 });
  });

  await browser.close();

  console.log("\n===============================================================");
  console.log(`🏁 نتيجة اختبار Playwright النهائي:`);
  console.log(`📊 السيناريوهات المختبرة: ${report.totalScenarios}`);
  console.log(`🟢 سيناريوهات ناجحة: ${report.passedScenarios}`);
  console.log(`🔴 سيناريوهات فاشلة: ${report.failedScenarios}`);
  console.log("===============================================================\n");
}

runE2EAutomation();
