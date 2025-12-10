const fetchRepoDetails = async (owner: string, repo: string) => {
  const response = await fetch("/api/search/details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ owner, repo }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export default fetchRepoDetails;
