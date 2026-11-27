// Event-Driven Automation Service for CoachPR SaaS
// Handles background triggers: Athlete Inactivity, Subscription Renewal, PR Alerts, Sync Failure, and WhatsApp Provider Abstraction

export interface AutomationEvent {
  id: string;
  type: 
    | 'ATHLETE_INACTIVE'
    | 'SUBSCRIPTION_EXPIRING'
    | 'NEW_PERSONAL_RECORD'
    | 'WORKOUT_SYNC_FAILURE'
    | 'WEEKLY_PROGRESS_REPORT';
  tenantId: string;
  athleteId: string;
  data: any;
  createdAt: string;
  processed: boolean;
}

export interface MessagePayload {
  toPhone: string;
  recipientName: string;
  messageText: string;
  templateType: 'inactivity' | 'congratulations_pr' | 'subscription_reminder' | 'sync_warning';
}

/**
 * Abstract WhatsApp Messaging Provider (Supports Meta Cloud API, Evolution API, or Dry-Run Sandbox)
 */
export async function sendAutomatedNotification(
  payload: MessagePayload, 
  options: { isDryRun?: boolean; provider?: 'evolution' | 'meta' | 'sandbox' } = {}
): Promise<{ success: boolean; messageId: string; providerUsed: string }> {
  const isDryRun = options.isDryRun ?? (process.env.NODE_ENV !== 'production' || !process.env.WHATSAPP_API_TOKEN);

  // In Development or Test mode, NEVER send real customer WhatsApp messages
  if (isDryRun || options.provider === 'sandbox') {
    return {
      success: true,
      messageId: `dry_run_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      providerUsed: 'SANDBOX_SIMULATOR'
    };
  }

  // Production Meta / Evolution API Call
  try {
    const res = await fetch(process.env.WHATSAPP_GATEWAY_URL || 'https://api.coachpr.com/v1/whatsapp/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`
      },
      body: JSON.stringify({
        phone: payload.toPhone,
        message: payload.messageText,
        template: payload.templateType
      })
    });

    const data = await res.json();
    return {
      success: res.ok,
      messageId: data.messageId || `msg_${Date.now()}`,
      providerUsed: options.provider || 'meta'
    };
  } catch (err) {
    console.warn('Production WhatsApp gateway notice:', err);
    return {
      success: false,
      messageId: `failed_${Date.now()}`,
      providerUsed: 'FALLBACK'
    };
  }
}

/**
 * Generates automated follow-up messages based on business logic
 */
export function buildAutomationContent(event: AutomationEvent): MessagePayload {
  switch (event.type) {
    case 'ATHLETE_INACTIVE':
      return {
        toPhone: event.data.phone || '+201012345678',
        recipientName: event.data.athleteName || 'يا بطل',
        messageText: `يا كابتن ${event.data.athleteName || 'يا بطل'}، وحشنا وجودك في التمرين! بقالك ${event.data.daysInactive || 4} أيام مسجلتش تمرينك، كابتن ${event.data.coachName || 'تامر'} جاهز يساعدك تظبط أوزانك وتستأنف حماسك اليوم.`,
        templateType: 'inactivity'
      };

    case 'NEW_PERSONAL_RECORD':
      return {
        toPhone: event.data.phone || '+201012345678',
        recipientName: event.data.athleteName || 'يا بطل',
        messageText: `عاش يا وحش! 🔥 كابتن ${event.data.coachName || 'تامر'} بيباركلك على تحقيق رقم قياسي جديد (PR) في تمرين ${event.data.exerciseName}: ${event.data.weightKg} كجم! استمر في التطور!`,
        templateType: 'congratulations_pr'
      };

    case 'SUBSCRIPTION_EXPIRING':
      return {
        toPhone: event.data.phone || '+201012345678',
        recipientName: event.data.athleteName || 'يا بطل',
        messageText: `تنبيه اشتراك: متبقي ${event.data.daysLeft || 3} أيام على نهاية باقتك التدريبية مع كابتن ${event.data.coachName || 'تامر'}. يمكنك التجديد الآن عبر إنستاباي لضمان استمرار متابعة تمارينك بدون انقطاع.`,
        templateType: 'subscription_reminder'
      };

    default:
      return {
        toPhone: event.data.phone || '+201012345678',
        recipientName: event.data.athleteName || 'يا بطل',
        messageText: `تحديث من منظومة التدريب الذكية CoachPR.`,
        templateType: 'inactivity'
      };
  }
}
