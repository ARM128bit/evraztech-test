import React, { Component } from 'react';

import eventBus from "../EventBus";

export class UserForm extends Component {

    static displayName = UserForm.name;

    constructor(props) {
        super(props);
        this.state = { FirstName: "", LastName: "" };

        this.onSubmit = this.onSubmit.bind(this);
        this.onPropChange = this.onPropChange.bind(this);
    }
    onPropChange(e) {
        let _state = { ...this.state };
        _state[e.target.name] = e.target.value;
        this.setState({ _state });
    }

    async onSubmit(e) {
        e.preventDefault();
        await fetch(this.props.backendURL, {
            method: 'POST',
            body: new FormData(e.target)
        });

        eventBus.dispatch("loadUserList");

        this.setState({ FirstName: "", LastName: "" });
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text"
                    name="FirstName"
                    placeholder="Имя"
                    value={this.state.name}
                    onChange={this.onPropChange}
                />
                <input type="text"
                    name="LastName"
                    placeholder="Фамилия"
                    value={this.state.name}
                    onChange={this.onPropChange}
                />
                <input type="submit" value="Сохранить" />
            </form>
        );
    }
}
