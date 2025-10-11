import { redirect, Form } from "react-router-dom";

export async function searchAction({ request }) {
    const data = await request.formData();
    const query = data.get("query").trim();
    if (!query) {
        return redirect("/search");
    }
    return redirect(`/search/${query}`);
}

export function SearchHeader() {
    return (
        <header className="search-header">
            <search>
                <Form method="post" action="/search">
                    <button type="submit">
                        <i className="bx bx-search"></i>
                    </button>
                    <input
                        name="query"
                        type="search"
                        autoComplete="off"
                        placeholder="find something"
                    />
                </Form>
            </search>
        </header>
    );
}

export default function SearchPage() {
    //TODO: list of past queries
    return <ul></ul>;
}
