interface Props {
  time: number
  username: string
  avatarUrl?: string
}

export const HighScore: React.FC<Props> = ({ time, username, avatarUrl }) => {
  return (
    <div className="flex justify-between mx-5 p-4">
      <div className="flex justify-start">
        {avatarUrl ? (
          <img src={avatarUrl} alt={`${username} avatar`} />
        ) : (
          <div>no avatar</div>
        )}
        <div>{username}</div>
      </div>
      <div>{time}</div>
    </div>
  )
}
