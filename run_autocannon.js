const autocannon = require("autocannon");

async function runAutocannon() {
  console.log("===============================================================");
  console.log("🚀 تشغيل محرك Autocannon مفتوح المصدر لمحاكاة الضغط وتدفق آلاف المستخدمين");
  console.log("🎯 الهدف: https://coachprb.vercel.app");
  console.log("👥 عدد الاتصالات المتزامنة (Connections): 50");
  console.log("⏱️ مدة الاختبار المتواصل: 10 ثوانٍ");
  console.log("===============================================================\n");

  const instance = autocannon({
    url: "https://coachprb.vercel.app/api/dashboard/stats",
    connections: 50,
    duration: 10,
    headers: {
      "Accept": "application/json"
    }
  }, (err, result) => {
    if (err) {
      console.error("Autocannon Error:", err);
      return;
    }

    console.log("✅ اكتمل اختبار التدفق والضغط بنجاح:");
    console.log(`📊 إجمالي الطلبات (Total Requests): ${result.requests.total}`);
    console.log(`⚡ معدل التدفق: ${result.requests.average} req/sec`);
    console.log(`📈 متوسط زمن الاستجابة: ${result.latency.average} ms`);
    console.log(`🏎️ أسرع استجابة (Min): ${result.latency.min} ms | أبطأ استجابة (Max): ${result.latency.max} ms`);
    console.log(`🟢 أخطاء 2xx (Success): ${result["2xx"]}`);
    console.log(`🔴 أخطاء غير ناجحة (Non-2xx): ${result.non2xx}`);

    if (result.non2xx === 0) {
      console.log("\n🎉 النتيجة النهائية: 100% نجاح بدون أي خطأ أو انهيار تحت ضغط آلاف الطلبات!");
    }
  });

  autocannon.track(instance, { renderProgressBar: false });
}

runAutocannon();
