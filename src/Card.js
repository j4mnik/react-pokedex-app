import {useEffect, useState} from "react";

function Card({name, url}) {

    const [id, setId] = useState(null);
    const [type, setType] = useState("Unknown");
    const [sprite, setSprite] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [weight, setWeight] = useState(null);
    const [height, setHeight] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url)
            const json = await response.json();
            setId(json["id"]);
        }

        fetchData().then(r => {})
    }, [])

    useEffect(() => {
        if (id) {
            async function fetchData() {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                const json = await response.json();
                setSprite(json["sprites"]["front_default"]);
                setWeight(json["weight"]);
                setHeight(json["height"]);
                setType(json["types"][0]["type"]["name"])
            }

            fetchData().then(r => {}) }
    }, [id])

    function toggleExpanded() {
        setIsExpanded(!isExpanded);
    }

    return(
        <div
            className="grid grid-cols-4 items-center m-5 px-5 transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-300 bg-white dark:bg-[#192841] text-gray-800 dark:text-white font-semibold capitalize rounded-lg shadow-md">
            <div className="mx-4">
                <img className="m-4 max-h-36" alt="photo" src={sprite}/>
            </div>
            <div className="">
                <h1 className="font-bold">{name}</h1>
            </div>
            <div className="px-2">
                <h2 className="font-semibold">{type}</h2>
            </div>
            <div className="mx-2">
                <button
                    onClick={toggleExpanded}
                    className="bg-gray-300 hover:bg-gray-400 dark:bg-[#23395d] dark:text-white text-gray-800 font-bold py-2 px-4 rounded-xl inline-flex items-center">
                    More info
                </button>
            </div>
            {isExpanded &&
            <div className="inline-flex items-center text-center rounded-lg p-4">
                <div className="mx-2">
                 <h1 className="font-bold">{weight}</h1>
                    <h1 className="font-normal">Weight</h1>
                </div>
                <div className="mx-2">
                    <h1 className="font-bold">{height}</h1>
                    <h1 className="font-normal">Height</h1>
                </div>
            </div>
            }
        </div>

    )
}


export default  Card;