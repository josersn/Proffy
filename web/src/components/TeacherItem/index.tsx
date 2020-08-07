import React, { FormEvent } from "react";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";
import api from "../../services/api";

export interface Teacher {
  id: number;
  subject: string;
  cost: number;
  user_id: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeachList: React.FC<TeacherItemProps> = ({ teacher }) => {
  function newConnection(e: FormEvent){
    e.preventDefault();
    api.post('connections',{
      user_id: teacher.user_id
    })
  }

  return (
    <article className="teacher-item">
      <header>
        <img
          src={teacher.avatar}
          alt={teacher.name}
        />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>
      <p>{teacher.bio}</p>
      <footer>
        <p>
          Preço por Hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a 
        target="_blank"
        rel="noopener noreferrer"
        onClick={newConnection}
        href={`https://wa.me/${teacher.whatsapp}`}
        >
          <img src={whatsappIcon} alt="Whatapp" />
          Entrar em Contato
        </a>
      </footer>
    </article>
  );
};

export default TeachList;
