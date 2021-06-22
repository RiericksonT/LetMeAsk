import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import { Link } from 'react-router-dom'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export function NewRoom() {
  const { user } = useContext(AuthContext);

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
          <form>
            <input
              type="text"
              placeholder="Digite o codigo da sala"
            />
            <Button>Criar sala</Button>
          </form>
          <p> Quer entrar em uma sala existente <Link to="/">clique aqui</Link></p>
        </div>
      </main>
    </div>
  );
}