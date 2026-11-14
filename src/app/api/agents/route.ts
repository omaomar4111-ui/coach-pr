import { NextResponse } from 'next/server';
import { AGENTS } from '@/data/agents';

export async function GET() {
  return NextResponse.json({
    success: true,
    total: AGENTS.length,
    agents: AGENTS
  });
}
