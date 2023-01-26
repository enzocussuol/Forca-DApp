import { React, useState, useEffect } from 'react';
import './App.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'
import * as metamask from '../../utils/metamask';
import Loading from '../Loading/Loading';
import ConexaoMetamask from '../ConexaoMetamask/ConexaoMetamask';
import CriacaoForca from '../CriacaoForca/CriacaoForca';
import ForcasDisponiveis from '../ForcasDisponiveis/ForcasDisponiveis';
import JogoAtivo from '../JogoAtivo/JogoAtivo';
import BoasVindas from '../BoasVindas/BoasVindas';
import Ranking from '../Ranking/Ranking';
import Regras from '../Regras/Regras';
import Saldo from '../Saldo/Saldo';
import { Forca } from '../../objects/Forca';
import { Usuario } from '../../objects/Usuario';

function App() {
	const [conectadoAoMetamask, setConectadoAoMetamask] = useState(null);
	const [saldo, setSaldo] = useState(0);
	const [forcas, setForcas] = useState([]);
	const [jogoAtivo, setJogoAtivo] = useState(null);
	const [usuarios, setUsuarios] = useState([]);

	useEffect(() => {
		const interval = setInterval(() => {
			async function verificaConexaoMetamask() {
				await metamask.verificaConexao().then((resposta) => {
					if (resposta !== conectadoAoMetamask) {
						setConectadoAoMetamask(resposta);
					}
				});
			}

			verificaConexaoMetamask();
		}, 2500);

		return () => clearInterval(interval);
	});

	useEffect(() => {
		if (conectadoAoMetamask !== null && conectadoAoMetamask) {
			async function inicializaSaldo() {
				try {
					metamask.conta.getAddress().then(async enderecoConta => {
						let s = await metamask.contratoFabricaJogo.balanceOf(enderecoConta);
						s = (Number(s) / (10 ** 18)).toFixed(8).replace(/\.?0+$/, "");
						setSaldo(s);
					});
				} catch (e) {
					alert("Erro ao inicializar o saldo: " + e.message);
				}
			}

			function escutaAtualizacaoSaldo() {
				metamask.contratoFabricaJogo.on("atualizacaoSaldo", function (endereco, novoSaldo) {
					metamask.conta.getAddress().then((enderecoConta) => {
						if (enderecoConta === endereco) {
							novoSaldo = (Number(novoSaldo) / (10 ** 18)).toFixed(8).replace(/\.?0+$/, "");
							setSaldo(novoSaldo);
						}
					})
				});
			}

			inicializaSaldo();
			escutaAtualizacaoSaldo();

			async function inicializaForcas() {
				try {
					await metamask.contratoFabricaJogo.getForcas().then((forcasBuscadas) => {
						let forcasCorrigidas = [];
						let forca;

						for (let i = 0; i < forcasBuscadas.length; i++) {
							forca = new Forca(forcasBuscadas[i].id,
								forcasBuscadas[i].tema, forcasBuscadas[i].palavraSecreta);
							forca.corrige(forcasBuscadas[i].dono, forcasBuscadas[i].status);

							forcasCorrigidas.push(forca);
						}

						setForcas(forcasCorrigidas);
					});
				} catch (e) {
					alert("Erro ao inicializar forcas: " + e.message);
				}
			}

			function escutaCriacaoForca() {
				metamask.contratoFabricaJogo.on("criacaoForca", function (novaForca) {
					setForcas(forcas => {
						/**
					 	 * Não adiciona nova forca se ela já existir na lista...
					 	 * Necessário pois aparentemente o último evento é recarregado ao dar F5 na página.
					 	 */
						for (let i = 0; i < forcas.length; i++) {
							if (novaForca.id === forcas[i].id) {
								return forcas;
							}
						}

						const forca = new Forca(novaForca.id, novaForca.tema, novaForca.palavraSecreta);
						forca.corrige(novaForca.dono, novaForca.status);

						const forcasCopia = [...forcas];
						forcasCopia.push(forca);

						return forcasCopia;
					});
				});
			}

			function escutaIniciacaoForca() {
				metamask.contratoFabricaJogo.on("iniciacaoForca", function (idForcaIniciada) {
					setForcas(forcas => {
						const forcasCopia = [...forcas];

						for (let i = 0; i < forcas.length; i++) {
							if (forcas[i].id === idForcaIniciada) {
								forcasCopia.splice(i, 1);
								break;
							}
						}

						return forcasCopia;
					});
				});
			}

			inicializaForcas();
			escutaCriacaoForca();
			escutaIniciacaoForca();

			async function atualizaRanking() {
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
						}
						
						if (u1.saldo < u2.saldo) {
							return 1;
						}

						return 0;
					});
		
					setUsuarios(listaUsuarios);
				} catch (e) {
					alert("Erro ao atualizar o ranking: " + e.message);
				}
			}

			function escutaAtualizacaoRanking() {
				metamask.contratoFabricaJogo.on("atualizacaoRanking", function() {
					atualizaRanking();
				});
			}

			atualizaRanking();
			escutaAtualizacaoRanking();
		}

		return () => {
			metamask.contratoFabricaJogo.removeAllListeners("atualizacaoSaldo");
			metamask.contratoFabricaJogo.removeAllListeners("criacaoForca");
			metamask.contratoFabricaJogo.removeAllListeners("iniciacaoForca");
			metamask.contratoFabricaJogo.removeAllListeners("atualizacaoRanking");
		}
	}, [conectadoAoMetamask]);

	return (
		<>
			<div className="container text-center principal">
				<div className="row">
					<div className="col">
						<h1 className="titulo">Forca D-App <FontAwesomeIcon icon={faSkullCrossbones} /></h1>
						{conectadoAoMetamask === null ? (
							<Loading />
						) : (
							!conectadoAoMetamask ? (
								<ConexaoMetamask setConectadoAoMetamask={setConectadoAoMetamask} />
							) : (
								<div className="container text-center">
									<BoasVindas setSaldo={setSaldo} />
									<div className="row">
										<div className="col">
											<Saldo saldo={saldo} setSaldo={setSaldo} />
											<CriacaoForca />
											<ForcasDisponiveis forcas={forcas} jogoAtivo={jogoAtivo} setJogoAtivo={setJogoAtivo} />
										</div>
										<div className="col align-self-center">
											<JogoAtivo forca={jogoAtivo} setForca={setJogoAtivo} />
										</div>
									</div>
									<Ranking usuarios={usuarios} />
									<Regras />
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default App;