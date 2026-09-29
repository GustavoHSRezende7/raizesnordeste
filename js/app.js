window.unidadeAtual = "";

let categoriaAtual = "Todos";


document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderizarUnidades();

        renderizarFiltros();

        configurarEventos();

        // Restaura automaticamente a unidade previamente salva
        const unidadeSalva = localStorage.getItem("unidadeSelecionada");
        if (unidadeSalva) {
            selecionarUnidade(unidadeSalva, false);
        }

    }
);



/* =========================
   TOAST
========================= */

function mostrarToast(mensagem, tipo = "sucesso") {

    const toast =
        document.getElementById("toast");


    toast.textContent = mensagem;

    toast.className =
        `toast ativo ${tipo}`;


    setTimeout(function () {

        toast.classList.remove("ativo");

    }, 3000);

}



/* =========================
   UNIDADES
========================= */

function renderizarUnidades() {

    const lista =
        document.getElementById(
            "lista-unidades"
        );


    lista.innerHTML = "";


    unidades.forEach(unidade => {

        const card =
            document.createElement("button");


        card.type = "button";

        card.className =
            "unidade-card";


        card.dataset.id =
            unidade.id;


        card.innerHTML = `

            <div class="unidade-card-topo">

                <span class="unidade-numero">
                    ${unidade.id === "recife"
                        ? "01"
                        : unidade.id === "olinda"
                            ? "02"
                            : "03"}
                </span>

                <span class="unidade-status">
                    ● Aberta
                </span>

            </div>


            <h3>
                ${unidade.nome}
            </h3>


            <p>
                ${unidade.descricao}
            </p>


            <div class="unidade-detalhes">

                <span>
                    🍽️ ${unidade.tipo}
                </span>

                <span>
                    🕐 ${unidade.horario}
                </span>

            </div>


            <div class="unidade-escolher">
                Escolher unidade →
            </div>

        `;


        card.addEventListener(
            "click",
            function () {

                selecionarUnidade(
                    unidade.id,
                    true
                );

            }
        );


        lista.appendChild(card);

    });

}



/* =========================
   SELEÇÃO DE UNIDADE
========================= */

function selecionarUnidade(id, rolarTela = true) {

    const unidade =
        unidades.find(
            unidade => unidade.id === id
        );


    if (!unidade) {
        return;
    }


    window.unidadeAtual = id;


    document
        .getElementById(
            "selecionar-unidade"
        )
        .value = id;


    localStorage.setItem(
        "unidadeSelecionada",
        id
    );


    document
        .querySelectorAll(
            ".unidade-card"
        )
        .forEach(card => {

            card.classList.toggle(
                "selecionada",
                card.dataset.id === id
            );

        });


    document
        .getElementById(
            "unidade-atual"
        )
        .textContent =
            unidade.nome;


    document
        .getElementById(
            "filtro-unidade-info"
        )
        .textContent =
            `Cardápio disponível em ${unidade.nome}.`;


    document
        .getElementById(
            "aviso-unidade"
        )
        .textContent =
            `✓ Unidade selecionada: ${unidade.nome}`;


    categoriaAtual = "Todos";


    renderizarFiltros();

    mostrarProdutos(id);


    mostrarToast(
        `${unidade.nome} selecionada.`,
        "sucesso"
    );


    if (rolarTela) {
        setTimeout(function () {

            document
                .getElementById(
                    "cardapio-secao"
                )
                .scrollIntoView({
                    behavior: "smooth"
                });

        }, 200);
    }

}



/* =========================
   FILTROS
========================= */

function renderizarFiltros() {

    const container =
        document.getElementById(
            "filtros-categoria"
        );


    const categorias = [
        "Todos",
        "Lanches",
        "Pratos",
        "Bebidas",
        "Sobremesas"
    ];


    container.innerHTML = "";


    categorias.forEach(categoria => {

        const botao =
            document.createElement("button");


        botao.type = "button";


        botao.textContent =
            categoria;


        botao.className =
            "filtro";


        if (
            categoria === categoriaAtual
        ) {

            botao.classList.add("ativo");

        }


        botao.addEventListener(
            "click",
            function () {

                categoriaAtual =
                    categoria;


                renderizarFiltros();


                if (
                    window.unidadeAtual
                ) {

                    mostrarProdutos(
                        window.unidadeAtual
                    );

                }

            }
        );


        container.appendChild(botao);

    });

}



/* =========================
   PRODUTOS
========================= */

function mostrarProdutos(unidadeId) {

    const lista =
        document.getElementById(
            "lista-produtos"
        );


    lista.innerHTML = "";


    let produtosDisponiveis =
        produtos.filter(
            produto =>
                produto.unidadesDisponiveis
                    .includes(unidadeId)
        );


    if (
        categoriaAtual !== "Todos"
    ) {

        produtosDisponiveis =
            produtosDisponiveis.filter(
                produto =>
                    produto.categoria ===
                    categoriaAtual
            );

    }


    if (
        produtosDisponiveis.length === 0
    ) {

        lista.innerHTML = `

            <div class="estado-vazio">

                <span>🍽️</span>

                <h3>
                    Nenhum item encontrado
                </h3>

                <p>
                    Não há produtos dessa categoria
                    disponíveis nesta unidade.
                </p>

            </div>

        `;

        return;
    }


    produtosDisponiveis.forEach(
        produto => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "produto";


            card.innerHTML = `

                <div class="produto-imagem">

                    <img
                        src="${produto.imagem}"
                        alt="${produto.nome}"
                        loading="lazy">

                    <span>
                        ${produto.categoria}
                    </span>

                </div>


                <div class="produto-conteudo">

                    <h3>
                        ${produto.nome}
                    </h3>

                    <p>
                        ${produto.descricao}
                    </p>


                    <div class="produto-final">

                        <strong>
                            R$
                            ${formatarMoeda(
                                produto.preco
                            )}
                        </strong>


                        <button
                            type="button"
                            class="botao-adicionar"
                            data-id="${produto.id}">

                            +

                        </button>

                    </div>

                </div>

            `;


            card
                .querySelector(
                    ".botao-adicionar"
                )
                .addEventListener(
                    "click",
                    function () {

                        adicionarAoCarrinho(
                            produto.id
                        );

                    }
                );


            lista.appendChild(card);

        }
    );

}



function configurarEventos() {

    document
        .getElementById(
            "ver-cardapio"
        )
        .addEventListener(
            "click",
            function () {

                document
                    .getElementById(
                        "unidades-secao"
                    )
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );



    document
        .getElementById(
            "continuar-pedido"
        )
        .addEventListener(
            "click",
            validarCheckout
        );



    document
        .getElementById(
            "confirmar-pagamento"
        )
        .addEventListener(
            "click",
            processarPagamento
        );

}



/* =========================
   CHECKOUT
========================= */

function validarCheckout() {

    const nome =
        document
            .getElementById(
                "nome-cliente"
            )
            .value.trim();


    const telefone =
        document
            .getElementById(
                "telefone-cliente"
            )
            .value.trim();


    const retirada =
        document.querySelector(
            'input[name="retirada"]:checked'
        );


    const lgpd =
        document
            .getElementById(
                "consentimento-lgpd"
            )
            .checked;



    if (!window.unidadeAtual) {

        mostrarToast(
            "Escolha uma unidade para continuar.",
            "erro"
        );

        document
            .getElementById(
                "unidades-secao"
            )
            .scrollIntoView({
                behavior: "smooth"
            });

        return;
    }



    if (carrinho.length === 0) {

        mostrarToast(
            "Seu carrinho está vazio.",
            "erro"
        );

        abrirCarrinho();

        return;
    }



    if (nome.length < 2) {

        mostrarToast(
            "Informe seu nome completo.",
            "erro"
        );

        document
            .getElementById(
                "nome-cliente"
            )
            .focus();

        return;
    }



    if (telefone.length < 8) {

        mostrarToast(
            "Informe um telefone válido.",
            "erro"
        );

        document
            .getElementById(
                "telefone-cliente"
            )
            .focus();

        return;
    }



    if (!retirada) {

        mostrarToast(
            "Escolha um canal de retirada.",
            "erro"
        );

        return;
    }



    if (!lgpd) {

        mostrarToast(
            "Aceite o termo de privacidade para continuar.",
            "erro"
        );

        return;
    }



    const pagamento =
        document.getElementById(
            "pagamento"
        );


    pagamento.hidden = false;


    pagamento.scrollIntoView({
        behavior: "smooth"
    });


    mostrarToast(
        "Dados validados. Escolha a forma de pagamento.",
        "sucesso"
    );

}



/* =========================
   PAGAMENTO
========================= */

function processarPagamento() {

    const pagamento =
        document.querySelector(
            'input[name="pagamento"]:checked'
        );


    if (!pagamento) {

        mostrarToast(
            "Escolha Pix ou Cartão.",
            "erro"
        );

        return;
    }



    const botao =
        document.getElementById(
            "confirmar-pagamento"
        );


    botao.disabled = true;

    botao.innerHTML =
        "Processando pagamento...";



    setTimeout(
        function () {

            finalizarPedido(
                pagamento.value
            );

        },
        1800
    );

}



/* =========================
   FINALIZAÇÃO
========================= */

function finalizarPedido(
    formaPagamento
) {

    const nome =
        document
            .getElementById(
                "nome-cliente"
            )
            .value.trim();


    const telefone =
        document
            .getElementById(
                "telefone-cliente"
            )
            .value.trim();


    const unidade =
        unidades.find(
            unidade =>
                unidade.id ===
                window.unidadeAtual
        );


    const retirada =
        document.querySelector(
            'input[name="retirada"]:checked'
        );


    const total =
        document.getElementById(
            "valor-total"
        ).textContent;


    const codigo =
        "RZ-" +
        Math.floor(
            1000 +
            Math.random() * 9000
        );


    const nomeRetirada =
        obterNomeRetirada(
            retirada.value
        );


    const nomePagamento =
        formaPagamento === "pix"
            ? "Pix"
            : "Cartão";



    document
        .getElementById(
            "numero-pedido"
        )
        .innerHTML = `
            <span>Pedido</span>
            <strong>${codigo}</strong>
        `;



    document
        .getElementById(
            "resumo-pedido"
        )
        .innerHTML = `

            <div class="resumo-linha">

                <span>Cliente</span>

                <strong>
                    ${nome}
                </strong>

            </div>


            <div class="resumo-linha">

                <span>Telefone</span>

                <strong>
                    ${telefone}
                </strong>

            </div>


            <div class="resumo-linha">

                <span>Unidade</span>

                <strong>
                    ${unidade.nome}
                </strong>

            </div>


            <div class="resumo-linha">

                <span>Retirada</span>

                <strong>
                    ${nomeRetirada}
                </strong>

            </div>


            <div class="resumo-linha">

                <span>Pagamento</span>

                <strong>
                    ${nomePagamento}
                </strong>

            </div>


            <div class="resumo-linha total">

                <span>Total</span>

                <strong>
                    R$ ${total}
                </strong>

            </div>

        `;



    document
        .getElementById(
            "pedido-confirmado"
        )
        .hidden = false;



    document
        .getElementById(
            "pagamento"
        )
        .hidden = true;



    carrinho = [];


    mostrarCarrinho();


    document
        .getElementById(
            "pedido-confirmado"
        )
        .scrollIntoView({
            behavior: "smooth"
        });



    const botao =
        document.getElementById(
            "confirmar-pagamento"
        );


    botao.disabled = false;

    botao.innerHTML =
        `
        Confirmar pagamento
        <span>✓</span>
        `;



    mostrarToast(
        "Pagamento aprovado! Pedido confirmado.",
        "sucesso"
    );

}



/* =========================
   RETIRADA
========================= */

function obterNomeRetirada(
    valor
) {

    const nomes = {

        balcao:
            "Atendimento no balcão",

        totem:
            "Totem de autoatendimento",

        app:
            "Aplicativo oficial"

    };


    return nomes[valor] ||
        "Não informado";

}