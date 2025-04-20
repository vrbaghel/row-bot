import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { 
      error: 'CRM integration not yet implemented',
      documentation: 'This endpoint will handle CRM synchronization in future releases'
    },
    { status: 501 }
  );
}
