import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";


function App() {

  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title : "God of War 4",
      owner:  "Kratos & Atreus",
      techs:  "Leviathan Axe"
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    /**
     *  não preciso atribuir retorno nesse caso, só passar o id e depois setar
     *  o array de repos aqui sem o que eu removi.
     */
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(
      repository => repository.id != id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {/* aqui dentro eu tenho que loopar o array de repositorios */}
          {
          repositories.map(repository => {
            return (
                <li key={repository.id}>
                  {repository.title}
                <button onClick={() => handleRemoveRepository(`${repository.id}`)}>
                  Remover
                </button>
                </li>
            )
          })
          }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
