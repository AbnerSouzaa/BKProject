import { NextResponse } from 'next/server';

const media = [
  {
    id: 1,
    title: { default: 'God of War Ragnarok' },
    category: 'video_game',
    releaseDate: '2024-12-24',
  },
  // Outros dados simulados
];

export async function GET(request: Request) {
  return NextResponse.json(media);
}

export async function POST(request: Request) {
  const body = await request.json();
  media.push({ ...body, id: media.length + 1 });
  return NextResponse.json({ success: true });
}
