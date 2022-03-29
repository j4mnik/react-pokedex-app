import React, {Component, useEffect, useState} from "react";
import Card from "./Card";

function App() {
    const [page, setPage] = useState(1);
    const [pokemonList, setPokemonList] = useState(null);
    const [initialList, setInitialList] = useState(null);
    const [previousLink, setPreviousLink] = useState(null);
    const [nextLink, setNextLink] = useState(null);
    const [nameSearchbar, setNameSearchbar] = useState("");

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${(page-1)*20}`)
            const json = await response.json();
            setPreviousLink(json["previous"]);
            setNextLink(json["next"]);
            setPokemonList(json["results"]);
            setInitialList(json["results"]);
        }

        fetchData().then(r => {

        });
    }, [page])

    useEffect(() => {
        if (nameSearchbar) {
        setPokemonList(initialList.filter(nameFilter));
        }
        else {
            setPokemonList(initialList)
        }
    }, [nameSearchbar])

    function nextPage() {
        setPage(page+1);
    }

    function previousPage() {
        setPage(page-1);
    }

    function nameFilter(value) {
        return value["name"].indexOf(nameSearchbar) > -1;
    }

    return (
        <div className="App flex flex-col items-center h-full bg-gray-100 dark:bg-slate-900 ">
            <div className="w-full flex justify-between font-bold text-xl p-6 tracking-wider bg-white dark:bg-[#203354] shadow-sm">
                <h1 className="text-pokemonBlue text-[#3368b0] dark:text-[#ffcb02]">Pokedex App</h1>
                <a href="https://pokeapi.co/" target="_blank" className="text-base text-gray-900 dark:text-white hover:text-[#ffcb02]">
                    API </a>
            </div>
            <div className="m-2 flex flex-col items-center justify-center">
                <input
                    onChange={event => setNameSearchbar(event.target.value)} value={nameSearchbar}
                    className="px-6 py-2 my-4 bg-white dark:bg-[#23395d] dark:text-white font-bold rounded-lg shadow-md"
                    placeholder="Search by name"
                />
            </div>
            <div className="flex flex-col justify-center text-center items-center justify-center">
                {pokemonList?.map(pokemon => <Card key={pokemon.name} name={pokemon.name} url={pokemon.url}/>
                   )}
            </div>
            <div className="w-full flex items-center justify-center m-10">
                <button onClick={previousPage} className="bg-sky-500 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:bg-gray-200 mx-2" disabled={previousLink === null}>
                    Prev
                </button>
                <h1 className="text-black dark:text-white font-bold mx-2">{page}</h1>
                <button onClick={nextPage} className="text-gray-800 font-bold py-2 px-4 rounded-r bg-sky-500 hover:bg-sky-400 disabled:bg-gray-200 mx-2" disabled={nextLink === null}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default App;
