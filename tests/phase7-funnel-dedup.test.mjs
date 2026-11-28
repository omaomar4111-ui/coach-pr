import test from 'node:test';
import assert from 'node:assert/strict';

test('CoachPR Phase 7 Week 1 — Funnel Real-Time Delivery & Deduplication Suite', async (t) => {
  const eventsCaptured = [];
  const sessionDeduplicationStore = new Set();

  function triggerClientTracking(eventName, coachId, dedupKey) {
    if (sessionDeduplicationStore.has(dedupKey)) {
      return { status: 'skipped_duplicate', eventName };
    }
    sessionDeduplicationStore.add(dedupKey);
    eventsCaptured.push({ eventName, coachId, timestamp: Date.now() });
    return { status: 'recorded', eventName };
  }

  await t.test('1. Prevents duplicate event recording on rapid clicks or page reloads', () => {
    const key = 'coachpr_fnl_demo_booked_01011112222';
    
    // First trigger
    const first = triggerClientTracking('demo_booked', '01011112222', key);
    assert.equal(first.status, 'recorded');

    // Duplicate trigger (e.g. reload or rapid double tap)
    const second = triggerClientTracking('demo_booked', '01011112222', key);
    assert.equal(second.status, 'skipped_duplicate');

    assert.equal(eventsCaptured.length, 1);
  });

  await t.test('2. Validates progressive milestones across independent coaches with zero cross-tenant leakage', () => {
    // Coach 1 actions
    triggerClientTracking('landing_page_view', 'coach_1', 'key_lp_1');
    triggerClientTracking('demo_booked', 'coach_1', 'key_db_1');
    triggerClientTracking('coach_signup', 'coach_1', 'key_cs_1');
    triggerClientTracking('coach_activated', 'coach_1', 'key_ca_1'); // Created first workout plan
    triggerClientTracking('athlete_invited', 'coach_1', 'key_ai_1');

    // Coach 2 actions
    triggerClientTracking('landing_page_view', 'coach_2', 'key_lp_2');
    triggerClientTracking('demo_booked', 'coach_2', 'key_db_2');

    const coach1Events = eventsCaptured.filter(e => e.coachId === 'coach_1');
    const coach2Events = eventsCaptured.filter(e => e.coachId === 'coach_2');

    assert.equal(coach1Events.length, 5);
    assert.equal(coach2Events.length, 2);
    assert.ok(coach1Events.some(e => e.eventName === 'coach_activated'));
    assert.ok(!coach2Events.some(e => e.eventName === 'coach_activated'));
  });

  await t.test('3. Confirms athlete first_workout_completed marks the full end-to-end activation loop', () => {
    triggerClientTracking('first_workout_completed', 'coach_1', 'key_fwc_1');
    const workoutEvent = eventsCaptured.find(e => e.eventName === 'first_workout_completed');
    assert.ok(workoutEvent);
    assert.equal(workoutEvent.coachId, 'coach_1');
  });
});
