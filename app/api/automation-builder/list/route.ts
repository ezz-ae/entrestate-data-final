import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const automations = await prisma.agentDefinition.findMany({
      select: {
        id: true,
        name: true,
        role: true,
        market: true,
        companyType: true,
        status: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(automations, { status: 200 });
  } catch (error) {
    console.error('Error listing automation workflows:', error);
    return NextResponse.json({ error: 'Failed to list automation workflows' }, { status: 500 });
  }
}
