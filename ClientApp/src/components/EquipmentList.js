import React, { Component } from 'react';

export class Equipment extends Component {
    static displayName = Equipment.name;

  constructor(props) {
    super(props);
    this.state = { equipmentList: [], loading: true };
  }

  componentDidMount() {
    this.populateEquipmentData();
  }

    static renderEquipmentTable(equipmentList) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Дата регистрации</th>
            <th>Модель</th>
            <th>Наименование</th>
          </tr>
        </thead>
        <tbody>
                {equipmentList.map(item =>
                    <tr key={item.date}>
                        <td>{item.CreationDate}</td>
                        <td>{item.Model}</td>
                        <td>{item.Description}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
        : Equipment.renderEquipmentTable(this.state.equipmentList);

    return (
      <div>
        <h1 id="tabelLabel" >Список оборудования</h1>
        {contents}
      </div>
    );
  }

async populateEquipmentData() {
    const response = await fetch('equipment');
    const data = await response.json();
      this.setState({ equipmentList: data, loading: false });
  }
}
