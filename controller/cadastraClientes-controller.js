import { clienteService } from "../service/cliente-service.js";

(async () => {
    const formulario = document.querySelector('[data-form]');
    formulario.addEventListener('submit', async (evento) => {
        evento.preventDefault();
    
        const nomeCliente = evento.target.querySelector('[data-nome]').value;
        const emailCliente = evento.target.querySelector('[data-email]').value;
    
        try {
            await clienteService.criaCliente(nomeCliente, emailCliente);
            window.location.href = '../telas/cadastro_concluido.html';
        } catch (erro) {
            console.log(erro);
            window.location.href = '../telas/erro.html';
        }
    });
})();