import { type ChangeEvent, type FormEvent, useState } from "react";

export const LoginPage = () => {
    const [login, setLogin] = useState("");
    const [error, setError] = useState<string | null>(null);

    const [touchStatus, setTouchStatus] = useState<"untouched" | "touched">("untouched");
    const [modificationStatus, setModificationStatus] = useState<"pristine" | "dirty">("pristine");
    const [validationStatus, setValidationStatus] = useState<"pending" | "valid" | "invalid">("pending");

    const isEmail = (str: string) =>
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(str);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (modificationStatus === "pristine") setModificationStatus("dirty");
        setLogin(value);
        const ok = isEmail(value);
        setValidationStatus(ok ? "valid" : "invalid");
        setError(ok ? null : "Некорректный e-mail");
    };

    const handleBlur = () => {
        if (touchStatus === "untouched") setTouchStatus("touched");
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (touchStatus === "untouched") setTouchStatus("touched");
        if (modificationStatus === "pristine") setModificationStatus("dirty");

        const ok = isEmail(login);
        setValidationStatus(ok ? "valid" : "invalid");
        setError(ok ? null : "Некорректный e-mail");

        if (ok) {
            // loginMutation(login)
        }
    };

    const showError = touchStatus === "touched" && modificationStatus === "dirty" && validationStatus === "invalid";

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="email"
                    name="login"
                    value={login}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={validationStatus === "invalid"}
                    aria-describedby="login-error"
                    autoComplete="username"
                    placeholder="you@example.com"
                />
                {showError && <span id="login-error">{error}</span>}
            </div>

            <div>
                <input />
            </div>

            <button type="submit">Login</button>
        </form>
    );
};
