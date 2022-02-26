import { Link } from "react-router-dom"

const IndexPage: React.FC = () => {
  return (
    <div className="h-screen bg-red-200">
      <div className="flex flex-col justify-between">
        <h1 className="text-5xl">Modern Minesweeper</h1>
        <p className="mt-28 font-thin">
          Play the classic game in a whole new way...
        </p>
        {/* Need Image here or animation */}
        <Link
          className="mt-10 px-4 py-2 bg-slate-400 text-xl rounded-sm active:bg-slate-600 hover:bg-slate-500"
          to="/game"
        >
          Lets play
        </Link>
        <Link to="/instructions">Tell me how</Link>
      </div>
    </div>
  )
}

export default IndexPage
