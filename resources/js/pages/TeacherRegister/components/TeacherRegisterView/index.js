import { PropTypes } from "prop-types";
import styles from "./styles.module.css";
import StartView from "../../../Start/components/StartView";

const TeacherRegisterView = ({error, last_name, name, second_name, phone, email, password, date_of_birth, file, city, subject, education, work_experience, description, price, handleChange, handleChangeFile, handleSubmit, cities, subjects}) => {
    return (
        <div>
            <form method="post" className={styles.container} onSubmit={handleSubmit}>
                <div className={styles.personal_data}>
                    <div className={styles.personal_data__content}>
                        <h1 className={styles.personal_data__header}>Personal data</h1>
                        <div className={styles.personal_data__line}></div>
                        <input
                            type="text"
                            placeholder="Last name"
                            className={styles.registration__input}
                            name="last_name"
                            value={last_name}
                            onChange={handleChange}
                        />
                        <input type="text" placeholder="Name" className={styles.registration__input} name="name"
                               value={name} onChange={handleChange}/>
                        <input
                            type="text"
                            placeholder="Second name"
                            className={styles.registration__input}
                            name="second_name"
                            value={second_name}
                            onChange={handleChange}
                        />
                        <input
                            type="tel"
                            placeholder="Phone number"
                            className={styles.registration__input}
                            name="phone"
                            value={phone}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            className={styles.registration__input}
                            name="email"
                            value={email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className={styles.registration__input}
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                        <label className={styles.sign_up__label} >Date of Birth</label>
                        <input type="date" className={styles.registration__input} name="date_of_birth"
                               value={date_of_birth}
                               onChange={handleChange}/>

                        <div className={styles.file_input}>
                            <input type="file" id="file" className={styles.file} name="file" onChange={handleChangeFile}/>
                            <label htmlFor="file">
                                Select file
                                <p className={styles.file_name}>{file}</p>
                            </label>
                        </div>
                        <h3 className={styles.error}>{error}</h3>
                    </div>
                </div>
                <div className={styles.sign_in}>
                    <div className={styles.sign_in__content}>
                        <h1 className={styles.sign_in__header}>Work info</h1>
                        <div className={styles.sign_in__line}></div>
                        <select id="city" name="city" className={styles.select} onChange={handleChange} value={city}>
                            {cities.map(({ id, city_name }) => {
                                return (<option value={id} key={id}>{city_name}</option>);
                            })}
                        </select>
                        <select id="subject" name="subject" className={styles.select} onChange={handleChange} value={subject}>
                            {subjects.map(({ id, subject_name }) => {
                                return (<option value={id} key={id}>{subject_name}</option>);
                            })}
                        </select>

                        <input
                            type="text"
                            placeholder="Education"
                            className={styles.registration__input}
                            name="education"
                            value={education}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Work experience"
                            className={styles.registration__input}
                            value={work_experience}
                            name={"work_experience"}
                            onChange={handleChange}
                        />
                        <textarea
                            className={styles.registration__textarea}
                            placeholder="description"
                            name="description"
                            value={description}
                            onChange={handleChange}
                        ></textarea>
                        <br/>
                        <label className={styles.sign_up__label}>Price (in dollars):</label>
                        <input type="number" className={styles.registration__input} name="price" value={price} onChange={handleChange}/>
                        <input type="submit" value="Sing up" className={styles.sign_up__button}/>
                    </div>
                </div>
            </form>
        </div>
    );
};

TeacherRegisterView.propTypes = {
    last_name: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    second_name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    date_of_birth: PropTypes.string.isRequired,
    file: PropTypes.string,
    cities: PropTypes.arrayOf(PropTypes.exact({
        id: PropTypes.number,
        city_name: PropTypes.string
    })).isRequired,
    city: PropTypes.string,
    subject: PropTypes.string,
    subjects: PropTypes.arrayOf(PropTypes.exact({
        id: PropTypes.number,
        subject_name: PropTypes.string
    })).isRequired,
    education: PropTypes.string.isRequired,
    work_experience: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChangeFile: PropTypes.func.isRequired,
    error: PropTypes.string
};

export default TeacherRegisterView;

