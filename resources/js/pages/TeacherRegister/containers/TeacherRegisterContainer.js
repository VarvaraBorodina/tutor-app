import {useState, useEffect} from "react";
import TeacherRegisterView from "../components/TeacherRegisterView";
import {ROUTE_NAMES} from "../../../routes/routeNames";
import {useNavigate} from "react-router-dom";

const TeacherRegisterContainer = () => {
    const [values, setValues] = useState({
        last_name: "",
        name: "",
        second_name: "",
        phone: "",
        email: "",
        password: "",
        date_of_birth: "",
        files: "",
        city: "1",
        subject: "2",
        education: "",
        work_experience: "",
        description: "",
        price: "",
        isLoading: true,
        cities: [],
        subjects: [],
        error: ""
    });

    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://tutor.test/api/get-cities').then(response => {
            setValues((state) => {
                const copy = { ...state };
                copy['isLoading'] = false;
                copy['cities'] = response.data;
                return copy;
            });
        })
        axios.get('http://tutor.test/api/get-subjects').then(response => {
            setValues((state) => {
                const copy = { ...state };
                copy['isLoading'] = false;
                copy['subjects'] = response.data;
                return copy;
            });
        })
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((state) => {
            const copy = { ...state };
            copy[name] = value;
            return copy;
        });
    };

    const handleChangeFile = (event) => {
        const files = event.target.files[0];
        setValues((state) => {
            const copy = { ...state };
            copy['files'] = files;
            return copy;
        });
    }

    const handleSubmit = (event) => {
        const formData = new FormData();

        formData.append('img', values.files);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('name', values.name);
        formData.append('last_name', values.last_name);
        formData.append('second_name', values.second_name);
        formData.append('phone', values.phone);
        formData.append('role', 1);
        formData.append('city_id', values.city);
        formData.append('subject_id', values.subject);
        formData.append('date_of_birth', values.date_of_birth);
        formData.append('description', values.description);
        formData.append('education', values.education);
        formData.append('work_experience', values.work_experience);
        formData.append('price', Number(values.price));

        const config = {
            headers: {'content-type' : 'multipart/form-data'}
        }

        axios.post("http://tutor.test/api/register", formData, config).then(response => {
            localStorage.setItem('token', response.data.token);
            navigate(`${ROUTE_NAMES.TEACHER_ACCOUNT}/${response.data['teacher_id']}`);
            console.log(response);
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
        event.preventDefault();
    }

    if(!values.isLoading) {
        return (
            <div>
                <TeacherRegisterView
                    last_name={values.last_name}
                    name={values.name}
                    second_name={values.second_name}
                    phone={values.phone}
                    email={values.email}
                    password={values.password}
                    date_of_birth={values.date_of_birth}
                    file={values.files.name}
                    city={values.city}
                    subject={values.subject}
                    education={values.education}
                    work_experience={values.work_experience}
                    description={values.description}
                    price={values.price}
                    handleChange={handleChange}
                    handleChangeFile={handleChangeFile}
                    handleSubmit={handleSubmit}
                    cities={values.cities}
                    subjects={values.subjects}
                    error={values.error}
                />
            </div>
        )
    }
    else {
        return (<div></div>);
    }
}

export default TeacherRegisterContainer;
