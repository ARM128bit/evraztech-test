import React, { Component } from 'react';
import { EquipmentTypeForm } from './EquipmentTypeForm';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

import { undefinedNotification, definedMessages } from './sharedFunctions'

export class EquipmentTypeList extends Component {
    static displayName = EquipmentTypeList.name;

  constructor(props) {
      super(props);
      this.state = { equipmentTypeList: [], loading: true };

      this.onAddEquipmentType = this.onAddEquipmentType.bind(this);
      this.onRemoveEquipmentType = this.onRemoveEquipmentType.bind(this);

  }
    componentDidMount() {
        this.loadData();
    }

    // загрузка данных
    async loadData() {
        const response = await fetch(this.props.backendURL);
        const data = await response.json();
        this.setState({ equipmentTypeList: data, loading: false });
    }
    
    // добавление объекта
    onAddEquipmentType(_form) {
        if (_form) {
            var xhr = new XMLHttpRequest();

            xhr.open("post", this.props.backendURL, true);
            xhr.onload = function () {
                if (xhr.status === 201) {
                    this.loadData();
                }

                store.addNotification({
                    ...undefinedNotification,
                    ...definedMessages.equipmentTypeForm[xhr.status],

                }); 
            }.bind(this);
            xhr.send(_form);
        }
    }
    // удаление объекта
    onRemoveEquipmentType(item) {
        if (window.confirm(`Are you sure to remove this equipment type?`) && item) {
            var url = this.props.backendURL + "/" + item.id;

            var xhr = new XMLHttpRequest();
            xhr.open("delete", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 204) {
                    this.loadData();
                }
                if (!!xhr.responseText) {
                    try {
                        let _resp = JSON.parse(xhr.responseText);
                        store.addNotification({
                            ...undefinedNotification,
                            ..._resp,
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

                    console.log(!!xhr.responseText);
                    store.addNotification({
                        ...undefinedNotification,
                        ...definedMessages.equipmentTypeForm[xhr.status],

                    });
                }
            }.bind(this);
            xhr.send();
        }
    }


    render() {
        let listIsEmpty = (this.state.equipmentTypeList.length || this.state.loading) ? "" : "Список ещё пуст"

        return (
            <div>
                <EquipmentTypeForm onEquipmentTypeSubmit={this.onAddEquipmentType} />
                <h1 id="tabelLabel" >Список типов оборудования</h1>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Наименование</th>
                            <th>Операции</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.equipmentTypeList.map(item => <tr key={item.id}>
                            <td>{item.name}</td>
                            <td><span className="action-link" onClick={() => { this.onRemoveEquipmentType(item) }}>Удалить</span></td>
                        </tr>
                        )}
                    </tbody>
                </table>
                {listIsEmpty}
          </div>
        );
  }
}
