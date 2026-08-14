export default function Spinner({ className = "" }: { className?: string }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`inline-block w-4 h-4 rounded-full border-2 border-current/25 border-t-current animate-spin ${className}`}
    />
  );
}
