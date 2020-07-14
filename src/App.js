import React from 'react';
import './App.scss';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      selectedEmployee: {
        id: "",
        employee_name: "",
        employee_salary: "",
        employee_age: 0,
        profile_image: ""
      },
      title: 'Cadastrar Empregado',
      isEdit: false,
      nome: "",
      salario: 0,
      idade: 0,
      imagem: "",
      btnDisabled: false
    }
  }

  getEmployee = () => {
    axios.get(`http://rest-api-employees.jmborges.site/api/v1/employees`)
      .then(res => {
        var response = res.data.data
        this.setState({ employees: response });
      })
  }

  saveEmployee = (employee) => {
    axios.post('http://rest-api-employees.jmborges.site/api/v1/create', employee).then(() => {
      this.setState({
        nome: "",
        salario: 0,
        idade: 0,
        imagem: ""
      })
      this.getEmployee()
      this.setState({btnDisabled: false})
    });
  }

  editEmployee = (id, employee) => {
    axios.put('http://rest-api-employees.jmborges.site/api/v1/update/' + id, employee).then(() => {
      this.setState({
        nome: "",
        salario: 0,
        idade: 0,
        imagem: ""
      })
      this.getEmployee()
      this.setState({
        btnDisabled: false,
        title: "Cadastrar Empregado"})
    });
  }

  deleteEmployee = (id) => {
    axios.delete('http://rest-api-employees.jmborges.site/api/v1/delete/' + id)
      .then(() => {
        this.getEmployee();
      })
  }

  componentDidMount() {
    this.getEmployee();
  }

  onSubmit = () => {
    this.setState({btnDisabled: true})
    const employee = {
      name: this.state.nome,
      age: this.state.idade,
      salary: this.state.salario,
      profile_image: this.state.imagem
    };

    if (this.state.isEdit)
      this.editEmployee(this.state.selectedEmployee.id, employee);
    else
      this.saveEmployee(employee);
  }

  onChangeNome = (event) => {
    this.setState({nome: event.target.value});
  }

  onChangeSalario = (event) => {
    this.setState({salario: event.target.value});
  }

  onChangeIdade = (event) => {
    this.setState({idade: event.target.value});
  }

  onChangeImagem = (event) => {
    this.setState({imagem: event.target.value});
  }

  onClickEdit = (employee) => {
    this.setState({
      id: employee.id,
      name: employee.employee_name,
      idade: employee.employee_age,
      salario: employee.employee_salary,
      imagem: employee.imagem,
      title: "Editar Empregado"
    })
  }

  render() {
    return (
      <div>
        <div class="col-md-6 formulario">
          <div class="card">
            <div class="card-header">
              <h2>{this.state.title}</h2>
              <div class="container">
                <div class="form-group">
                  <label for="inputNome">Nome</label>
                  <input type="text" class="form-control" id="inputNome" value={this.state.nome} 
                  onChange={this.onChangeNome}/>
                </div>
                <div class="form-group">
                  <label for="inputSalário">Salário</label>
                  <input type="text" class="form-control" id="inputSalário"
                    placeholder="0,00" value={this.state.salario} onChange={this.onChangeSalario}/>
                </div>
                <div class="form-group">
                  <label for="inputIdade">Idade</label>
                  <input type="number" class="form-control" id="inputIdade" value={this.state.idade} 
                  onChange={this.onChangeIdade}/>
                </div>
                <div class="form-group">
                  <label for="inputAvatar">Avatar</label>
                  <input type="text" class="form-control" id="inputAvatar" value={this.state.imagem} 
                  onChange={this.onChangeImagem}/>
                </div>
                <button type="button" class="btn btn-primary" onClick={this.onSubmit}
                disabled={this.state.btnDisabled}>Salvar</button>
              </div>
            </div>
          </div>
        </div>
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
                      <button type="button" class="btn btn-danger" onClick={this.deleteEmployee(e.id)}>Excluir</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div >
    );
  }
}

export default App;
