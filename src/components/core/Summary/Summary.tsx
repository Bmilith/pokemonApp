interface SummaryItem {
  label: string;
  value: React.ReactNode;
}

interface SummaryCardProps {
  title: string;
  items: SummaryItem[];
  className?: string;
}

export function Summary({ title, items, className }: SummaryCardProps) {
  return (
    <div
      className={`mt-6 bg-gray-50 p-4 rounded shadow text-sm sm:text-base ${
        className ?? ''
      }`}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {items.map(({ label, value }) => (
        <p key={label} className="mt-1">
          <strong>{label}:</strong> {value}
        </p>
      ))}
    </div>
  );
}
