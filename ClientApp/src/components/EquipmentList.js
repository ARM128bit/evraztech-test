import React, { Component } from 'react';
import { EquipmentForm } from './EquipmentForm';

export class EquipmentList extends Component {
    static displayName = EquipmentList.name;

  constructor(props) {
      super(props);
      this.state = { equipmentList: [], loading: true };

      this.onAddEquipment = this.onAddEquipment.bind(this);
      this.onRemoveEquipment = this.onRemoveEquipment.bind(this);

  }
    componentDidMount() {
        this.loadData();
    }

    // загрузка данных
    async loadData() {
        const response = await fetch(this.props.backendURL);
        const data = await response.json();
        this.setState({ equipmentList: data, loading: false });
    }
    
    // добавление объекта
    async onAddEquipment(_form) {
        if (_form) {
            const response = await fetch(this.props.backendURL, {
                method: 'POST', // или 'PUT'
                body: JSON.stringify(_form), // данные могут быть 'строкой' или {объектом}!
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const _code = await response.status;
            if (_code == 200) this.loadData();
        }
    }
    // удаление объекта
    onRemoveEquipment(item) {
        if (item) {
            var url = this.props.backendURL + "/" + item.id;

            var xhr = new XMLHttpRequest();
            xhr.open("delete", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send();
        }
    }
    /*static renderEquipmentTable(equipmentList) {
        return (
    );
  }*/

    render() {
        let listIsEmpty = (this.state.equipmentList.length || this.state.loading) ? "" : "Список ещё пуст"

        /*let contents = this.state.loading
          ? <p><em>Loading...</em></p>
            : EquipmentList.renderEquipmentTable(this.state.equipmentList);*/

        return (
            <div>
                <EquipmentForm onEquipmentSubmit={this.onAddEquipment} />
                <h1 id="tabelLabel" >Список оборудования</h1>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Модель</th>
                            <th>Наименование</th>
                            <th>Дата регистрации</th>
                            <th>Операции</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.equipmentList.map(item => <tr key={item.id}>
                            <td>{item.model}</td>
                            <td>{item.description}</td>
                            <td>{item.creationDate}</td>
                            <td><span className="action-link" onClick={() => { this.onRemoveEquipment(item) }}>Удалить</span></td>
                        </tr>
                        )}
                    </tbody>
                </table>
                {listIsEmpty}
          </div>
        );
  }
}
