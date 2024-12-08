import { EntertainmentMedia } from './types';

export async function fetchMedia(
  category = '',
  search = '',
  page = 1,
  rows = 10
): Promise<EntertainmentMedia[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const queryParams = new URLSearchParams({
    ...(category && { category }),
    ...(search && { search }),
    page: String(page),
    rows: String(rows),
  });

  console.log("Request URL:", `${baseUrl}/media?${queryParams.toString()}`);

  const res = await fetch(`${baseUrl}/media?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  console.log("Response Status:", res.status);

  if (!res.ok) {
    const errorDetails = await res.json();
    console.error("Erro ao buscar dados:", errorDetails);
    throw new Error(`Failed to fetch media. Status: ${res.status}`);
  }

  const data = await res.json();
  console.log("Media Data:", data);

  return data.map((item: any) => ({
    id: item.id || '',
    title: item.title || {},
    releaseDate: item.releaseDate || null,
    tags: item.tags || [],
    category: item.category || '',
    createdAt: item.createdAt || new Date(),
    updatedAt: item.updatedAt || new Date(),
  }));
}
