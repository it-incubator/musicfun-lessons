import {useParams} from "react-router";

export const LoginPage = () => {
    let {lang} = useParams();
    if (!lang) lang = 'ge'
    return <div>
        lang: {lang}
        <hr/>

        <input/><input/>
        <button>Login</button>
    </div>
}