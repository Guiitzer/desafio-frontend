import React from "react";
import "./loading.css";

export function Loading(): JSX.Element {
  return (
    <div className="tela-loading">
      <img src="/images/loading.gif" className="img-loading" alt="Pokebola" />
    </div>
  )
}