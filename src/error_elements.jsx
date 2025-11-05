import { useEffect, useRef } from "react";
import { useRouteError, useNavigate } from "react-router-dom";

export function EntryNotFound() {
    const error = useRouteError();
    const badQuery = error.message;

    const navigate = useNavigate();

    const countdownRef = useRef(null);
    let countdown = 6;
    useEffect(() => {
        const intID = setInterval(() => {
            countdown--;
            if (countdown === 0) {
                navigate("/search");
            } else {
                countdownRef.current.innerText = countdown;
            }
        }, 1000);
        return () => {
            clearInterval(intID);
        };
    }, []);

    return (
        <>
            <div className="entry-not-found">
                <h2>Entry not found.</h2>
                <p>
                    There are no matches for <i>"{badQuery}"</i> in the
                    dictionary.
                </p>
                <p>Automatically redirecting you...</p>
            </div>
            <div className="error-countdown" ref={countdownRef} />
        </>
    );
}
