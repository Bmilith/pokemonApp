interface ChipProps {
  label: string;
  className?: string;
}

export const Chip = ({ label, className = '' }: ChipProps) => (
  <span
    className={`inline-block px-3 py-2 m-1 rounded-full font-semibold capitalize ${className}`}
  >
    {label}
  </span>
);
