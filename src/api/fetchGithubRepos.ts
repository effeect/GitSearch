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
    let errorData: any = {};
    try {
      errorData = await response.json();
    } catch (e) {
      console.error("Failed to parse error response body", e);
    }

    const errorMessage =
      errorData.error || response.statusText || "An unknown error occurred";

    throw new Error(errorMessage);
  }

  return response.json();
};

export default fetchRepoData;
