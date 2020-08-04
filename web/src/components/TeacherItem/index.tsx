import React from "react";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg"

import "./styles.css"

const TeachList = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars0.githubusercontent.com/u/37668590?s=460&u=356ade41ff40b99deb391efc0f1100877ecd927b&v=4"
          alt="José Ramos"
        />
        <div>
          <strong>José Ramos</strong>
          <span>Matemática</span>
        </div>
      </header>
      <p>
        Ensinando as pessoas a lutarem contra matemática
        <br /> <br />
        Ensinando seus alunos a nocautear a matemática, faz fez mais de 200 mil
        alunos vencerem a luta
      </p>
      <footer>
        <p>
          Preço por Hora
          <strong>R$ 120,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatapp" />
          Entrar em Contato
        </button>
      </footer>
    </article>
  );
};

export default TeachList;