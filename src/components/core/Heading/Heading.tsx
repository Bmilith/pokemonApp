interface HeadingProps {
  title?: string;
  subTitle?: string;
  size?: 'sm' | 'lg';
  color?: 'primary' | 'secondary';
}

export const Heading = ({
  title,
  subTitle,
  size = 'lg',
  color = 'primary',
}: HeadingProps) => {
  const sizeClass =
    size === 'sm' ? 'text-2xl lg:text-3xl' : 'text-3xl lg:text-4xl';
  const colorClass = color === 'primary' ? 'text-black' : 'text-white';

  return (
    <div className="mb-2 mt-5 max-w-[900px] mx-auto space-y-2">
      {title && (
        <h1 className={`font-bold  dark:text-white ${sizeClass} ${colorClass}`}>
          {title}
        </h1>
      )}
      {subTitle && (
        <p className="text-lg text-gray-500 font-semibold  dark:text-white">
          {subTitle}
        </p>
      )}
    </div>
  );
};
