import { NextRequest, NextResponse } from 'next/server';
 
export async function POST(req: NextRequest) {
  const url = (await req.formData()).get('url') as FormDataEntryValue;

  return NextResponse.redirect(new URL(`/findings?url=${url as string}`, req.url));
};
