import { React } from 'react';
import './Ranking.css'
import LinhaRanking from '../LinhaRanking/LinhaRanking';

export default function Ranking({ usuarios }) {
    return (
        <>
            <div className="row">
                <div className="caixaCabecalhoRanking">
                    <h2 className="txtRanking">Ranking</h2>
                </div>
                <div className="overflow-auto tabelaRanking">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Usuário</th>
                                <th scope="col">FCs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario, index) => {
                                return <LinhaRanking usuario={usuario} index={index + 1} key={usuario.endereco} />
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}