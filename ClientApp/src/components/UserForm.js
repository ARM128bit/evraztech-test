import React, { Component } from 'react';

import eventBus from "../EventBus";

export class UserForm extends Component {

    static displayName = UserForm.name;

    constructor(props) {
        super(props);
        this.state = { name: "" };

        this.onSubmit = this.onSubmit.bind(this);
        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
    }
    onFirstNameChange(e) {
        this.setState({ name: e.target.value });
    }
    onLastNameChange(e) {
        this.setState({ name: e.target.value });
    }

    async onSubmit(e) {
        e.preventDefault();
        await fetch(this.props.backendURL, {
            method: 'POST',
            body: new FormData(e.target)
        });

        eventBus.dispatch("loadUserList");

        this.setState({ name: "" });
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text"
                    name="FirstName"
                    placeholder="Имя"
                    value={this.state.name}
                    onChange={this.onFirstNameChange}
                />
                <input type="text"
                    name="LastName"
                    placeholder="Фамилия"
                    value={this.state.name}
                    onChange={this.onLastNameChange}
                />
                <input type="submit" value="Сохранить" />
            </form>
        );
    }
}
