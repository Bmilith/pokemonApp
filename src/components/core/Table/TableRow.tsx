interface TableRowCell {
  key: string;
  content: React.ReactNode;
  className?: string;
}

interface TableRowProps {
  cells: TableRowCell[];
  className?: string;
}

export function TableRow({ cells, className }: TableRowProps) {
  return (
    <tr
      className={`text-center hover:bg-gray-50 text-xs sm:text-sm ${
        className ?? ''
      }`}
    >
      {cells.map(({ key, content, className }) => (
        <td
          key={key}
          className={`border border-gray-300 px-2 sm:px-4 py-1 sm:py-2 ${
            className ?? ''
          }`}
        >
          {content}
        </td>
      ))}
    </tr>
  );
}
