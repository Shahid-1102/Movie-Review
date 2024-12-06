import axios from "axios";

export default axios.create({
    //baseURL:'https://f836-2401-4900-889f-af7b-2116-2e2a-9502-99aa.ngrok-free.app',
    baseURL:`${process.env.REACT_APP_API_URL}`,
    headers: {"ngrok-skip-browser-warning": "true"}
})