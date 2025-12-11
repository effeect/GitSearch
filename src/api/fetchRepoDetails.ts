const fetchRepoDetails = async (owner: string, repo: string) => {
  const response = await fetch("/api/search/details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ owner, repo }),
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

export default fetchRepoDetails;
