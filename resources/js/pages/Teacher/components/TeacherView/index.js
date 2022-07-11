import { PropTypes } from "prop-types";

import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import {ROUTE_NAMES} from "../../../../routes/routeNames";

const TeacherView = ({isMyAccount,
                         last_name,
                         name,
                         second_name,
                         phone,
                         email,
                         age,
                         files,
                         city,
                         subject,
                         education,
                         work_experience,
                         description,
                         price,
                         role,
                         handleLogout,
                         order_desc,
                         order_price,
                         handleChange,
                         handleSubmit,
                         orders,
                         handleAgree,
                         handleRefuse
                     }) => {
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.info__top}>
                    <img src={files}
                         className={styles.info__img}/>
                    <p className={styles.info__field}>{last_name}</p>
                    <p className={styles.info__field}>{`${name} ${second_name}`}</p>
                    <p className={styles.info__field}>{`${price}$`}</p>
                </div>
                <div className={styles.info__bottom}>
                    <p className={styles.info__field}>{email??""}</p>
                    <p className={styles.info__field}>{phone??""}</p>
                    {
                        isMyAccount ? <button className={styles.logout_button} onClick={handleLogout}>Log out</button> : <></>
                    }
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.wrapper__content}>
                    <div className={styles.profile}>
                        <div className={styles.profile__option}>
                            <h6 className={styles.profile__header}>City</h6>
                            <p className={styles.profile__desc}>{city}</p>
                        </div>
                        <div className={styles.profile__option}>
                            <h6 className={styles.profile__header}>Subject</h6>
                            <p className={styles.profile__desc}>{subject}</p>
                        </div>
                        <div className={styles.profile__option}>
                            <h6 className={styles.profile__header}>Age</h6>
                            <p className={styles.profile__desc}>{`${age} years old`}</p>
                        </div>
                        <div className={styles.profile__option}>
                            <h6 className={styles.profile__header}>Education</h6>
                            <p className={styles.profile__desc}>{education}</p>
                        </div>
                        <div className={styles.profile__option}>
                            <h6 className={styles.profile__header}>Work Expirience</h6>
                            <p className={styles.profile__desc}>{work_experience}</p>
                        </div>
                        <div className={styles.profile__option}>
                            <h6 className={styles.profile__header}>Description</h6>
                            <p className={styles.profile__desc}>
                                {description}
                            </p>
                        </div>
                    </div>
                    <div className={styles.form}>
                        {role === 2 ?
                            <form onSubmit={handleSubmit}>
                            <h6 className={styles.form__header}>Apply for the tutor</h6>
                            <textarea
                            className={styles.form__textarea}
                            placeholder="description"
                            onChange={handleChange}
                            value={order_desc??""}
                            name="order_desc"
                            ></textarea>
                            <label className={styles.form__label}>Price($):</label>
                            <input className={styles.form__input} type="number" value={order_price??0} onChange={handleChange} name="order_price"/>
                            <input type="submit" value="Submit" className={styles.logout_button}/>
                            </form> : <></>
                        }
                    </div>
                </div>
                <div className={styles.order}>
                    {orders.map((order) => {
                        return (
                            <div className={styles.order__card} key={`${order.id}`}>
                                {order.status === "0" ?
                                    <div className={styles.order__buttons}>
                                        <button onClick={() => handleAgree(order.id)} className={styles.order__status} key={`${order.id}-a`}>Agree</button>
                                        <button onClick={() => handleRefuse(order.id)} className={styles.order__status} key={`${order.id}-r`}>Refuse</button>
                                    </div> : <div></div>}
                                <div className={styles.order__header}>
                                    <h6 className={styles.order__teacher}>{`${order.user.last_name} ${order.user.name}`}</h6>
                                    <h6 className={`${styles.order__status}
                                    ${order.status === "-1" ? styles.refuse : order.status === "0" ? styles.wait : styles.agree}`}>
                                        {order.status === "-1" ? "refuse" : order.status === "0" ? "wait" : "agree"}
                                    </h6>
                                </div>
                                <p className={styles.order__desc}>{order.description}</p>
                                <p className={styles.order__price}>{`${order.price}$`}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

TeacherView.propTypes = {
    email: PropTypes.string,
    last_name: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    second_name: PropTypes.string.isRequired,
    phone: PropTypes.string,
    handleLogout: PropTypes.func.isRequired,
};

export default TeacherView;
