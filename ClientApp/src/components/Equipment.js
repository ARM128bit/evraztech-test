import React, { Component } from 'react';


class EquipmentForm extends Component {

    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { ID: "", CreationDate: "", Model: "", Description: "" };

        this.onSubmit = this.onSubmit.bind(this);
        this.onModelChange = this.onModelChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
    }
    onModelChange(e) {
        this.setState({ Model: e.target.value });
    }
    onDescriptionChange(e) {
        this.setState({ price: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        var phoneName = this.state.name.trim();
        var phonePrice = this.state.price;
        if (!phoneName || phonePrice <= 0) {
            return;
        }
        this.props.onPhoneSubmit({ name: phoneName, price: phonePrice });
        this.setState({ ID: "", CreationDate: "", Model: "", Description: "" });
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <p>
                    <input type="text"
                        placeholder="Модель"
                        value={this.state.Model}
                        onChange={this.onModelChange} />
                </p>
                <p>
                    <input type="number"
                        placeholder="Описание"
                        value={this.state.Description}
                        onChange={this.onDescriptionChange} />
                </p>
                <input type="submit" value="Сохранить" />
            </form>
        );
    }
}
