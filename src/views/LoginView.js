import React from 'react';
import apiService from '@/apiService';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export default class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            password: '',
            result: null,
            error: null
        };
    }

    handleSubmit(e) {
        this.setState({
            result: null,
            error: null
        });
        apiService.auth
            .login({
                nickname: this.state.nickname,
                password: this.state.password
            })
            .then(() => {
                this.setState({ result: 'Вход выполнен... Подождите.' });
                setTimeout(() => this.redirectAfterLogin(), 2000);
            })
            .catch(error => this.setState({ error: 'Ошибка: ' + error.response.data.error }));
        e.preventDefault();
    }

    redirectAfterLogin() {
        const redirectUrl = this.props.location.state
            ? this.props.location.state.from.pathname
            : '/profile';
        this.props.updateAuthHandler().then(() => this.props.history.push(redirectUrl));
    }

    render() {
        const { error, result } = this.state;

        return (
            <div>
                <div className="login-view loginFields">
                    <div style={{ fontFamily: 'Roboto', color: '#f44336' }}>{error}</div>
                    {result && (
                        <div className="result" style={{ fontFamily: 'Roboto', color: '#4CAF50' }}>
                            {result}
                        </div>
                    )}
                    <form onSubmit={e => this.handleSubmit(e)}>
                        <div style={{ marginTop: '10px' }}>
                            <TextField
                                name="nickname"
                                id="outlined-basic"
                                label="Логин"
                                variant="outlined"
                                type="text"
                                onChange={e => this.setState({ nickname: e.target.value })}
                                value={this.state.nickname}
                            />
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <TextField
                                name="password"
                                id="outlined-basic"
                                label="Пароль"
                                variant="outlined"
                                type="password"
                                onChange={e => this.setState({ password: e.target.value })}
                                value={this.state.password}
                            />
                        </div>
                        <div style={{ marginTop: '10px', textAlign: 'center' }}>
                            <Fab color="primary" aria-label="add" type="submit">
                                <ArrowForwardIcon />
                            </Fab>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
