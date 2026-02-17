import { useState, useEffect } from "react";
import { useRouteError, useNavigate } from "react-router-dom";

export function EntryNotFound() {
    const error = useRouteError();
    const badQuery = error.message;

    const navigate = useNavigate();

    const [countdown, setCountdown] = useState(5);
    if (countdown === 0) {
        navigate("/search");
    }
    useEffect(() => {
        const intID = setInterval(() => {
            setCountdown((prev) => {
                if (prev == 1) {
                    return 0;
                }
                return prev - 1;
            });
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
            <div className="error-countdown">{countdown}</div>
        </>
    );
}
