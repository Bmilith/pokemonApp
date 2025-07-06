interface TableHeaderColumn {
  key: string;
  label: string;
  className?: string;
}

interface TableHeaderProps {
  columns: TableHeaderColumn[];
  className?: string;
}

export function TableHeader({ columns, className }: TableHeaderProps) {
  return (
    <thead className={className}>
      <tr>
        {columns.map(({ key, label, className }) => (
          <th
            key={key}
            className={`border border-gray-300 px-2 sm:px-4 py-1 sm:py-2 ${
              className ?? ''
            }`}
          >
            {label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
