import { clienteService } from '../service/cliente-service.js';

// Criando função para guardar o template que irá imprimir os dados na tela
const criaNovaLinha = (nome, email, id) => {
    const linhaNovoCliente = document.createElement("tr");
    const conteudo = `
        <td class="td" data-td>${nome}</td>
        <td>${email}</td>
        <td>
            <ul class="tabela__botoes-controle">
                <li><a href="../telas/edita_cliente.html?id=${id}"
                class="botao-simples botao-simples--editar">Editar</a></li>
                <li><button class="botao-simples botao-simples--excluir"
                type="button">Excluir</button></li>
            </ul>
        </td>
        `
    linhaNovoCliente.innerHTML = conteudo;
    linhaNovoCliente.dataset.id = id;
    return linhaNovoCliente;
};

const tabelaHtml = document.querySelector("[data-tabela]");

tabelaHtml.addEventListener('click', async (evento) => {
    let ehBotaoDeletar = evento.target.className ===
    'botao-simples botao-simples--excluir';
    if (ehBotaoDeletar) {
        try {
            const linhaCliente = evento.target.closest('[data-id]');
            let id = linhaCliente.dataset.id;
            await clienteService.removeCliente(id);
            linhaCliente.remove();
        } catch (erro) {
            console.log(erro);
            window.location.href = '../telas/erro.html';
        }
    }
});

const render = async () => {
// Percorre o elemento do Http Server e mostra na tela os valores
    try {
        const listaClientes = await clienteService.listaClientes();
        listaClientes.forEach(elemento => {
            tabelaHtml.appendChild(criaNovaLinha(elemento.nome, elemento.email, elemento.id))
        });
    } catch (erro) {
        console.log(erro);
        window.location.href = '../telas/erro.html';
    }
}

render();