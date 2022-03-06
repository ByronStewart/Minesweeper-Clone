interface Props {
  onOpen: VoidFunction
  onClose?: VoidFunction
}

export const Modal: React.FC<Props> = ({ children, onOpen, onClose }) => {
  return (
    <div
      onClick={onClose}
      className="z-10 fixed left-0 top-0 flex justify-center items-center h-full w-full  bg-black/25"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-5 bg-white font-normal bg-white/90"
      >
        {children}
      </div>
    </div>
  )
}
