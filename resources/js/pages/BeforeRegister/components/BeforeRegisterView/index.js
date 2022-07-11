import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import {ROUTE_NAMES} from "../../../../routes/routeNames";

const BeforeRegisterView = () => {
    return (
        <div className={styles.container}>
            <h3 className={styles.container__header}>Why are u here?</h3>
            <div className={styles.container__buttons}>
                <Link to={ROUTE_NAMES.STUDENT_REGISTER} className={styles.container__button}>I want to find a tutor</Link>
                <Link to={ROUTE_NAMES.TEACHER_REGISTER} className={styles.container__button}>I am a tutor</Link>
            </div>
        </div>
    );
};

export default BeforeRegisterView;
