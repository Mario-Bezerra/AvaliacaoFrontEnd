var produtosProcurados = [] ;
var carrinhoDeCompras = [];

function search(nomeProcurado){
    produtosProcurados = [];
    produtos.forEach(produto => { 
        if(produto.nome.toLowerCase().indexOf(nomeProcurado.toLowerCase()) > -1){
            produtosProcurados.push(produto)
        }
    })
    displayUniversal(produtosProcurados)
}

function displayUniversal(arrayDeProdutos) {
    var txt = ''
    for (let i = 0; i < arrayDeProdutos.length; i++) {
        txt += `<div class="thumb-wrapper">          					
                    <div class="img-box">
                        <img src="${arrayDeProdutos[i].imagem}" class="img-responsive alt="Imagem quebrada">									
                    </div>
                    <div class="thumb-content">
                        <h4 class="mb-3">${arrayDeProdutos[i].nome}</h4>
                        <p class="item-price"><b> R$ ${arrayDeProdutos[i].preco} </b></p>
                        <button class="btn btn-dark" onclick="adicionarNoCarrinho(${arrayDeProdutos[i].id})"> Comprar </button>
                    </div>
                </div>	`
    }
    document.getElementsByClassName('content-main')[0].innerHTML = txt;
}

function adicionarNoCarrinho(produtoID){
    produtos.forEach(produto => { 
        if(produto.id == produtoID){
           carrinhoDeCompras.push(produto)
        }
    })
    localStorage.setItem('carrinho', carrinhoDeCompras)
}

function removerDoCarrinho(produtoID){
    carrinhoDeCompras = produtos.filter(produto => produto.id == produtoID)
    localStorage.setItem('carrinho', carrinhoDeCompras)
}