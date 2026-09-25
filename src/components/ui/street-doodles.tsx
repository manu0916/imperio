type DoodleProps = {
  className?: string;
};

export function StarDoodle({ className = "" }: DoodleProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 140"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M70 9 80 51l39-20-28 36 41 11-43 6 22 38-34-28-16 39V94l-43 23 29-35L8 68l42-4-24-36 35 24 9-43Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowDoodle({ className = "" }: DoodleProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 190 90"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 62c25-38 58 20 86-20 25-35 51 12 88-27"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="m163 13 20 1-4 20"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WireDoodle({ className = "" }: DoodleProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 96"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M-20 49C40 13 77 83 137 48s97 34 157-1 97 34 157-1 97 34 157-1 97 34 157-1 97 34 157-1 97 34 157-1 97 34 157-1 97 34 224-2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="m76 31 15 31m107-32 15 31m107-32 15 31m107-32 15 31m107-32 15 31m107-32 15 31m107-32 15 31m107-32 15 31m107-32 15 31m107-32 15 31m107-32 15 31"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export function CrossDoodle({ className = "" }: DoodleProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m12 11 77 77M89 11 12 88M6 49h89"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

