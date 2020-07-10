import React from 'react';
import './App.scss';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      selectedEmployee : {
        id: "",
        employee_name: "",
        employee_salary: "",
        employee_age: 0,
        profile_image: ""
      }
    }
  }

  getEmployee() {
    axios.get(`http://rest-api-employees.jmborges.site/api/v1/employees`)
      .then(res => {
        var response = res.data.data
        this.setState({ employees: response });
      })
  }

  saveEmployee() {

  }

  editEmployee() {

  }

  deleteEmployee() {

  }

  componentDidMount() {
    this.getEmployee();
  }

  render() {
    console.log(this.state.employees);
    return (
      <div>
        <div class="col-md-12">

          <div class="container">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Salário</th>
                  <th scope="col">Idade</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {this.state.employees.map((e) =>
                  <tr>
                    <th scope="row">{e.id}</th>
                    <td>{e.employee_name}</td>
                    <td>{e.employee_salary}</td>
                    <td>{e.employee_age}</td>
                    <td><button type="button" class="btn btn-primary">Editar</button>
                      <button type="button" class="btn btn-danger">Excluir</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
