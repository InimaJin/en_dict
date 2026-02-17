import { useEffect, useRef, useState } from "react";
import {
    loadFavorites,
    loadHistory,
    writeFavorites,
    writeHistory,
} from "./storage";
import { useOutletContext } from "react-router-dom";

export default function SettingsPage() {
    const { currentDisplayMode, toggleNextDisplayMode } = useOutletContext();
    const displayMode =
        currentDisplayMode.charAt(0).toUpperCase() +
        currentDisplayMode.slice(1);

    const dialogRef = useRef();

    //Operation: the function that performs an operation requested by the user and needs confirmation
    //via dialog, e. g. clear history.
    const [operation, setOperation] = useState(null);
    useEffect(() => {
        if (operation) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    });

    function sizeString(data) {
        let size;
        if (data.length === 0) {
            size = 0;
        } else {
            size = new Blob([JSON.stringify(data)]).size;
        }

        let val, unit;
        if (size < 1024) {
            val = size;
            unit = "B";
        } else if (size < 1024 * 1024) {
            val = (size / 1024).toFixed(2);
            unit = "KB";
        } else {
            val = (size / (1024 * 1024)).toFixed(2);
            unit = "MB";
        }

        return "(" + val + unit + ")";
    }

    return (
        <>
            <div className="settings-wrapper padded-wrapper">
                <section>
                    <h2>Appearance</h2>
                    <div className="setting-box">
                        <h3>Display mode</h3>
                        <button
                            className="simple-btn"
                            onClick={toggleNextDisplayMode}
                        >
                            {displayMode}
                        </button>
                    </div>
                </section>
                <section>
                    <h2>Local data</h2>
                    <div className="setting-box">
                        <h3>Search history</h3>
                        <button
                            className="simple-btn"
                            onClick={() => {
                                setOperation(() => () => {
                                    writeHistory([]);
                                });
                            }}
                        >
                            Clear {sizeString(loadHistory())}
                        </button>
                    </div>
                    <div className="setting-box">
                        <h3>Favorites</h3>
                        <button
                            className="simple-btn"
                            onClick={() => {
                                setOperation(() => () => {
                                    writeFavorites([]);
                                });
                            }}
                        >
                            Clear {sizeString(loadFavorites())}
                        </button>
                    </div>
                </section>
            </div>

            <dialog className="confirm-dialog" ref={dialogRef} closedby="any">
                <h1>Are you sure?</h1>
                <p>All data will be deleted.</p>
                <div>
                    <button
                        className="simple-btn"
                        onClick={() => {
                            operation();
                            setOperation(null);
                        }}
                    >
                        Confirm
                    </button>
                    <button
                        className="simple-btn"
                        onClick={() => setOperation(null)}
                    >
                        Cancel
                    </button>
                </div>
            </dialog>
        </>
    );
}
