/**
 * CoachPR Enterprise Load & Stress Testing Simulator (JavaScript)
 * Simulates concurrent virtual users executing live API flows
 */

const BASE_URL = process.env.TEST_URL || "https://coachprb.vercel.app";

const stats = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  latencies: [],
  errors: {}
};

const endpointsToTest = [
  { method: "GET", path: "/" },
  { method: "GET", path: "/dashboard" },
  { method: "GET", path: "/tour" },
  { method: "GET", path: "/app" },
  { method: "GET", path: "/api/dashboard/stats" },
  { method: "GET", path: "/api/coach/attention" },
  { method: "GET", path: "/api/coach/attention/counts" },
  { method: "GET", path: "/api/plans" },
  { method: "GET", path: "/api/exercises" },
  { method: "GET", path: "/api/progress/ten-of-ten" },
  { method: "GET", path: "/api/form-checks" },
  { method: "GET", path: "/api/ai/proactive" },
  { method: "GET", path: "/api/v1/coach/trainees" },
  { method: "GET", path: "/api/v1/diet-plans/foods" }
];

async function simulateVirtualUser(userId, totalCycles) {
  for (let i = 0; i < totalCycles; i++) {
    const target = endpointsToTest[Math.floor(Math.random() * endpointsToTest.length)];
    const start = Date.now();
    stats.totalRequests++;

    try {
      const res = await fetch(`${BASE_URL}${target.path}`, {
        method: target.method,
        headers: {
          "User-Agent": `CoachPR-StressTester-VU-${userId}`,
          "Accept": "text/html,application/json"
        }
      });

      const latency = Date.now() - start;
      stats.latencies.push(latency);

      if (res.ok) {
        stats.successfulRequests++;
      } else {
        stats.failedRequests++;
        const statusKey = `HTTP_${res.status}`;
        stats.errors[statusKey] = (stats.errors[statusKey] || 0) + 1;
      }
    } catch (err) {
      stats.failedRequests++;
      const errKey = err.code || err.message || "FETCH_FAILED";
      stats.errors[errKey] = (stats.errors[errKey] || 0) + 1;
    }

    await new Promise(r => setTimeout(r, 20 + Math.random() * 50));
  }
}

async function runHighScaleAudit(concurrentUsers, cyclesPerUser) {
  console.log(`\n===============================================================`);
  console.log(`🚀 بدء محاكاة الضغط وتدفق آلاف المستخدمين على CoachPR`);
  console.log(`🎯 الهدف: ${BASE_URL}`);
  console.log(`👥 المستخدمون الافتراضيون (Concurrent VUs): ${concurrentUsers}`);
  console.log(`🔄 إجمالي العمليات المستهدفة: ${concurrentUsers * cyclesPerUser} Request`);
  console.log(`===============================================================\n`);

  const startTime = Date.now();
  const userPromises = [];

  for (let u = 1; u <= concurrentUsers; u++) {
    userPromises.push(simulateVirtualUser(u, cyclesPerUser));
  }

  await Promise.all(userPromises);
  const totalDurationSeconds = ((Date.now() - startTime) / 1000).toFixed(2);

  stats.latencies.sort((a, b) => a - b);
  const avgLatency = Math.round(stats.latencies.reduce((a, b) => a + b, 0) / (stats.latencies.length || 1));
  const p50 = stats.latencies[Math.floor(stats.latencies.length * 0.5)] || 0;
  const p95 = stats.latencies[Math.floor(stats.latencies.length * 0.95)] || 0;
  const p99 = stats.latencies[Math.floor(stats.latencies.length * 0.99)] || 0;
  const throughput = Math.round(stats.totalRequests / parseFloat(totalDurationSeconds));

  console.log(`\n✅ انتهت المحاكاة وفحص الأداء بنجاح:`);
  console.log(`⏱️ مدة الاختبار: ${totalDurationSeconds} ثانية`);
  console.log(`📊 إجمالي الطلبات (Total Requests): ${stats.totalRequests}`);
  console.log(`🟢 طلبات ناجحة (Successful 200 OK): ${stats.successfulRequests} (${((stats.successfulRequests / stats.totalRequests) * 100).toFixed(1)}%)`);
  console.log(`🔴 طلبات فشلت (Failed Requests): ${stats.failedRequests}`);
  console.log(`⚡ معدل التدفق (Throughput): ${throughput} req/sec`);
  console.log(`📈 متوسط زمن الاستجابة (Avg Latency): ${avgLatency}ms`);
  console.log(`🏎️ P50 Latency: ${p50}ms | P95: ${p95}ms | P99: ${p99}ms`);

  if (Object.keys(stats.errors).length > 0) {
    console.log(`\n⚠️ تفاصيل الأخطاء المرصودة:`, stats.errors);
  } else {
    console.log(`\n🎉 نتيجة الفحص: 0% معدل أخطاء — المنصة ثابتة وتتحمل الضغط العالي بدون أي انهيار!`);
  }
}

// Run test with 50 concurrent virtual clients executing 10 requests each (500 total requests)
runHighScaleAudit(50, 10);
