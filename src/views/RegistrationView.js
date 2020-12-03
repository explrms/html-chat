import React from 'react';
import { Formik } from 'formik';
import apiService from '@/apiService';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Swal from 'sweetalert2/src/sweetalert2.js';

export default class RegistrationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
            error: null
        };
    }

    handleSubmit(values) {
        apiService.user
            .create(values)
            .then(() => {
                this.setState({ result: 'Пользователь успешно зарегистрирован' });
                setTimeout(() => this.props.history.push('/login'), 2000);
            })
            .catch(error => this.setState({ error: 'Ошибка: ' + error.response.data.error }));
    }

    render() {
        const { error, result } = this.state;

        return (
            <div>
                <div className="registration-view loginFields">
                    {error && (
                        <div className="error">
                            <span style={{ color: 'red', fontFamily: 'Roboto' }}>{error}</span>
                        </div>
                    )}
                    {result && (
                        <div className="result" style={{ fontFamily: 'Roboto' }}>
                            {result}
                        </div>
                    )}
                    <Formik
                        initialValues={{ nickname: '', password: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.nickname) {
                                errors.nickname = 'Введите никнейм';
                            }
                            if (!values.password) {
                                errors.password = 'Введите пароль';
                            }
                            if (values.password.length < 7) {
                                errors.password = 'Длина пароля должна быть больше 6 символов';
                            }
                            return errors;
                        }}
                        onSubmit={values => {
                            this.handleSubmit(values);
                        }}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                {errors.nickname && touched.nickname && (
                                    <div style={{ color: 'red', fontFamily: 'Roboto' }}>
                                        {errors.nickname}
                                    </div>
                                )}
                                <div>
                                    <TextField
                                        name="nickname"
                                        id="outlined-basic"
                                        label="Логин"
                                        variant="outlined"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                {errors.password && touched.password && (
                                    <div style={{ color: 'red', fontFamily: 'Roboto' }}>
                                        {errors.password}
                                    </div>
                                )}
                                <div style={{ marginTop: '10px' }}>
                                    <TextField
                                        name="password"
                                        id="outlined-basic"
                                        label="Пароль"
                                        variant="outlined"
                                        type="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                    <Fab color="primary" aria-label="add" type="submit">
                                        <ArrowForwardIcon />
                                    </Fab>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        );
    }
}
