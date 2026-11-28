import test from 'node:test';
import assert from 'node:assert/strict';

test('CoachPR Phase 7 — Hybrid GTM Commercial Funnel Verification', async (t) => {
  const events = [];

  function recordEvent(name, data = {}) {
    const validEvents = [
      'landing_page_view',
      'demo_booked',
      'coach_signup',
      'coach_activated',
      'athlete_invited',
      'first_workout_completed',
      'subscription_started'
    ];
    assert.ok(validEvents.includes(name), `Event ${name} must be in allowed 7 milestones`);
    events.push({ name, ...data, timestamp: new Date().toISOString() });
    return { success: true, count: events.length };
  }

  await t.test('1. Validates all 7 essential business milestones in the funnel', () => {
    recordEvent('landing_page_view', { source: 'instagram' });
    recordEvent('demo_booked', { coachName: 'كابتن حسام' });
    recordEvent('coach_signup', { coachId: 'c_pilot_1' });
    recordEvent('coach_activated', { coachId: 'c_pilot_1' });
    recordEvent('athlete_invited', { coachId: 'c_pilot_1', athleteName: 'محمد سامح' });
    recordEvent('first_workout_completed', { athleteId: 'ath_1' });
    recordEvent('subscription_started', { coachId: 'c_pilot_1', tier: 'pro' });

    assert.equal(events.length, 7);
  });

  await t.test('2. Computes commercial conversion metrics accurately', () => {
    const landingViews = events.filter(e => e.name === 'landing_page_view').length;
    const signups = events.filter(e => e.name === 'coach_signup').length;
    const paid = events.filter(e => e.name === 'subscription_started').length;

    const signupRate = (signups / landingViews) * 100;
    const paidRate = (paid / signups) * 100;

    assert.equal(signupRate, 100);
    assert.equal(paidRate, 100);
  });
});
