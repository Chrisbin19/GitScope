import type { Feature, NavLink, Step } from "@/types";

export const GITHUB_REPO_URL = "https://github.com/Chrisbin19/GitScope";

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "GitHub", href: GITHUB_REPO_URL, external: true },
];

export const FEATURES: readonly Feature[] = [
  {
    title: "GitHub Profile Analysis",
    description:
      "Analyze a developer's public GitHub profile and retrieve repository information.",
  },
  {
    title: "Repository Analysis",
    description:
      "Explore a developer's repositories, understand what the projects are about, and identify relevant repository information.",
  },
  {
    title: "Technology and Language Detection",
    description:
      "Identify programming languages across repositories and discover frameworks, tools, and technical areas.",
  },
  {
    title: "AI-Powered Developer Insights",
    description:
      "Get a consolidated analysis of technical expertise, summarizing main areas of interest and development activity based on available GitHub evidence.",
  },
];

export const STEPS: readonly Step[] = [
  {
    number: 1,
    title: "Enter a GitHub username",
    description: "Choose any public GitHub username to begin the analysis.",
  },
  {
    number: 2,
    title: "Retrieve and analyze",
    description:
      "GitScope retrieves and analyzes the developer's GitHub information.",
  },
  {
    number: 3,
    title: "Get AI-powered insights",
    description:
      "Receive an AI-generated report containing technical insights.",
  },
];
