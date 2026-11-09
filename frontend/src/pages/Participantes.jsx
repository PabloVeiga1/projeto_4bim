import "../styles/Participantes.css"

export default function Participantes() {
  return <main>
    <header>
        <div>
            <h1>Participantes</h1>
            <p>cadastro de participantes</p>
        </div>

        <button>Adicionar Participante +</button>
    </header>
    <div className="campo_pesquisa"><input type="text" placeholder="Pesquisar por..."/><button>Pesquisar</button></div>
    <div className="table-container">
        <table>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Nível</th>
                <th>Status</th>
            </tr>
             <tr>
                <td>Pablo</td>
                <td>17</td>
                <td>pvcv1@aluno.ifal.edu.br</td>
                <td>Adiministrador</td>
                <td>Ativo</td>
            </tr>
            <tr>
                <td>João</td>
                <td>18</td>
                <td>pvcv1@aluno.ifal.edu.br</td>
                <td>Adiministrador</td>
                <td>Ativo</td>
            </tr>
            <tr>
                <td>Maria</td>
                <td>17</td>
                <td>pvcv1@aluno.ifal.edu.br</td>
                <td>Adiministrador</td>
                <td>Ativo</td>
            </tr>
        </table>
    </div>
  </main>
}


