import { Form, redirect } from "react-router-dom";

export async function searchAction({ request }) {
    const data = await request.formData();
    const query = data.get("query");
    return redirect(`/search/${query}`);
}

export default function MainSearch() {
    return (
        <search className="main-search">
            <Form method="post">
                <button>
                    <i className="bx bx-search"></i>
                </button>
                <input
                    name="query"
                    type="search"
                    placeholder="find something..."
                />
            </Form>
        </search>
    );
}
