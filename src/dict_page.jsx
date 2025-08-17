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
            <ol>{words}</ol>
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
                        <ul>
                            <li>
                                <i>{def.example}</i>
                            </li>
                        </ul>
                    ) : (
                        ""
                    )}
                </li>
            );
        });
        
        return (
            <li key={i}>
                <h3>{meaning.partOfSpeech}</h3>
                <ul>
                    {definitions}
                </ul>
            </li>
        );
    });

    return (
        <>
            <h2>
                {word.word} {word.phonetic && `- ${word.phonetic}`}
            </h2>
            <ol>{meanings}</ol>
        </>
    );
}
