import React, { Component } from 'react';
import { UserForm } from './UserForm';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

import eventBus from "../EventBus";
import { undefinedNotification, definedMessages } from './sharedFunctions'

export class UserList extends Component {
    static displayName = UserList.name;

  constructor(props) {
      super(props);
      this.state = { userList: [], loading: true };

      this.onRemoveUser = this.onRemoveUser.bind(this);

  }
    componentDidMount() {
        this.loadData();
        eventBus.on("loadUserList", () =>
            this.loadData()
        );
    }

    // загрузка данных
    async loadData() {
        const response = await fetch(this.props.backendURL);
        const data = await response.json();
        this.setState({ userList: data, loading: false });
    }
    
    
    // удаление объекта
    onRemoveUser(item) {
        if (window.confirm(`Are you sure to remove user?`) && item) {
            var url = this.props.backendURL + "/" + item.id;

            var xhr = new XMLHttpRequest();
            xhr.open("delete", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 204) {
                    this.loadData();
                }
                if (xhr.responseText) {
                    try {
                        let _message = JSON.parse(xhr.responseText);

                        store.addNotification({
                            ...undefinedNotification,
                            ..._message,
                        });
                    } catch (e) {
                        store.addNotification({
                            ...undefinedNotification,
                            message: "Что-то пошло не так!",
                            title: "Ой-ёй!",
                            type: "danger",
                        });
                    }
                } else {
                    store.addNotification({
                        ...undefinedNotification,
                        ...definedMessages.userForm[xhr.status],

                    }); 
                }
            }.bind(this);
            xhr.send();
        }
    }


    render() {
        let listIsEmpty = (this.state.userList.length || this.state.loading) ? "" : "Список ещё пуст"

        return (
            <div>
                <UserForm backendURL={this.props.backendURL}/>
                <h1 id="tabelLabel" >Список пользователей</h1>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>ФИ</th>
                            <th>Операции</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.userList.map(item => <tr key={item.id}>
                            <td>{item.firstName} {item.lastName}</td>
                            <td><span className="action-link" onClick={() => { this.onRemoveUser(item) }}>Удалить</span></td>
                        </tr>
                        )}
                    </tbody>
                </table>
                {listIsEmpty}
          </div>
        );
  }
}
