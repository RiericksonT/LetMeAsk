import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/roomCode';
import '../styles/rooms.scss';
import { useParams } from 'react-router';
import { FormEvent, useEffect, useState } from 'react';
import { useAuthe } from '../hooks/useAuthe'
import { database } from '../service/firebase';

type Question = {
  id: string,
  author: {
    name: string,
    avatar: string
  }
  content: string;
  isHighlighted: boolean;
  isAwnswered: boolean;
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string,
    avatar: string
  }
  content: string;
  isHighlighted: boolean;
  isAwnswered: boolean;
}>

type RoomParams = {
  id: string;
}

export function Room() {
  const { user } = useAuthe();
  const parms = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const roomId = parms.id;
  const [Questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isAwnswered: value.isAwnswered,
          isHighlighted: value.isHighlighted

        };
      })
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    })
  }, [roomId]);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === '') {
      return;
    }
    if (!user) {
      throw new Error('Voce precisa estar logado.')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAwnswered: false
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  }

  return (
    <div id="page1">
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo Let Me Ask" />
          <RoomCode code={parms.id} />
        </div>
      </header>

      <main className="main-page">
        <div className="room-title">
          <h1> Sala {title} </h1>
          <span> {Questions.length} pergunta(s) </span>
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que deseja perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            )
              : (
                <span className="spanLoggedOut"> Para enviar uma pergunta, <button>Faca seu login</button></span>
              )
            }
            < Button type="submit" disabled={!user}> Enviar Pergunta </Button>
          </div>
        </form>
      </main>

    </div >
  );
}

function useAuth() {
  throw new Error('Function not implemented.');
}
