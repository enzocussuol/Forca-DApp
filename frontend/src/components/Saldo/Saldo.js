import { React } from 'react'
import './Saldo.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from '@fortawesome/free-solid-svg-icons'

export default function Saldo({ saldo, setSaldo }) {
    return (
        <>
            <div className="caixaSaldo">
                <h2>Saldo: {saldo} FCs<span className="iconeForcaCoin"><FontAwesomeIcon icon={faCoins} /></span></h2>
            </div>
        </>
    )
}