import { Link } from "react-router-dom"

const IndexPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="mx-6 mt-10">
        <h1 className="text-5xl">Modern Minesweeper</h1>
        <p className="mt-28 font-thin">
          Play the classic game in a whole new way...
        </p>
      </div>
      {/* Need Image here or animation */}
      <div className="flex justify-evenly mb-10">
        <Link
          className="px-4 py-2 bg-slate-400 text-xl rounded-sm active:bg-slate-600 hover:bg-slate-500"
          to="/instructions"
        >
          Tell me how
        </Link>
        <Link
          className="px-4 py-2 bg-slate-400 text-xl rounded-sm active:bg-slate-600 hover:bg-slate-500"
          to="/game"
        >
          Lets play
        </Link>
      </div>
    </div>
  )
}

export default IndexPage
