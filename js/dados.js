const unidades = [
    {
        id: "recife",
        nome: "Recife - Centro",
        tipo: "Cozinha Completa",
        descricao: "Cardápio completo e retirada rápida.",
        horario: "10h às 22h"
    },

    {
        id: "olinda",
        nome: "Olinda",
        tipo: "Formato Reduzido",
        descricao: "Uma seleção especial dos nossos sabores.",
        horario: "11h às 21h"
    },

    {
        id: "caruaru",
        nome: "Caruaru",
        tipo: "Cozinha Completa",
        descricao: "Cardápio completo com pratos regionais.",
        horario: "10h às 22h"
    }
];


const produtos = [

    {
        id: 1,

        nome: "Tapioca Nordestina",

        descricao:
            "Tapioca dourada recheada com queijo coalho e manteiga de garrafa.",

        preco: 12.90,

        categoria: "Lanches",

        imagem:
            "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85",

        unidadesDisponiveis:
            ["recife", "olinda", "caruaru"]
    },


    {
        id: 2,

        nome: "Cuscuz Recheado",

        descricao:
            "Cuscuz de milho com carne de sol desfiada e queijo coalho.",

        preco: 16.90,

        categoria: "Lanches",

        imagem:
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",

        unidadesDisponiveis:
            ["recife", "caruaru"]
    },


    {
        id: 3,

        nome: "Bolo de Macaxeira",

        descricao:
            "Bolo artesanal macio de macaxeira com coco.",

        preco: 8.50,

        categoria: "Sobremesas",

        imagem:
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",

        unidadesDisponiveis:
            ["recife", "olinda", "caruaru"]
    },


    {
        id: 4,

        nome: "Café Regional",

        descricao:
            "Café arábica passado na hora e servido bem quente.",

        preco: 5.50,

        categoria: "Bebidas",

        imagem:
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85",

        unidadesDisponiveis:
            ["recife", "olinda", "caruaru"]
    },


    {
        id: 5,

        nome: "Suco de Caju",

        descricao:
            "Suco natural de caju, gelado e refrescante.",

        preco: 7.90,

        categoria: "Bebidas",

        imagem:
            "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=85",

        unidadesDisponiveis:
            ["recife", "caruaru"]
    },


    {
        id: 6,

        nome: "Baião de Dois",

        descricao:
            "Arroz, feijão-verde, queijo coalho e temperos regionais.",

        preco: 24.90,

        categoria: "Pratos",

        imagem:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",

        unidadesDisponiveis:
            ["recife", "caruaru"]
    },


    {
        id: 7,

        nome: "Carne de Sol com Macaxeira",

        descricao:
            "Carne de sol acompanhada de macaxeira cozida e queijo coalho.",

        preco: 28.90,

        categoria: "Pratos",

        imagem:
            "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85",

        unidadesDisponiveis:
            ["recife", "caruaru"]
    },


    {
        id: 8,

        nome: "Cartola Nordestina",

        descricao:
            "Banana, queijo coalho, canela e um toque especial de açúcar.",

        preco: 11.90,

        categoria: "Sobremesas",

        imagem:
            "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=85",

        unidadesDisponiveis:
            ["recife", "olinda", "caruaru"]
    }

];