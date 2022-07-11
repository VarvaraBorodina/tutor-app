import { PropTypes } from "prop-types";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import {ROUTE_NAMES} from "../../../../routes/routeNames";

const StartView = ({email, password, handleChange, handleSubmit, error}) => {
    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <div className={styles.search__content}>
                    <h1 className={styles.search__header}>Welcome to the Tutor</h1>
                    <div className={styles.search__line}></div>
                    <p className={styles.search__text}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis vero
                        et dolore aspernatur, quis rem quaerat, neque, debitis atque
                        molestias dolores. Provident magnam est deserunt assumenda
                        aspernatur, omnis aliquam quis.
                    </p>
                    <Link to={ROUTE_NAMES.BEFORE_REGISTER_PAGE} className={styles.search__link}>
                        Sign up
                    </Link>
                </div>
            </div>
            <div className={styles.sign_in}>
                <div className={styles.sign_in__content}>
                    <h1 className={styles.sign_in__header}>Log in</h1>
                    <div className={styles.sign_in__line}></div>
                    <form method="post" className={styles.sign_in__form} onSubmit={handleSubmit}>
                        <input type="email" placeholder="Email" className={styles.sign_in__input} value={email} name="email" onChange={handleChange}/>
                        <input
                            type="password"
                            placeholder="Password"
                            className={styles.sign_in__input}
                            value={password}
                            name="password"
                            onChange={handleChange}
                        />
                        <div className={styles.form_error}>
                            <input type="submit" value="Log in" className={styles.sign_in__button}/>
                            <p className={styles.error}>{error}</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

StartView.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    error: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default StartView;

/*
 */
