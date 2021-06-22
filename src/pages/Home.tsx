import { useHistory } from 'react-router'
import { useContext } from 'react'
import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleLogo from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { auth, firebase } from '../service/firebase'


export function Home() {
  const history = useHistory();


  function handleCreateRoom() {
    history.push('/rooms/new');
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
          <form>
            <input
              type="text"
              placeholder="Digite o codigo da sala"
            />
          </form>
          <Button>Entrar na sala</Button>
        </div>
      </main>
    </div>
  );
}

function result(result: any) {
  throw new Error('Function not implemented.')
}
