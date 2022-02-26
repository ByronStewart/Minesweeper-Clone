import { Link, LinkProps } from "react-router-dom"

interface Props extends LinkProps {}

export const MainMenuItem: React.FC<Props> = ({
  children,
  className,
  ...rest
}) => (
  <Link
    className={`block px-8 py-6 font-bold underline-offset-2 underline border-t border-slate-500 ${className}`}
    {...rest}
  >
    {children}
  </Link>
)
