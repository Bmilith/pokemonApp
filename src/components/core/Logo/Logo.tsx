type LogoProps = {
  title: string;
};

export const Logo = ({ title }: LogoProps) => {
  return (
    <h4 className="text-red-500 font-semibold tracking-widest text-2xl uppercase sm:text-3xl">
      {title}
    </h4>
  );
};
