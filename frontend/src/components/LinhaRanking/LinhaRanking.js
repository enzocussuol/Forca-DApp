import { React, useEffect } from 'react';

export default function LinhaRanking({usuario, index}) {
    useEffect(() => {
        const linha = document.querySelector(".linha" + index);

        if (index === 1) {
            linha.classList.add("table-success");
        } else if (index === 2) {
            linha.classList.add("table-primary");
        } else if (index === 3) {
            linha.classList.add("table-secondary");
        }
    });

    return(
        <>
            <tr className={"linha" + index}>
                <th scope="row">{index}</th>
                <td>{usuario.endereco}</td>
                <td>{usuario.saldo}</td>
            </tr>
        </>
    )
}