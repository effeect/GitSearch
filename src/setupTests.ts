// src/setupTests.ts

import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
// or use import '@testing-library/jest-dom/vitest'; (recommended modern approach)

// Extends Vitest's expect with the custom matchers from jest-dom
expect.extend(matchers);

// Runs a cleanup after each test case (e.g., clearing the DOM)
afterEach(() => {
  cleanup();
});
