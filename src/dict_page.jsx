import { useState } from "react";
import { useLoaderData } from "react-router-dom";

export async function dictPageLoader({ params }) {
    const query = params.query;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

export default function DictPage() {
    const json = useLoaderData();

    const words = json.map((word, i) => {
        return (
            <li key={i}>
                <Word word={word} />
            </li>
        );
    });

    return (
        <article>
            <ul className="words-list">{words}</ul>
        </article>
    );
}

function Word({ word }) {
    const meanings = word.meanings.map((meaning, i) => {
        const definitions = meaning.definitions.map((def, j) => {
            return (
                <li key={j}>
                    {def.definition}
                    {def.example ? (
                        <p className="example">{def.example}</p>
                    ) : (
                        ""
                    )}
                </li>
            );
        });

        return (
            <li key={i}>
                <h3>{meaning.partOfSpeech}</h3>
                <ul className="definitions-list">{definitions}</ul>
            </li>
        );
    });

    const [active, setActive] = useState(false);

    return (
        <>
            <div>
                <h2>
                    {word.word} {word.phonetic && `- ${word.phonetic}`}
                </h2>
                <button onClick={() => {
                    setActive(!active); 
                }}>
                    <i className={`bx bx-chevron-${active ? "down" : "left"}`}></i>
                </button>
            </div>
            <ul className={`meanings-list ${active ? "active" : ""}`} 
            role="list">
                {meanings}
            </ul>
        </>
    );
}