import React, { Component } from 'react';


export class EquipmentForm extends Component {

    static displayName = EquipmentForm.name;

    constructor(props) {
        super(props);
        this.state = {
            eqForm: {
                CreationDate: "", Model: "", Description: "", TypeID: ""
            }, equipmentTypeList: []};

        this.onSubmit = this.onSubmit.bind(this);
        this.onModelChange = this.onModelChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
    }
    onModelChange(e) {
        let _state = { ...this.state };
        _state.eqForm.Model = e.target.value;
        this.setState({ _state });
    }
    onDescriptionChange(e) {
        let _state = { ...this.state };
        _state.eqForm.Description = e.target.value;
        this.setState({ _state });
    }
    onTypeChange(e) {
        let _state = { ...this.state };
        _state.eqForm.TypeID = e.target.value
        /*_state.eqForm.Type = this.state.equipmentTypeList.find((et) => et.id === e.target.value)*/
        this.setState({ _state });
    }

    componentDidMount() {
        this.loadEquipmentTypeList();
    }
    // загрузка список типов оборудования
    async loadEquipmentTypeList() {
        const response = await fetch('/api/equipmenttype');
        const data = await response.json();
        this.setState({ equipmentTypeList: data });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onEquipmentSubmit(new FormData(e.target));
        this.setState({ eqForm: { CreationDate: "", Model: "", Description: "", TypeID: "" } });
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text"
                    name="Model"
                    placeholder="Модель"
                    value={this.state.eqForm.Model}
                    onChange={this.onModelChange}
                />
                <input type="text"
                    name="Description"
                    placeholder="Описание"
                    value={this.state.eqForm.Description}
                    onChange={this.onDescriptionChange} />
                <select name="TypeID" placeholder="Тип оборудования" onChange={this.onTypeChange}>
                    <option></option>
                    {this.state.equipmentTypeList.map(item => <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                    )}
                </select>
                <input type="submit" value="Сохранить" />
            </form>
        );
    }
}
