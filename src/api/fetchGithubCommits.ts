const fetchGithubCommits = async (
  query: string,
  per_page: number,
  page: number,
  owner: string,
  repo: string
) => {
  console.log();
  const combinedQuery = [query, `repo:${owner}/${repo}`].join(" ");
  console.log(combinedQuery);
  const response = await fetch("/api/search/commits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ page, combinedQuery, per_page }),
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

export default fetchGithubCommits;
