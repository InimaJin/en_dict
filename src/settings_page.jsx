import { useEffect, useRef, useState } from "react";
import { writeFavorites, writeHistory } from "./util";
import { useOutletContext } from "react-router-dom";

//TODO: Display the size of local data on disk.
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
                            Clear
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
                            Clear
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
