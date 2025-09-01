import { Outlet, Form, redirect } from "react-router-dom";

export async function searchAction({ request }) {
    const data = await request.formData();
    const query = data.get("query").trim();
    if (!query) {
        return redirect("/");
    }
    return redirect(`/search/${query}`);
}

export default function App() {
    return (
        <>
            <header>
                <search>
                    <Form method="post">
                        <button>
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
            <Outlet />
        </>
    );
}
