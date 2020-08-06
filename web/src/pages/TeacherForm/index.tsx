import React, { useState } from "react";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Select from "../../components/Select";

import warningIcon from "../../assets/images/icons/warning.svg";
import "./styles.css";

const TeachForm = () => {
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);

  function addScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: "", to: "" }
    ])
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer das aulas."
        description="O primeiro é preenher esse formulário de inscrição"
      />
      <main>
        <fieldset>
          <legend>Seus Dados</legend>
          <Input name="name" label="Nome Completo" />
          <Input name="avatar" label="Avatar" />
          <Input name="whatsapp" label="Nome WhatsApp" />
          <TextArea name="bio" label="Biografia" />
        </fieldset>
        <fieldset>
          <legend>Sobre a Aula</legend>
          <Select
            name="subject"
            label="Matéria"
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Física", label: "Física" },
              { value: "Educação Física", label: "Educação Física" },
              { value: "Geografia", label: "Geografia" },
              { value: "História", label: "História" },
              { value: "Matemática", label: "Matemática" },
              { value: "Português", label: "Português" },
              { value: "Química", label: "Química" },
              { value: "Biologia", label: "Biologia" },
            ]}
          />
          <Input name="cost" label="Custo da sua hora por aula" />
        </fieldset>
        <fieldset>
          <legend>
            Horarios Disponíveis
            <button type="button" onClick={addScheduleItem}>
              + Novo horário
            </button>
          </legend>
          {scheduleItems.map((item) => {
            return (
              <div className="schedule-item"  key={item.week_day}>
                <Select
                  name="week-day"
                  label="Dia Da Semana"
                  value={item.week_day}
                  options={[
                    { value: "0", label: "Domingo" },
                    { value: "1", label: "Segunda-feira" },
                    { value: "2", label: "Terça-Feira" },
                    { value: "3", label: "Quarta-Feira" },
                    { value: "4", label: "Quinta-Feira" },
                    { value: "5", label: "Sexta-Feira" },
                    { value: "6", label: "Sábado" },
                  ]}
                />
                <Input name="from" label="Das" type="time" />
                <Input name="to" label="Até" type="time" />
              </div>
            );
          })}
        </fieldset>
        <footer>
          <p>
            <img src={warningIcon} alt="Aviso Importante" />
            Importante! <br />
            Preencha todos os dados
          </p>
          <button type="button">Salvar cadastro</button>
        </footer>
      </main>
    </div>
  );
};

export default TeachForm;
