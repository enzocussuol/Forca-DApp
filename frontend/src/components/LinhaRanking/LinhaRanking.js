import { React } from 'react';

export default function LinhaRanking({usuario, index}) {
    return(
        <>
            <tr>
                <th scope="row">{index}</th>
                <td>{usuario.endereco}</td>
                <td>{usuario.saldo}</td>
            </tr>
        </>
    )
}