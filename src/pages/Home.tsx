import { useHistory } from 'react-router'
import { FormEvent, useContext, useState } from 'react'
import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleLogo from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { auth, database, firebase } from '../service/firebase'
import { AuthContext } from '../contexts/AuthContext'


export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useContext(AuthContext)
  const [roomCode, setroomCode] = useState('');
  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomsRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomsRef.exists()) {
      alert('A sala nao existe!')
      return;
    }
    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={ilustrationImg} alt="Ilustracao que simboliza perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiencia em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Logo do Let Me Ask" />
          <button className="createRoom" onClick={handleCreateRoom}>
            <img src={googleLogo} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">
            Ou entre em uma sala
          </div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o codigo da sala"
              onChange={event => setroomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}

function result(result: any) {
  throw new Error('Function not implemented.')
}
