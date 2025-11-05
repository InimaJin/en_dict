import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { addFavorite, loadFavorites, removeFavorite } from "./util";

export async function dictPageLoader({ params }) {
    const query = params.query;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(query);
    }

    let history = localStorage.getItem("history");
    history = history ? JSON.parse(history) : [];
    //Any query must only appear once in history.
    for (let i = 0; i < history.length; i++) {
        if (history[i] === query) {
            history.splice(i, 1);
            break;
        }
    }
    history.push(query);
    localStorage.setItem("history", JSON.stringify(history));

    return await response.json();
}

/**
 *  An entry in the dictionary.
 */
export default function DictPage() {
    const json = useLoaderData();

    const words = json.map((word, i) => {
        return (
            <li key={i}>
                <Word word={word} />
            </li>
        );
    });

    const { query } = useParams();

    return (
        <>
            <article>
                <ul className="words-list">{words}</ul>
            </article>
            <FavButton query={query} json={json} />
        </>
    );
}

/**
 * One part of the dictionary entry. Can have multiple meanings, each of which can have multiple definitions.
 * @param {object} word the word object
 */
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

    const audioCtx = new AudioContext();
    let audioBuf;
    const [playingAudio, setPlayingAudio] = useState(false);
    const audioURL = word.phonetics?.[0].audio;
    if (audioURL) {
        fetch(audioURL)
            .then((res) => res.blob())
            .then((blob) => blob.arrayBuffer())
            .then((arrBuf) => audioCtx.decodeAudioData(arrBuf))
            .then((buffer) => (audioBuf = buffer));
    }

    function playAudio() {
        if (playingAudio) {
            return;
        }
        const source = audioCtx.createBufferSource();
        source.buffer = audioBuf;
        source.connect(audioCtx.destination);
        source.start();

        setPlayingAudio(true);
        source.addEventListener("ended", () => {
            setPlayingAudio(false);
        });
    }

    const [wordExpanded, setWordExpanded] = useState(false);

    return (
        <>
            <div>
                <h2>
                    {word.word} {word.phonetic && `- ${word.phonetic}`}
                </h2>
                {audioURL && (
                    <button
                        onClick={playAudio}
                        className={`play-btn ${playingAudio ? "disabled" : ""}`}
                        aria-label="play audio"
                    >
                        <i className="bx  bx-play"></i>
                    </button>
                )}
                <button
                    onClick={() => {
                        setWordExpanded(!wordExpanded);
                    }}
                >
                    <i
                        className={`bx bx-chevron-${wordExpanded ? "down" : "left"}`}
                    ></i>
                </button>
            </div>
            <ul
                className={`meanings-list ${wordExpanded ? "active" : ""}`}
                role="list"
            >
                {meanings}
            </ul>
        </>
    );
}

/**
 * The button at the bottom right for adding/ removing an entry to/ from favorites.
 * @param {String} query the title of the entry
 * @param {object} json JSON representing this entry
 */
function FavButton({ query, json }) {
    const favs = loadFavorites();
    const [isFavorite, setIsFavorite] = useState(
        favs.some((obj) => obj.title === query)
    );

    function toggleFavorite() {
        if (isFavorite) {
            removeFavorite(query);
        } else {
            const DEFINITION_MAX_LEN = 30;
            let sneakPeek = json?.[0].meanings?.[0].definitions;
            sneakPeek = sneakPeek.slice(0, 2).map((obj) => {
                let def = obj.definition;
                if (def.length > DEFINITION_MAX_LEN) {
                    def = def.slice(0, DEFINITION_MAX_LEN) + " [...]";
                }
                return def;
            });

            addFavorite(query, sneakPeek);
        }

        setIsFavorite(!isFavorite);
    }

    return (
        <button
            className="favorite-btn"
            onClick={toggleFavorite}
            aria-label="set favorite"
        >
            <i className={`bx  bx${isFavorite ? "s" : ""}-heart`}></i>
        </button>
    );
}
