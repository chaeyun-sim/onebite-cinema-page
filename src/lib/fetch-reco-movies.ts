export default async function fetchRandomMovies() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/movie/random`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
