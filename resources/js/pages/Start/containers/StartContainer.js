import { useState} from "react";
import StartView from "../components/StartView";
import { useNavigate } from "react-router-dom";
import {ROUTE_NAMES} from "../../../routes/routeNames";

const StartContainer = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
    });

    let navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((state) => {
            const copy = { ...state };
            copy[name] = value;
            return copy;
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
            axios.post("http://tutor.test/api/login", {
                email: values.email,
                password: values.password
            }).then(response => {
                localStorage.setItem('token', response.data.token);
                if(response.data.role === "2") {
                    navigate(ROUTE_NAMES.STUDENT_ACCOUNT);
                }
                if(response.data.role === "1") {
                    navigate(`${ROUTE_NAMES.TEACHER_ACCOUNT}/${response.data['teacher_id']}`);
                }
                if(response.status!==201)
                {
                    let error = response.data.error;
                    setValues((state) => {
                        const copy = { ...state };
                        copy['error'] = error;
                        return copy;
                    });
                }
            })
    }

    return (
        <div>
            <StartView handleChange={handleChange} email={values.email} password={values.password} error={values.error} handleSubmit={handleSubmit}/>
        </div>
    )
}

export default StartContainer;
