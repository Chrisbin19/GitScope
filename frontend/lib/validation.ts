import type { ValidationResult } from "@/types";

const MAX_USERNAME_LENGTH = 39;
const VALID_USERNAME_PATTERN = /^[A-Za-z0-9-]+$/;

export function validateGitHubUsername(value: string): ValidationResult {
  const username = value.trim();

  if (username.length === 0) {
    return { valid: false, error: "Please enter a GitHub username." };
  }

  if (username.length > MAX_USERNAME_LENGTH) {
    return {
      valid: false,
      error: "GitHub usernames must be 39 characters or fewer.",
    };
  }

  if (!VALID_USERNAME_PATTERN.test(username)) {
    return {
      valid: false,
      error: "GitHub usernames can only contain letters, numbers, and hyphens.",
    };
  }

  if (username.startsWith("-") || username.endsWith("-")) {
    return {
      valid: false,
      error: "GitHub usernames cannot start or end with a hyphen.",
    };
  }

  if (username.includes("--")) {
    return {
      valid: false,
      error: "GitHub usernames cannot contain consecutive hyphens.",
    };
  }

  return { valid: true };
}
