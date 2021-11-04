import React from "react";
import { useState, useEffect } from "react";

import "./Pokedex.css";

import { ApiResponse } from "./interface";
import { Loading } from "../Loading";
import Modal from "../Modal";

function Pokedex(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<any>();
  const [filteredPokemons, setFilteredPokemons] = useState<ApiResponse>();
  const [searchTextInput, setSearchTextInput] = useState<string>();
  const [selectedPokemon, setSelectedPokemon] = useState<ApiResponse | null>();

  useEffect(() => {
    // Função que busca os dados da API baseado no ID do item.
    function getPokemon(id: number): Promise<Response> {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    }
    // Cria um array vazio de 99 'espaços vagos'.
    const pokemonIds = Array.from({ length: 99 }, (empty, index) => index + 1);

    // Função que utiliza a função de busca e popula os arrays vazios.
    const allPromises = pokemonIds.map((number) => {
      return getPokemon(number).then((response) => response.json());
    });
    console.log();

    setLoading(true);
    Promise
        .all<any>(allPromises)
        .then((res: ApiResponse[]) => {
            setLoading(false);
            setPokemons(res);
        });
  }, []);

  if (loading) {
    return <Loading />;
  }

  function buscaPoke() {
    const filteredPokemons = pokemons?.filter((pokemon: ApiResponse) => {
      return pokemon.name.includes(searchTextInput!.toLowerCase());
    });
    setFilteredPokemons(filteredPokemons);
  }

  const pokemonsToRender =
    filteredPokemons?.length > 0 ? filteredPokemons : pokemons;

  return (
    <div className="App">
      {selectedPokemon && (
        <Modal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}

      <header className="App-header">
        <img
          src="/images/pokeball.png"
          className="img-Pokeball"
          alt="Pokebola"
        />
        <div className="logo-Container">
          <img
            src="/images/pokedex-3d-logo.png"
            className="img-Pokedex"
            alt="Logo Pokedex"
          />
        </div>

        <div className="search-container">
          <input
            onChange={(event) => {
              const value = event.target.value;
              setSearchTextInput(value);
            }}
            type="text"
            placeholder="Buscar..."
          />
          <button onClick={buscaPoke}>🔍</button>
        </div>
      </header>
      <div className="App-body">
        <div className="cards-container">
          {pokemonsToRender?.map((pokemon: any) => (
            <>
              <div key={pokemon.id} className="card">
                <h2 className="card-title">{pokemon.name}</h2>

                <div
                  className="card-img-container"
                  onClick={() => setSelectedPokemon(pokemon)}
                >
                  <img
                    loading="lazy"
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${
                      pokemon.id < 10 ? `00${pokemon.id}` : `0${pokemon.id}`
                    }.png`}
                    className="card-img"
                    alt={pokemon.name}
                  />
                </div>

                <div className="card-type-container">
                  {pokemon.types.map((pokeType: any) => {
                    return (
                      <div key={pokeType.type.name} className="card-type">
                        <h4> {pokeType.type.name} </h4>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pokedex;
