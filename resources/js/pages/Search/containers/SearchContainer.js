import SearchView from "../components/SearchView";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {ROUTE_NAMES} from "../../../routes/routeNames";

const SearchContainer = () => {
    const [values, setValues] = useState({
        cities: [],
        subjects: [],
        teachers: [],
        city: "",
        subject: "",
        role: 0,
        isUploaded: false,
    });

    const navigate = useNavigate();

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };

    const getTeachers = (url) => {
        axios.get(url, config).then(response => {
            setValues((state) => {
                const copy = { ...state };
                copy['isUploaded'] = true;
                copy['teachers'] = response.data.teachers;
                return copy;
            });
        })
    }

    if(!values.isUploaded) {
        getTeachers(`http://tutor.test/api/teachers?`);
        axios.get('http://tutor.test/api/get-cities').then(response => {
            setValues((state) => {
                const copy = { ...state };
                copy['isUploaded'] = true;
                copy['cities'] = response.data;
                return copy;
            });
        })
        axios.get('http://tutor.test/api/get-subjects').then(response => {
            setValues((state) => {
                const copy = { ...state };
                copy['isUploaded'] = true;
                copy['subjects'] = response.data;
                return copy;
            });
        })
        axios.get(`http://tutor.test/api/role`, config).then(response => {
            setValues((state) => {
                let copy = {...state}
                copy['role'] = response.data;
                copy.isUploaded = true;
                return copy;
            });
        }).catch((error) => {})
    }

    const linkTeacher = (id) => {
        navigate(`${ROUTE_NAMES.TEACHER_ACCOUNT}/${id}`);
    }

    const choseCity = (id) => {
        setValues((state) => {
        const copy = { ...state };
        copy['city'] = id;

        const url = `http://tutor.test/api/teachers?` + (copy.city !== `` ? `city=` + copy.city : "") + (copy.subject !== `` ? `&subject=` + copy.subject : "");

        getTeachers(url);

        return copy;
        });
    }

    const choseSubject = (id) => {
        setValues((state) => {
            const copy = { ...state };
            copy['subject'] = id;

            let url = `http://tutor.test/api/teachers?` + (copy.city !== `` ? `city=` + copy.city : "") + (copy.subject !== `` ? `&subject=` + copy.subject : "");

            getTeachers(url);

            return copy;
        });
    }


    return (<SearchView cities={values.cities}
                        subjects={values.subjects}
                        role={values.role}
                        teachers={values.teachers}
                        linkTeacher={linkTeacher}
                        choseCity={choseCity}
                        choseSubject={choseSubject}
                        add_city={values.city}
                        add_subject={values.subject}
    />)
}

export default SearchContainer;

