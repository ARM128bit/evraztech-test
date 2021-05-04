import React, { Component } from 'react';


export class EquipmentForm extends Component {

    static displayName = EquipmentForm.name;

    constructor(props) {
        super(props);
        this.state = {
            eqForm: {
                CreationDate: "", Model: "", Description: "", TypeID: "", UserID: ""
            }, equipmentTypeList: [], userList: [], userListIsLoading: true, equipmentTypeIsLoading: true};

        this.onSubmit = this.onSubmit.bind(this);
        this.onPropChange = this.onPropChange.bind(this);
    }
    onPropChange(e) {
        let _state = { ...this.state };
        _state.eqForm[e.target.name] = e.target.value;
        this.setState({ _state });
    }

    componentDidMount() {
        this.loadEquipmentTypeList();
        this.loadUserList();
    }
    // загрузка список типов оборудования
    async loadEquipmentTypeList() {
        const response = await fetch('/api/equipmenttype');
        const data = await response.json();
        this.setState({ equipmentTypeList: data, equipmentTypeIsLoading: false });
    }
    async loadUserList() {
        const response = await fetch('/api/user');
        const data = await response.json();
        this.setState({ userList: data, userListIsLoading: false });
    }
    formIsAccess() {
        return this.state.userList.length === 0 || this.state.equipmentTypeList.length === 0
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.onEquipmentSubmit(new FormData(e.target));
        this.setState({ eqForm: { CreationDate: "", Model: "", Description: "", TypeID: "", UserID: "" } });
    }
    render() {
        if (this.formIsAccess()) {
            return (<div>Перед добавлением нового оборудования заполните список пользователей и/или типов оборудования</div>);
        }
        else if (this.state.userListIsLoading || this.state.equipmentTypeIsLoading) {
            return (<div>Загружаются списки</div>);
        }
        else if (!this.state.userListIsLoading && !this.state.equipmentTypeIsLoading && !this.formIsAccess()) {
            return (
                <form onSubmit={this.onSubmit}>
                    <input type="text"
                        name="Model"
                        placeholder="Модель"
                        value={this.state.eqForm.Model}
                        onChange={this.onPropChange}
                    />
                    <input type="text"
                        name="Description"
                        placeholder="Описание"
                        value={this.state.eqForm.Description}
                        onChange={this.onPropChange} />
                    <select name="TypeID" placeholder="Тип оборудования" onChange={this.onPropChange}>
                        <option></option>
                        {this.state.equipmentTypeList.map(item => <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                        )}
                    </select>
                    <select name="UserID" placeholder="Пользователь" onChange={this.onPropChange}>
                        <option></option>
                        {this.state.userList.map(item => <option key={item.id} value={item.id}>
                            {item.firstName} {item.lastName}
                        </option>
                        )}
                    </select>
                    <input type="submit" value="Сохранить" />
                </form>
            );
        }
        
    }
}
