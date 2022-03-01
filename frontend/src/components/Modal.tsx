interface Props {
  onOpen: VoidFunction
  onClose?: VoidFunction
}

export const Modal: React.FC<Props> = ({ children, onOpen, onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed left-0 top-0 flex justify-center items-center h-full w-full  bg-black/25"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-10 bg-white font-normal"
      >
        {children}
      </div>
    </div>
  )
}
