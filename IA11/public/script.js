// 11 Crie um script que faça requisições para a API de clientes criada no exercício anterior. O script deve conter as seguintes funcionalidades:
document.addEventListener("DOMContentLoaded", () => {
    carregarClientes();

document.getElementById("clienteForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const telefoneInput = document.querySelector("input[name='telefone']");
    const telefone = telefoneInput.value;
    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/; // Formato correto: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX

    if (!telefoneRegex.test(telefone)) {
        alert("Telefone inválido! Use o formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.");
        return;
    }

    const formData = new FormData(e.target);

    try {
        const response = await fetch("http://localhost:8080/clientes", {
            method: "POST",
            body: formData
        });

        const result = await response.text();
        alert(result);

        e.target.reset(); // Limpa o formulário
        carregarClientes(); // Atualiza a lista de clientes
    } catch (error) {
        console.error("Erro ao cadastrar cliente:", error);
    }
});
});

async function carregarClientes() {
    try {
        const response = await fetch("http://localhost:8080/clientes");
        const clientes = await response.json();

        const tabela = document.getElementById("tabelaClientes");
        tabela.innerHTML = `
            <tr class="table-dark">
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Afinidade</th>
                <th>Imagem</th>
                <th>Ações</th>
            </tr>
        `;

        clientes.forEach(cliente => {
            const row = tabela.insertRow();
            row.innerHTML = `
                <td>${cliente.nome}</td>
                <td>${cliente.email}</td>
                <td>${cliente.telefone}</td>
                <td>${cliente.afinidade}</td>
                <td>
                    ${cliente.imagem ? `<img src="uploads/${cliente.imagem}" width="50" class="rounded">` : "Sem imagem"}
                </td>
                <td>
                    <button type="button" class="btn btn-danger btn-sm btn-excluir" data-id="${cliente.id}">
                        Excluir
                    </button>
                </td>
            `;
        });

        // Adicionar eventos aos botões de excluir
        document.querySelectorAll(".btn-excluir").forEach(botao => {
            botao.addEventListener("click", function() {
                const id = this.getAttribute("data-id");
                deletarCliente(id);
            });
        });

    } catch (error) {
        console.error("Erro ao carregar clientes:", error);
    }
}

async function deletarCliente(id) {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
        try {
            const response = await fetch(`http://localhost:8080/clientes/${id}`, {
                method: "DELETE"
            });

            const result = await response.text();
            alert(result);
            carregarClientes(); // Atualiza a lista após excluir
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
        }
    }
}

// Função para formatar o telefone no padrão (XX) XXXXX-XXXX
function formatarTelefone(input) {
    let numero = input.value.replace(/\D/g, ""); // Remove tudo que não for número

    if (numero.length >= 11) {
        input.value = `(${numero.slice(0, 2)}) ${numero.slice(2, 7)}-${numero.slice(7, 11)}`;
    } else if (numero.length >= 6) {
        input.value = `(${numero.slice(0, 2)}) ${numero.slice(2, 6)}-${numero.slice(6, 11)}`;
    } else if (numero.length >= 2) {
        input.value = `(${numero.slice(0, 2)}) ${numero.slice(2)}`;
    } else {
        input.value = numero;
    }
}

//