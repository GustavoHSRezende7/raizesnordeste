let carrinho = [];


function formatarMoeda(valor) {

    return valor
        .toFixed(2)
        .replace(".", ",");

}


function adicionarAoCarrinho(idProduto) {

    if (!window.unidadeAtual) {

        mostrarToast(
            "Escolha uma unidade antes de adicionar produtos.",
            "erro"
        );

        document
            .getElementById("unidades-secao")
            .scrollIntoView({
                behavior: "smooth"
            });

        return;
    }


    const produto = produtos.find(
        p => String(p.id) === String(idProduto)
    );


    if (!produto) {
        return;
    }


    const itemExistente = carrinho.find(
        item => String(item.id) === String(idProduto)
    );


    if (itemExistente) {

        itemExistente.quantidade++;

    } else {

        carrinho.push({

            id: produto.id,

            nome: produto.nome,

            preco: produto.preco,

            imagem: produto.imagem,

            quantidade: 1

        });

    }


    mostrarCarrinho();

    abrirCarrinho();

    mostrarToast(
        `${produto.nome} foi adicionado ao pedido.`,
        "sucesso"
    );

}


function mostrarCarrinho() {

    const lista = document.getElementById(
        "lista-carrinho"
    );

    const valorTotal = document.getElementById(
        "valor-total"
    );

    const totalPagamento = document.getElementById(
        "total-pagamento"
    );

    const quantidade = document.getElementById(
        "quantidade-carrinho"
    );


    lista.innerHTML = "";


    if (carrinho.length === 0) {

        lista.innerHTML = `
            <div class="carrinho-vazio">

                <span>🛒</span>

                <strong>
                    Seu carrinho está vazio
                </strong>

                <small>
                    Adicione alguns sabores para começar.
                </small>

            </div>
        `;

        valorTotal.textContent = "0,00";

        quantidade.textContent = "0";

        if (totalPagamento) {
            totalPagamento.textContent = "0,00";
        }

        return;
    }


    let total = 0;

    let totalItens = 0;


    carrinho.forEach(item => {

        const subtotal =
            item.preco * item.quantidade;


        total += subtotal;

        totalItens += item.quantidade;


        const elemento = document.createElement("div");

        elemento.className = "item-carrinho";


        elemento.innerHTML = `

            <img
                src="${item.imagem}"
                alt="${item.nome}">

            <div class="item-carrinho-info">

                <strong>
                    ${item.nome}
                </strong>

                <small>
                    R$ ${formatarMoeda(item.preco)}
                </small>

                <div class="controle-quantidade">

                    <button
                        type="button"
                        class="diminuir"
                        data-id="${item.id}">
                        −
                    </button>

                    <span>
                        ${item.quantidade}
                    </span>

                    <button
                        type="button"
                        class="aumentar"
                        data-id="${item.id}">
                        +
                    </button>

                </div>

            </div>


            <div class="item-carrinho-final">

                <strong>
                    R$ ${formatarMoeda(subtotal)}
                </strong>

                <button
                    type="button"
                    class="remover-item"
                    data-id="${item.id}">
                    Remover
                </button>

            </div>

        `;


        lista.appendChild(elemento);

    });


    valorTotal.textContent =
        formatarMoeda(total);


    quantidade.textContent =
        totalItens;


    if (totalPagamento) {

        totalPagamento.textContent =
            formatarMoeda(total);

    }


    configurarControlesCarrinho();

}


function configurarControlesCarrinho() {

    document
        .querySelectorAll(".aumentar")
        .forEach(botao => {

            botao.addEventListener(
                "click",
                function () {

                    const id = this.dataset.id;

                    const item =
                        carrinho.find(
                            item => String(item.id) === String(id)
                        );

                    if (item) {

                        item.quantidade++;

                        mostrarCarrinho();

                    }

                }
            );

        });


    document
        .querySelectorAll(".diminuir")
        .forEach(botao => {

            botao.addEventListener(
                "click",
                function () {

                    const id = this.dataset.id;

                    const item =
                        carrinho.find(
                            item => String(item.id) === String(id)
                        );


                    if (!item) {
                        return;
                    }


                    if (item.quantidade > 1) {

                        item.quantidade--;

                    } else {

                        carrinho =
                            carrinho.filter(
                                item => String(item.id) !== String(id)
                            );

                    }


                    mostrarCarrinho();

                }
            );

        });


    document
        .querySelectorAll(".remover-item")
        .forEach(botao => {

            botao.addEventListener(
                "click",
                function () {

                    const id = this.dataset.id;


                    carrinho =
                        carrinho.filter(
                            item => String(item.id) !== String(id)
                        );


                    mostrarCarrinho();

                    mostrarToast(
                        "Item removido do pedido.",
                        "sucesso"
                    );

                }
            );

        });

}


function abrirCarrinho() {

    document
        .getElementById("carrinho")
        .classList.add("aberto");


    document
        .getElementById("overlay-carrinho")
        .classList.add("ativo");


    document.body.classList.add(
        "carrinho-aberto"
    );

}


function fecharCarrinho() {

    document
        .getElementById("carrinho")
        .classList.remove("aberto");


    document
        .getElementById("overlay-carrinho")
        .classList.remove("ativo");


    document.body.classList.remove(
        "carrinho-aberto"
    );

}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        document
            .getElementById("abrir-carrinho")
            .addEventListener(
                "click",
                abrirCarrinho
            );


        document
            .getElementById("fechar-carrinho")
            .addEventListener(
                "click",
                fecharCarrinho
            );


        document
            .getElementById("overlay-carrinho")
            .addEventListener(
                "click",
                fecharCarrinho
            );


        document
            .getElementById("ir-checkout")
            .addEventListener(
                "click",
                function () {

                    if (carrinho.length === 0) {

                        mostrarToast(
                            "Adicione pelo menos um item ao carrinho.",
                            "erro"
                        );

                        return;
                    }


                    fecharCarrinho();


                    document
                        .getElementById(
                            "finalizar-pedido"
                        )
                        .scrollIntoView({
                            behavior: "smooth"
                        });

                }
            );


        mostrarCarrinho();

    }
);