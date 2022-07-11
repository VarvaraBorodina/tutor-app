import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import TeacherView from "../components/TeacherView";
import {ROUTE_NAMES} from "../../../routes/routeNames";
import {cloneDeep} from "lodash";

const TeacherContainer = () => {
    const [values, setValues] = useState({
        last_name: "",
        name: "",
        second_name: "",
        phone: "",
        email: "",
        age: "",
        img: "",
        city_name: "",
        subject_name: "",
        education: "",
        work_experience: "",
        description: "",
        price: "",
        orders: [],
        isUploaded: false,
        current_role: 0,
        order_desc: "",
        order_price: 0,
    });

    const {teacher_id} = useParams();

    let navigate = useNavigate();

    if(!values.isUploaded) {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        axios.get(`http://tutor.test/api/teacher/${teacher_id}`, config).then(response => {
            setValues((state) => {
                let copy = Object.assign({}, response.data.teacher);
                copy = Object.assign(copy, response.data.user);
                copy.isUploaded = true;
                copy.current_role = state.current_role;
                copy.orders = response.data.orders??[];
                return copy;
            });
        }).catch((error) => {
            navigate(ROUTE_NAMES.SEARCH);
        });

        axios.get(`http://tutor.test/api/role`, config).then(response => {
            setValues((state) => {
                let copy = {...state}
                copy['current_role'] = response.data;
                copy.isUploaded = true;
                return copy;
            });
        }).catch((error) => {})
    }

    const handleLogout = (event) => {
        event.preventDefault();
        axios.get('http://tutor.test/api/logout',  {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        }).then(response => {
            localStorage.removeItem('token');
            navigate(ROUTE_NAMES.START_PAGE);
        });
    }

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
        axios.post('http://tutor.test/api/send-order', {
            description: values.order_desc,
            price: values.order_price,
            teacher_user_id: teacher_id
            },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}).then(response => {
            setValues((state) => {
                const copy = { ...state };
                copy['order_price'] = 0;
                copy['order_desc'] = "";
                return copy;
            });
        })
        navigate(ROUTE_NAMES.SEARCH);
    }

    const handleRefuse = (id) => {
        axios.post('http://tutor.test/api/set-order-status', {
            id: id,
            status: "-1"
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}).then(response => {
            setValues((state)=>{
               const indexToChange = state.orders.findIndex((order)=>order.id===id);
               const copy = cloneDeep(state);
               copy.orders[indexToChange].status = '-1';
               return copy;
            })
        })
    }

    const handleAgree = (id) => {
        axios.post('http://tutor.test/api/set-order-status', {
            id: id,
            status: "1"
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}).then(response => {
            setValues((state)=>{
                const indexToChange = state.orders.findIndex((order)=>order.id===id);
                const copy = cloneDeep(state);
                copy.orders[indexToChange].status = '1';
                return copy;
            })
        })
    }

    if(values.isUploaded) {
        return (
            <div>
                <TeacherView
                    order_desc={values.order_desc}
                    order_price={values.order_price}
                    phone={values.phone}
                    email={values.email}
                    second_name={values.second_name}
                    name={values.name}
                    last_name={values.last_name}
                    price={values.price}
                    work_experience={values.work_experience}
                    education={values.education}
                    subject={values.subject_name}
                    city={values.city_name}
                    files={values.img}
                    age={values.age}
                    description={values.description}
                    role={values.current_role}
                    orders={values.orders}
                    handleLogout={handleLogout}
                    isMyAccount={values.phone}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleAgree={handleAgree}
                    handleRefuse={handleRefuse}
                />

            </div>
        )
    } else {
        return <div></div>
    }
}

export default TeacherContainer;
