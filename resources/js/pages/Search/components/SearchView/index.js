import { PropTypes } from "prop-types";

import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import {ROUTE_NAMES} from "../../../../routes/routeNames";

const SearchView = ({cities, subjects, choseCity, choseSubject, role, teachers, linkTeacher, add_city, add_subject}) => {
    return (
        <div className={styles.container}>
            {role === 2 ?
                <Link to={ROUTE_NAMES.STUDENT_ACCOUNT} className={styles.container__link}>My account</Link> : <div></div>}
            <div className={styles.content}>
                <div className={styles.group}>
                    <h6 className={styles.group__header}>Cities:</h6>
                    { cities.map((city) => {
                        return (<button onClick={() => choseCity(city.id)} className={add_city === city.id ? styles.group__item__add : styles.group__item} key={city.id} id={city.id}>{city.city_name}</button>)
                    })}
                </div>
                <div className={styles.teachers}>
                    { teachers.length === 0 ? <p className={styles.group__item}> No tutors found </p> :
                        teachers.map((teacher) => {
                            return (
                                <div className={styles.teacher} key={teacher.id} onClick={() => linkTeacher(teacher.id)}>
                                    <p className={styles.teacher__name}>{teacher.full_name}</p>
                                    <div className={styles.teacher__params}>
                                        <p className={styles.teacher__param}>{teacher.city}</p>
                                        <p className={styles.teacher__param}>{teacher.subject}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles.group}>
                    <h6 className={styles.group__header}>Cities:</h6>
                    { subjects.map((subject) => {
                        return (<button onClick={() => choseSubject(subject.id)} className={add_subject === subject.id ? styles.group__item__add : styles.group__item} key={subject.id} id={subject.id}>{subject.subject_name}</button>)
                    })}
                </div>
            </div>
        </div>
    );
}

export default SearchView;
