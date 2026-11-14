export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type Feature = {
  title: string;
  description: string;
};

export type Step = {
  number: number;
  title: string;
  description: string;
};

export type ValidationResult = {
  valid: boolean;
  error?: string;
};
