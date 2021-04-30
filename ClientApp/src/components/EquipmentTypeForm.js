import React, { Component } from 'react';


export class EquipmentTypeForm extends Component {

    static displayName = EquipmentTypeForm.name;

    constructor(props) {
        super(props);
        this.state = { name: "" };

        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
    }
    onNameChange(e) {
        this.setState({ name: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onEquipmentTypeSubmit(new FormData(e.target));
        this.setState({ name: "" });
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text"
                    name="Name"
                    placeholder="Тип"
                    value={this.state.name}
                    onChange={this.onNameChange}
                />
                <input type="submit" value="Сохранить" />
            </form>
        );
    }
}
