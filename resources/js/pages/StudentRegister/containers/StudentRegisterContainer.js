import {useState, useEffect} from "react";
import StudentRegisterView from "../components/StudentContainerView";
import {ROUTE_NAMES} from "../../../routes/routeNames";
import {Redirect, useNavigate} from "react-router-dom";

const StudentRegisterContainer = () => {
    const [values, setValues] = useState({
        last_name: "",
        name: "",
        second_name: "",
        phone: "",
        email: "",
        password: "",
        error: ""
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
        axios.post("http://tutor.test/api/register", {
            email: values.email,
            password: values.password,
            last_name: values.last_name,
            name: values.name,
            second_name: values.name,
            phone: values.phone,
            role: 2
        }).then(response => {
            localStorage.setItem('token', response.data.token);

            navigate(ROUTE_NAMES.STUDENT_ACCOUNT);
        }).catch((error)=> {
            const message = error.response.data.errors;
            setValues((state) => {
                const copy = {...state};
                for (let error in message) {
                    copy['error'] = message[error][0];
                    break;
                }
                return copy;
            });
        });
    }

        return (
            <div>
                <StudentRegisterView
                    last_name={values.last_name}
                    name={values.name}
                    second_name={values.second_name}
                    phone={values.phone}
                    email={values.email}
                    password={values.password}
                    error={values.error}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}/>
            </div>
        )
}

export default StudentRegisterContainer;
