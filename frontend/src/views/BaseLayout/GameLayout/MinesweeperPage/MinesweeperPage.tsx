import Minesweeper from "../../../../components/Minesweeper/Minesweeper";

type Props = {};

const MinesweeperPage: React.FC<Props> = () => {
  return (
    <div>
      <div>The minesweeper page</div>
      <div className="flex">
        <Minesweeper />
        <div>
          TODO. the game history, should be saved in client if no user but{" "}
        </div>
      </div>
    </div>
  );
};

export default MinesweeperPage;
