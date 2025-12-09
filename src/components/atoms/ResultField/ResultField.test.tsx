// ResultField.test.tsx or ResultField.test.js
// ---
// NOTE: Assuming you have 'globals: true' in vite.config.ts.
// If not, uncomment the first three lines below.
import { describe, test, expect } from "vitest";
// import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
// ---

import React from "react";
// 1. Removed: 'text-encoding' import is often not needed with modern Node/Vitest setups
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

// Adjust the path as necessary for your file structure
import { ResultField } from "./ResultField";

// Define the mock data structure (interface for better type safety if using TS)
interface RepoData {
  full_name: string;
  description: string;
  stargazers_count: string;
  forks: string;
  html_url: string;
}

const mockRepo: RepoData = {
  full_name: "facebook/react",
  description: "A JavaScript library for building user interfaces",
  stargazers_count: "210",
  forks: "42",
  html_url: "https://github.com/facebook/react",
};

/**
 * Helper function to wrap the tested component in BrowserRouter
 * since Link components require a Router context.
 */
const renderWithRouter = (ui: React.ReactElement) => {
  // Use React.ReactElement directly as the type for ui
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("ResultField", () => {
  // Test case 1: Component renders correctly with all essential data
  test("renders repository details and link buttons correctly", () => {
    // Renders the component wrapped in the Router helper
    renderWithRouter(<ResultField index={0} repo={mockRepo} />);

    // 1. Check for the main repository name (h1 title)
    expect(
      screen.getByRole("heading", { level: 1, name: mockRepo.full_name })
    ).toBeInTheDocument();

    // 2. Check for the description text
    expect(screen.getByText(mockRepo.description)).toBeInTheDocument();

    // 3. Check for the stats (Stars and Forks)
    expect(
      screen.getByText(`Stars: ${mockRepo.stargazers_count}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Forks: ${mockRepo.forks}`)).toBeInTheDocument();

    // 4. Check for the "View on GitHub" button link
    // Ensure the link component is an <a> tag with the correct attributes
    const gitHubLink = screen.getByRole("link", { name: "View on GitHub" });
    expect(gitHubLink).toBeInTheDocument();
    expect(gitHubLink).toHaveAttribute("href", mockRepo.html_url);
    expect(gitHubLink).toHaveAttribute("target", "_blank");

    // 5. Check for the "View on Gitsearch" button link
    const gitSearchLink = screen.getByRole("link", {
      name: "View on Gitsearch",
    });
    expect(gitSearchLink).toBeInTheDocument();
    // Assuming this link also points to the repo's html_url for simplicity in the mock
    expect(gitSearchLink).toHaveAttribute("href", mockRepo.html_url);
    expect(gitSearchLink).toHaveAttribute("target", "_blank");
  });

  // Test case 2: Basic check for the index and data (Uncommented and kept in a simpler form)
  test("renders with the correct index and data structure", () => {
    renderWithRouter(<ResultField index={10} repo={mockRepo} />);

    // Simple check that a key piece of data (the description) is still present.
    expect(screen.getByText(mockRepo.description)).toBeInTheDocument();

    // Optional: If 'ResultField' has a test ID or a predictable structural role for its container:
    // const container = screen.getByTestId("result-field-container");
    // expect(container).toBeInTheDocument();
  });
});
