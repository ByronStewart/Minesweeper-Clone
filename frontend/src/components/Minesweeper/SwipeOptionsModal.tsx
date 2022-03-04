export const SwipeOptionsModal: React.FC = () => {
  return (
    <div
      className="absolute z-10 bg-gray-200 flex justify-between items-center"
      style={{
        left: "-50px",
        top: "-50px",
        width: "140px",
        height: "140px",
      }}
    >
      <div className="ml-5">reveal</div>
      <div className="mr-5">flag</div>
    </div>
  )
}
