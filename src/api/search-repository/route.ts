import { Octokit } from "octokit";
// Importing Interfaces
import type { RepoSearchParams } from "../../types/RepoSearch";

// https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository
type repoDetails = {
  owner: string;
  repo: string;
};

// Based on https://octokit.github.io/rest.js/v18/#search-repos
export async function GET(repo: RepoSearchParams) {
  // Function to sort out the query and potenial options
  const createQuery = (input: RepoSearchParams) => {
    let query = "";
    // Sort out the weird language filter first
    if (input.language !== "") {
      query = `${input.query}+language:${input.language}`;
    } else {
      query = `${input.query}`;
    }

    // Specials thanks to https://stackoverflow.com/questions/14379274/how-to-iterate-over-a-javascript-object
    for (let [key, value] of Object.entries(input)) {
      if (
        key === "query" ||
        key === "language" ||
        key === "quantity" ||
        key === "pageNum" ||
        key === "sort" ||
        key === "order"
      )
        continue;
      // Will only add the neccessary bit if there is a value for it
      if (value != null) {
        query = query + ` ${key}:${value}`;
      }
      // console.log(`${key}:${value}`);
    }
    //
    /* Note from https://docs2.lfe.io/v3/search/#search-repositories
    sort	string	The sort field. One of stars, forks, or updated. Default: results are sorted by best match.
    order	string	The sort order if sort parameter is provided. One of asc or desc. Default: desc
    */
    // Now handle sort + order explicitly
    if (input.sort) {
      query += ` sort:${input.sort}`;
      if (input.order) {
        // Order doesn't appear to be working, will investigate later
        query += ` order:${input.order}`;
      }
    }

    return query;
  };

  try {
    if (!repo.language) {
      repo.language = "";
    }
    // console.log(createQuery(repo));
    // console.log(queryHandle(repo.query, repo.language));
    const result = await octokitHandle.rest.search.repos({
      q: createQuery(repo),
      per_page: repo.quantity,
      page: repo.pageNum,
    });
    return result.data.items;
  } catch (error: any) {
    console.error("Error in searchRepos:", error.message || error);
  }
}

// Function to grab a specific details about a repo, meant for the repo menu table
export async function GetRepoDetails(repo: repoDetails) {
  try {
    // console.log(queryHandle(repo.query, repo.language));
    const result = await octokitHandle.rest.repos.get({
      owner: repo.owner,
      repo: repo.repo,
    });
    // console.log(result);
    return result.data;
  } catch (error: any) {
    console.error("Error in searchRepos:", error.message || error);
  }
}
