import React from 'react';
import apiService from '@/apiService';
import ChatForm from '@/components/ChatForm';
import ChatList from '@/components/ChatList';
import PersonIcon from '@material-ui/icons/Person';
import TodayIcon from '@material-ui/icons/Today';

export default class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: []
        };
    }

    componentDidMount() {
        this.getChatList();
    }

    handleChatCreate(params) {
        apiService.chat.create(params).then(() => this.getChatList());
    }

    getChatList() {
        apiService.chat
            .getMyChats(this.props.user.id)
            .then(response => response.data)
            .then(chats => this.setState({ chats }));
    }

    goHandler(id) {
        this.props.history.push(`/chat/${id}`);
    }

    joinHandler(id) {
        if (!confirm('Вы действительно хотите вступить в этот чат?')) return;

        apiService.chat.join(id).then(() => this.getChatList());
    }

    deleteHandler(id) {
        if (!confirm('Вы действительно хотите удалить этот чат?')) return;

        apiService.chat.delete(id).then(() => this.getChatList());
    }

    render() {
        const { user } = this.props;
        return (
            <>
                <div>
                    <div
                        className="center"
                        style={{ fontFamily: 'Roboto', fontSize: '15px', width: '50%' }}
                    >
                        <PersonIcon />
                        Никнейм: {user.nickname}
                    </div>
                    <div
                        className="center"
                        style={{ fontFamily: 'Roboto', fontSize: '15px', width: '50%' }}
                    >
                        <TodayIcon />
                        Создан: {new Date(user.createdAt).toLocaleString()}
                    </div>
                </div>

                <div style={{ fontFamily: 'Roboto', color: '#283593' }}>
                    <h1>Мои чаты</h1>
                </div>
                <div style={{ fontFamily: 'Roboto', color: '#1976D2' }}>
                    <ChatList
                        userId={user.id}
                        list={this.state.chats}
                        goHandler={id => this.goHandler(id)}
                        joinHandler={id => this.joinHandler(id)}
                        deleteHandler={id => this.deleteHandler(id)}
                    />
                </div>
                <ChatForm handleSubmit={data => this.handleChatCreate(data)} />
            </>
        );
    }
}
