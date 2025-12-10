// Fetch function for Github repos
// Goes to the Github Search API Handler
// Taking advantage of React Query fyi

const fetchRepoData = async (query: string, per_page: number, page: number) => {
  const response = await fetch("/api/search/repos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ page, query, per_page }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export default fetchRepoData;
