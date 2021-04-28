import React, { Component } from 'react';


export class EquipmentForm extends Component {

    static displayName = EquipmentForm.name;

    constructor(props) {
        super(props);
        this.state = {
            eqForm: {
                ID: "", CreationDate: "", Model: "", Description: "", Type: {}
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
        _state.eqForm.Type = this.state.equipmentTypeList.find((et) => et.id === e.target.value)
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
        console.log(this.state.eqForm)
        let _description = this.state.eqForm.Description.trim();
        let _model = this.state.eqForm.Model.trim();
        if (!_description || !_model) {
            return;
        }
        this.props.onEquipmentSubmit(this.state.eqForm);
        this.setState({ eqForm: { ID: "", CreationDate: "", Model: "", Description: "", Type: {} } });
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
                <select name="Type" placeholder="Тип оборудования" onChange={this.onTypeChange}>
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
