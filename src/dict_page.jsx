import { useState, useRef } from "react";
import { useLoaderData } from "react-router-dom";

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

    const audioCtx = new AudioContext();
    let audioBuf;
    let playingAudio = false;
    const audioURL = word.phonetics?.[0]?.audio;
    if (audioURL) {
        fetch(audioURL)
            .then((res) => res.blob())
            .then((blob) => blob.arrayBuffer())
            .then((arrBuf) => audioCtx.decodeAudioData(arrBuf))
            .then((buffer) => (audioBuf = buffer));
    }

    const playBtnRef = useRef(null);
    function playAudio() {
        if (playingAudio) {
            return;
        }
        const source = audioCtx.createBufferSource();
        source.buffer = audioBuf;
        source.connect(audioCtx.destination);
        source.start();
        playBtnRef.current.classList.add("disabled");
        playingAudio = true;
        source.addEventListener("ended", () => {
            playBtnRef.current.classList.remove("disabled");
            playingAudio = false;
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
                        ref={playBtnRef}
                        className="play-btn"
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
