import { PropTypes } from "prop-types";

import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import {ROUTE_NAMES} from "../../../../routes/routeNames";

const StudentView = ({last_name, name, second_name, email, phone, handleLogout, orders}) => {
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.info__top}>
                    <p className={styles.info__field}>{last_name}</p>
                    <p className={styles.info__field}>{name}</p>
                    <p className={styles.info__field}>{second_name}</p>
                    <Link to={ROUTE_NAMES.SEARCH} className={styles.find_button}>Find tutor</Link>
                </div>
                <div className={styles.info__bottom}>
                    <p className={styles.info__field}>{email}</p>
                    <p className={styles.info__field}>{phone}</p>
                    <button className={styles.logout_button} onClick={handleLogout}>Log out</button>
                </div>
            </div>
            <div className={styles.order}>
                {
                    orders.map((order) => {
                        return (
                            <div className={styles.order__card}>
                                <div className={styles.order__header}>
                                    <h6 className={styles.order__teacher}>{`${order.teacher.user.last_name} ${order.teacher.user.name}`}</h6>
                                    <h6 className={`${styles.order__status}
                                    ${order.status === "-1" ? styles.refuse : order.status === "0" ? styles.wait : styles.agree}`}>
                                        {order.status === "-1" ? "refuse" : order.status === "0" ? "wait" : "agree"}
                                    </h6>
                                </div>
                                <p className={styles.order__desc}>
                                    {order.description}
                                </p>
                                {order.status === "1" ? <h6 className={styles.order__phone}>+375293031545</h6> : <div></div>}
                                <p className={styles.order__price}>{`${order.price}$`}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

StudentView.propTypes = {
    email: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    second_name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
};

export default StudentView;
