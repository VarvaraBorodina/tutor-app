import { PropTypes } from "prop-types";
import styles from "./styles.module.css";

const StudentRegisterView = ({error, last_name, name, second_name, phone, email, password, handleChange, handleSubmit}) => {
    return (
        <div>
            <form method="post" className={styles.container} onSubmit={handleSubmit}>
                <div className={styles.personal_data}>
                    <div className={styles.personal_data__content}>
                        <h1 className={styles.personal_data__header}>Personal data</h1>
                        <div className={styles.personal_data__line}></div>
                        <input
                            name="last_name"
                            value={last_name}
                            type="text"
                            placeholder="Last name"
                            className={styles.registration__input}
                            onChange={handleChange}
                        />
                        <input type="text"
                               name="name"
                               value={name}
                               placeholder="Name"
                               className={styles.registration__input}
                               onChange={handleChange}/>
                        <input
                            type="text"
                            name="second_name"
                            value={second_name}
                            placeholder="Second name"
                            className={styles.registration__input}
                            onChange={handleChange}
                        />
                        <input
                            type="tel"
                            name="phone"
                            value={phone}
                            placeholder="Phone number"
                            className={styles.registration__input}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className={styles.sign_in}>
                    <div className={styles.sign_in__content}>
                        <h1 className={styles.sign_in__header}>Register info</h1>
                        <div className={styles.sign_in__line}></div>
                        <input
                            name="email"
                            value={email}
                            type="text"
                            placeholder="Email"
                            className={styles.registration__input}
                            onChange={handleChange}
                        />
                        <input
                            name="password"
                            value={password}
                            type="password"
                            placeholder="Password"
                            className={styles.registration__input}
                            onChange={handleChange}
                        />
                        <input type="submit" value="Sing up" className={styles.sign_in__button}/>
                        <h3 className={styles.error}>{error}</h3>
                    </div>
                </div>
            </form>
        </div>
    );
};

StudentRegisterView.propTypes = {
    last_name: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    second_name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
};

export default StudentRegisterView;

