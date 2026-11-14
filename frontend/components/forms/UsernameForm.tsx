
"use client";

import { useId, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { validateGitHubUsername } from "@/lib/validation";

type AnalyzeResponse = {
  success: boolean;
  username: string;
  report: string;
};

export type UsernameFormProps = {
  onSubmit?: (username: string) => void;
};

export function UsernameForm({ onSubmit }: UsernameFormProps) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const inputId = useId();
  const errorId = `${inputId}-error`;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
    setError(null);
    setStatus(null);
    setReport(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = validateGitHubUsername(username);

    if (!result.valid) {
      setError(result.error ?? "Enter a valid GitHub username.");
      setStatus(null);
      return;
    }

    const normalizedUsername = username.trim();

    setUsername(normalizedUsername);
    setError(null);
    setStatus(null);
    setReport(null);
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: normalizedUsername,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ?? "Failed to analyze GitHub profile."
        );
      }

      const result = data as AnalyzeResponse;

      if (!result.success || !result.report) {
        throw new Error("The backend did not return a valid report.");
      }

      setReport(result.report);
      setStatus(`Analysis completed for ${normalizedUsername}`);

      onSubmit?.(normalizedUsername);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} noValidate className="w-full">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <label htmlFor={inputId} className="sr-only">
              GitHub username
            </label>

            <input
              id={inputId}
              name="username"
              type="text"
              value={username}
              onChange={handleChange}
              placeholder="GitHub username"
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              disabled={loading}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              className="h-11 w-full rounded-md border border-control-border bg-surface px-3.5 font-mono text-sm text-foreground placeholder:text-subtle focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full sm:w-auto"
          >
            {loading ? "Analyzing..." : "Analyze profile"}
          </Button>
        </div>

        {error && (
          <p id={errorId} role="alert" className="mt-2 text-sm text-danger">
            {error}
          </p>
        )}

        {loading && (
          <p role="status" className="mt-3 text-sm text-muted">
            Analyzing GitHub profile. This may take a little while...
          </p>
        )}

        {status && !loading && (
          <p role="status" className="mt-3 font-mono text-xs text-muted">
            {status}
          </p>
        )}
      </form>

      {report && (
        <section
          aria-labelledby="analysis-heading"
          className="mt-8 rounded-md border border-border bg-surface p-5"
        >
          <h2
            id="analysis-heading"
            className="mb-4 text-lg font-semibold text-foreground"
          >
            GitScope Analysis Report
          </h2>

          <div className="whitespace-pre-wrap break-words text-sm leading-7 text-muted">
            {report}
          </div>
        </section>
      )}
    </div>
  );
}
