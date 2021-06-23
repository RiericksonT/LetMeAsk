import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss'

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCode() {
    navigator.clipboard.writeText('-Mcq8IMaZMHCAlPrqEwu')
  }

  return (
    <button className="room-code" onClick={copyRoomCode}>
      <div className="divBT">
        <img src={copyImg} alt="Copiar link da sala" />
      </div>
      <span className="spanBT">ID #{props.code}</span>
    </button>
  );
}