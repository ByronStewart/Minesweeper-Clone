import { Link, LinkProps } from "react-router-dom";

interface LProps extends LinkProps {}

export const MainMenuLink: React.FC<LProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = `block px-8 py-6 font-bold underline-offset-2 underline border-t border-slate-500 ${className}`;
  return (
    <Link className={classes} {...rest}>
      {children}
    </Link>
  );
};

interface BProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const MainMenuButton: React.FC<BProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = `w-full text-left block px-8 py-6 font-bold underline-offset-2 underline border-t border-slate-500 ${className}`;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};
