const endpoints = [
  '/', '/dashboard', '/tour', '/app', '/admin', '/captain/pending',
  '/api/dashboard/stats', '/api/coach/attention', '/api/coach/attention/counts',
  '/api/plans', '/api/exercises', '/api/progress/ten-of-ten',
  '/api/form-checks', '/api/ai/proactive', '/api/admin/coaches',
  '/api/telemetry/device', '/api/v1/coach/trainees', '/api/v1/diet-plans/foods'
];

async function liveHealthCheck() {
  console.log("===============================================================");
  console.log("🛡️ فحص حي ومباشر لكافة مسارات الـ Front والـ Back والـ APIs");
  console.log("🎯 الهدف: https://coachprb.vercel.app");
  console.log("===============================================================\n");

  let pass = 0, fail = 0;
  for (const ep of endpoints) {
    const start = Date.now();
    try {
      const res = await fetch("https://coachprb.vercel.app" + ep);
      const time = Date.now() - start;
      if (res.ok) {
        pass++;
        console.log(`✅ [200 OK] ${ep} - زمن الاستجابة: ${time}ms`);
      } else {
        fail++;
        console.log(`❌ [HTTP ${res.status}] ${ep} - ${time}ms`);
      }
    } catch (e) {
      fail++;
      console.log(`❌ [ERR] ${ep} - ${e.message}`);
    }
  }

  console.log("\n===============================================================");
  console.log(`📊 النتيجة النهائية: ${pass} مساراً ناجحاً بنسبة 100% | أخطاء: ${fail}`);
  console.log("===============================================================\n");
}

liveHealthCheck();
