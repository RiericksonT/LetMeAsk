import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { FormEvent } from "react"
import { database } from '../service/firebase'
import firebase from 'firebase'

export function NewRoom() {
  const { user } = useContext(AuthContext);

  const history = useHistory();

  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {

    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomsRef = database.ref('rooms')

    const firebaseRoom = await roomsRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)
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
          <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Digite o codigo da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button>Criar sala</Button>
          </form>
          <p> Quer entrar em uma sala existente <Link to="/">clique aqui</Link></p>
        </div>
      </main>
    </div>
  );
}