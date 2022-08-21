import {
  formatMinsAndSeconds,
  secondsToMinsAndSeconds,
} from "../../common/utils";

interface Props {
  time: number;
  username: string;
  avatarUrl?: string;
  idx: number;
}

export const ScoreListItem: React.FC<Props> = ({
  time,
  username,
  avatarUrl,
  idx,
}) => {
  const { mins, seconds } = secondsToMinsAndSeconds(time);
  const formattedTime = formatMinsAndSeconds(mins, seconds);
  const colors = idx % 2 ? "bg-gray-100" : "bg-gray-200";
  return (
    <div
      className={`bg-gray-100 font-semibold text-xl border-b border-x border-gray-300 items-center flex justify-between mx-auto p-4 max-w-md ${
        idx === 0 ? "border-t" : ""
      } ${colors}`}
    >
      <div className="flex justify-start items-center">
        {avatarUrl ? (
          <img
            className="rounded-full w-12 mr-5"
            src={avatarUrl}
            alt={`${username} avatar`}
          />
        ) : (
          <img
            className="rounded-full w-12 mr-5"
            src="images/avatar.png"
            alt="empty avatar"
          />
        )}
        <div>{username}</div>
      </div>
      <div className="mr-1">
        <span>Time: </span>
        <span>{formattedTime}</span>
      </div>
    </div>
  );
};
