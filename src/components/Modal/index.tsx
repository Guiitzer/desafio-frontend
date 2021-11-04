import React from "react";
import { PropType } from "./interface";
import "./modal.css";

function Modal({ pokemon, onClose }: PropType): JSX.Element {
  const pesoAjustado = pokemon.weight / 10;
  const altAjustado = (pokemon.height / 10).toFixed(2);
  const statValue = pokemon.stats.map((arr) => arr.base_stat);
  const totHP = statValue[0];
  const totATK = statValue[1];
  const totDEF = statValue[2];
  const totSPD = statValue[5];

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <div className="modal-informations">
          <h3 className="name-modal">{pokemon.name}</h3>
          <div className="picture-modal">
            <img
              src={pokemon.sprites.front_default}
              alt="Imagem do pokemon selecionado"
            ></img>
            <img
              src={pokemon.sprites.back_default}
              alt="Imagem do pokemon selecionado"
            ></img>
          </div>
          <div className="inf-modal">
            <div className="princ-stats">
              <div className="value-stats shadow p-3 mb-5 bg-white rounded">
                {" "}
                HP: {totHP} ATK: {totATK} DEF: {totDEF} SPEED: {totSPD}{" "}
              </div>
            </div>
            <div className="princ-habil">
              <div>
                Principais Habilidades:{" "}
                {pokemon.abilities.map((arr) => arr.ability.name).join(" | ")}
              </div>
            </div>
            <div className="peso-alt">
              <div>Peso: {pesoAjustado} kgs</div>
              <div>Altura: {altAjustado} mts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
