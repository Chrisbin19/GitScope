"use client";

import { useId, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { validateGitHubUsername } from "@/lib/validation";

export type UsernameFormProps = {
  onSubmit?: (username: string) => void;
};

export function UsernameForm({ onSubmit }: UsernameFormProps) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const inputId = useId();
  const errorId = `${inputId}-error`;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);

    if (error) {
      setError(null);
    }

    if (status) {
      setStatus(null);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
    setStatus(normalizedUsername);

    // TODO: Send normalizedUsername to the backend analysis endpoint.
    onSubmit?.(normalizedUsername);
  }

  return (
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
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className="h-11 w-full rounded-md border border-border bg-surface px-3.5 font-mono text-sm text-foreground placeholder:text-subtle focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          />
        </div>
        <Button type="submit" className="h-11 w-full sm:w-auto">
          Analyze profile
        </Button>
      </div>

      {error ? (
        <p id={errorId} role="alert" className="mt-2 text-sm text-danger">
          {error}
        </p>
      ) : null}

      {status ? (
        <p role="status" className="mt-3 font-mono text-xs text-muted">
          Ready to analyze: <span className="text-foreground">{status}</span>
        </p>
      ) : null}
    </form>
  );
}
