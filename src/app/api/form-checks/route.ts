import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { videoUrl, exerciseName, clientNotes, coachNotes, voiceNoteUrl } = body;

    return NextResponse.json({
      success: true,
      data: {
        id: `fc-${Date.now()}`,
        status: 'reviewed',
        reviewedAt: new Date().toISOString(),
        coachFeedback: {
          voiceNoteUrl: voiceNoteUrl || '/audio/coach-cue-feedback.mp3',
          timestampSeconds: 14.5,
          cueText: coachNotes || 'ممتاز! لاحظ فقط عدم ميلان الجذع للأمام في آخر تكرارين.'
        }
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  const reviews = [
    {
      id: 'fc-1',
      clientName: 'عمر حسن',
      exercise: 'هاك سكوات جهاز (Hack Squat)',
      videoUrl: '/videos/sample-hack-squat.mp4',
      durationSeconds: 32,
      status: 'pending',
      uploadedAt: 'منذ ساعتين',
      clientNotes: 'كوتش ركزلي على زاوية الركبة في قاع النزول.'
    },
    {
      id: 'fc-2',
      clientName: 'محمود صابر',
      exercise: 'ديدلفت روماني دمبل (RDL)',
      videoUrl: '/videos/sample-rdl.mp4',
      durationSeconds: 28,
      status: 'reviewed',
      uploadedAt: 'أمس',
      clientNotes: 'تأكد من قوس الظهر وثبات الرقبة.'
    }
  ];

  return NextResponse.json({
    success: true,
    reviews
  });
}
