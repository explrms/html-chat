import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class ChatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            isPrivate: false,
            error: ''
        };
    }

    validate() {
        this.setState({
            error: ''
        });
        if (this.state.title.length === 0) {
            this.setState({
                error: 'Введите название чата'
            });
            return false;
        }
        return true;
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.validate()) {
            this.props.handleSubmit({
                title: this.state.title,
                isPrivate: this.state.isPrivate
            });
            this.setState({ title: '', isPrivate: false });
        }
    }

    render() {
        const { title, isPrivate, error } = this.state;

        return (
            <>
                <div style={{ fontFamily: 'Roboto', color: '#283593' }}>
                    <h1>Создание / редактирование чата</h1>
                </div>
                <form className="chat-form" onSubmit={e => this.handleSubmit(e)}>
                    <div>{error && <span style={{ color: 'red' }}>{error}</span>}</div>
                    <div>
                        <TextField
                            id="standard-basic"
                            onChange={event => this.setState({ title: event.target.value })}
                            label="Название чата"
                            type="text"
                            name="chat-title"
                            value={title}
                        />
                    </div>
                    <div>
                        <label style={{ fontFamily: 'Roboto' }}>
                            Приватный:
                            <Checkbox
                                type="checkbox"
                                checked={isPrivate}
                                onChange={event =>
                                    this.setState({ isPrivate: event.target.checked })
                                }
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </label>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <Fab variant="extended" type="submit">
                            <AddIcon />
                            Создать
                        </Fab>
                    </div>
                </form>
            </>
        );
    }
}

ChatForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default ChatForm;
