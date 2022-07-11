import {useState, useEffect} from "react";
import StudentView from "../components/StudentView";
import {useNavigate} from "react-router-dom";
import {ROUTE_NAMES} from "../../../routes/routeNames";

const StudentContainer = () => {
    const [values, setValues] = useState({
        last_name: "",
        name: "",
        second_name: "",
        email: "",
        phone: "",
        isUploaded: false,
        orders: [],
    });

    let navigate = useNavigate();

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        axios.get('http://tutor.test/api/student', config).then(response => {
            const {user, orders} = response.data;

            const {last_name, name, second_name, email, phone} = user;
            setValues((state) => {
                const copy = { ...state };
                copy['isUploaded'] = true;
                copy['last_name'] = last_name;
                copy['name'] = name;
                copy['second_name'] = second_name;
                copy['email'] = email;
                copy['phone'] = phone;
                copy['orders'] = orders;
                return copy;
            });
        }).catch((error) => {
            navigate(ROUTE_NAMES.SEARCH);
        });
    }, []);

    const handleLogout = (event) => {
        event.preventDefault();
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        axios.get('http://tutor.test/api/logout', config).then(response => {
            localStorage.removeItem('token');
            navigate(ROUTE_NAMES.START_PAGE);
        });
    }

    if(values.isUploaded) {
        return (
            <div>
                <StudentView
                    phone={values.phone}
                    email={values.email}
                    second_name={values.second_name}
                    name={values.name}
                    last_name={values.last_name}
                    handleLogout = {handleLogout}
                    orders = {values.orders}
                />
            </div>
        )
    } else {
        return <div></div>
    }
}

export default StudentContainer;
