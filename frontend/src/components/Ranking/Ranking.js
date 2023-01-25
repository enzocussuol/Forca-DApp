import { React, useState, useCallback, useEffect } from 'react';
import './Ranking.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import * as metamask from '../../utils/metamask';
import { Usuario } from '../../objects/Usuario';
import LinhaRanking from '../LinhaRanking/LinhaRanking';

export default function Ranking() {
    const [usuarios, setUsuarios] = useState([]);

    const atualizaRanking = useCallback(async () => {
        try {
            const listaUsuarios = [];
            const enderecosUsuarios = await metamask.contratoFabricaJogo.getUsuarios();

            for (let i = 0; i < enderecosUsuarios.length; i++) {
                const usuario = new Usuario(enderecosUsuarios[i]);
                await usuario.setSaldo();
                usuario.corrigeEndereco();

                listaUsuarios.push(usuario);
            }

            listaUsuarios.sort(function (u1, u2) {
                if (u1.saldo > u2.saldo) {
                    return -1;
                } else {
                    return 1;
                }
            });

            setUsuarios(listaUsuarios);
        } catch (e) {
            alert("Erro ao atualizar os usuários: " + e.message);
        }
    }, []);

    useEffect(() => {
        atualizaRanking();
    }, [atualizaRanking])

    return (
        <>
            <div className="row">
                <div className="caixaCabecalhoRanking">
                    <h2 className="txtRanking">Ranking</h2>
                    <div className="align-self-center">
                        <button type="button" className="btn btn-primary btnAtualizarRanking" onClick={atualizaRanking}><FontAwesomeIcon icon={faRotateRight} /></button>
                    </div>
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