//12
document.addEventListener("DOMContentLoaded", () => {
    carregarClientes();

    document.getElementById("clienteForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const clienteId = document.getElementById("clienteId").value; // Verifica se está editando
        const formData = new FormData(e.target);

        const url = clienteId ? `http://localhost:8080/clientes/${clienteId}` : "http://localhost:8080/clientes";
        const method = clienteId ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method: method,
                body: formData
            });

            const result = await response.text();
            alert(result);

            e.target.reset();
            document.getElementById("clienteId").value = ""; // Limpa ID
            carregarClientes();
        } catch (error) {
            console.error("Erro ao salvar cliente:", error);
        }
    });
});



///////////////////////////////////////////





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
                <td>${cliente.imagem ? `<img src="uploads/${cliente.imagem}" width="50" class="rounded">` : "Sem imagem"}</td>
                <td>
                    <button type="button" class="btn btn-warning btn-sm btn-editar" data-id="${cliente.id}">Editar</button>
                    <button type="button" class="btn btn-danger btn-sm btn-excluir" data-id="${cliente.id}">Excluir</button>
                </td>
            `;
        });

        // Adiciona evento ao botão de editar
        document.querySelectorAll(".btn-editar").forEach(botao => {
            botao.addEventListener("click", function () {
                const id = this.getAttribute("data-id");
                confirmarEdicao(id);
            });
        });

    } catch (error) {
        console.error("Erro ao carregar clientes:", error);
    }
}

function confirmarEdicao(id) {
    const confirmacao = confirm("Tem certeza que deseja editar este cliente?");
    if (confirmacao) {
        console.log(`O cliente com ID ${id} será editado.`);
    }
}

async function carregarClientePorId(id) {
    try {
        const response = await fetch(`http://localhost:8080/clientes/${id}`);
        const cliente = await response.json();

        if (cliente) {
            document.querySelector("#editarClienteForm input[name='id']").value = cliente.id;
            document.querySelector("#editarClienteForm input[name='nome']").value = cliente.nome;
            document.querySelector("#editarClienteForm input[name='email']").value = cliente.email;
            document.querySelector("#editarClienteForm input[name='telefone']").value = cliente.telefone;
            document.querySelector("#editarClienteForm input[name='afinidade']").value = cliente.afinidade;

            // Exibe o formulário de edição
            document.getElementById("editarClienteForm").style.display = "block";
        }
    } catch (error) {
        console.error("Erro ao carregar dados do cliente:", error);
    }
}


etTimeout(() => {
    document.querySelectorAll(".btn-editar").forEach(botao => {
        botao.addEventListener("click", function() {
            const id = this.getAttribute("data-id");
            confirmarEdicao(id);
        });
    });
}, 500);





function confirmarEdicao(id) {
    const confirmacao = confirm("Tem certeza que deseja editar este cliente?");
    if (confirmacao) {
        carregarClientePorId(id);
    }
}

// Ocultar o formulário de edição ao clicar no botão "Cancelar"
document.getElementById("cancelarEdicao").addEventListener("click", () => {
    document.getElementById("editarClienteForm").style.display = "none";
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
                    <button type="button" class="btn btn-primary btn-sm btn-editar" data-id="${cliente.id}">
                        Editar
                    </button>
                    <button type="button" class="btn btn-danger btn-sm btn-excluir" data-id="${cliente.id}">
                        Excluir
                    </button>
                </td>
            `;
        });

        // Adicionar eventos aos botões de editar
        document.querySelectorAll(".btn-editar").forEach(botao => {
            botao.addEventListener("click", function() {
                const id = this.getAttribute("data-id");
                confirmarEdicao(id);
            });
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




////////////////////////////////////////////////////

async function deletarCliente(id) {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
        try {
            const response = await fetch(`http://localhost:8080/clientes/${id}`, {
                method: "DELETE"
            });

            const result = await response.text();
            alert(result);
            carregarClientes();
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
        }
    }
}
