interface Props extends React.LiHTMLAttributes<HTMLLIElement> {
  active: boolean;
}

export const Tab: React.FC<Props> = ({ children, active, onClick }) => {
  return (
    <li
      className={`font-custom font-semibold text-xl cursor-pointer block py-4 px-2 capitalize ${
        active
          ? "underline underline-offset-2 decoration-4 decoration-blue-500"
          : ""
      }`}
      onClick={onClick}
    >
      {children}
    </li>
  );
};
