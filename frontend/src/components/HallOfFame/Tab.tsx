interface Props extends React.LiHTMLAttributes<HTMLLIElement> {
  active: boolean
}

export const Tab: React.FC<Props> = (
  { children, active, onClick },
  ...props
) => {
  return (
    <li
      className={`font-custom font-semibold text-xl cursor-pointer block py-4 px-2 ${
        active
          ? "underline underline-offset-2 decoration-4 decoration-blue-500"
          : ""
      }`}
      onClick={onClick}
      {...props}
    >
      {children}
    </li>
  )
}
