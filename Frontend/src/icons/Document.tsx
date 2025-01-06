export function Document({ size = "4" }: { size?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`size-${size}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 2.25H6.75A2.25 2.25 0 0 0 4.5 4.5v15a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V8.25L15.75 2.25H9zM9 2.25v6h6M12 12h3m-6 3h6m-6 3h6"
      />
    </svg>
  );
}
