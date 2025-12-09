// Simple Test Script for the thing
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ResultField } from "./ResultField"; // Adjust the path as necessary

const mockRepo = {
  full_name: "facebook/react",
  description: "A JavaScript library for building user interfaces",
  stargazers_count: "210",
  forks: "42",
  html_url: "https://github.com/facebook/react",
};

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("ResultField", () => {
  // Test case 1: Component renders correctly with all essential data
  test("renders repository details and link buttons correctly", () => {
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
    const gitHubLink = screen.getByRole("link", { name: "View on GitHub" });
    expect(gitHubLink).toBeInTheDocument();
    // In react-router-dom, 'to' becomes 'href' when rendered inside a browser router
    expect(gitHubLink).toHaveAttribute("href", mockRepo.html_url);
    expect(gitHubLink).toHaveAttribute("target", "_blank");

    // 5. Check for the "View on Gitsearch" button link
    const gitSearchLink = screen.getByRole("link", {
      name: "View on Gitsearch",
    });
    expect(gitSearchLink).toBeInTheDocument();
    expect(gitSearchLink).toHaveAttribute("href", mockRepo.html_url);
    expect(gitSearchLink).toHaveAttribute("target", "_blank");
  });

  // Test case 2: Ensures the unique index prop doesn't cause issues (basic prop check)
  //   test("renders with the correct index and data structure", () => {
  //     renderWithRouter(<ResultField index={10} repo={mockRepo} />);

  //     // Ensure the main container div (the box) is present
  //     expect(screen.getByRole("heading", { level: 1 }))
  //       .closest("div")
  //       .toHaveClass("box");
  //   });
});
