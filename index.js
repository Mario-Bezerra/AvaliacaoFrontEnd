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
            if(produto.estoque >= 1){
                if(carrinhoDeCompras.length == 0){
                    carrinhoDeCompras.push({produto, quantidade : 1})
                    produto.estoque -= 1
                }
                else{
                    carrinhoDeCompras.forEach(produtoCarrinho => {
                        if(produtoCarrinho.produto.id == produtoID)
                        {
                            produtoCarrinho.quantidade += 1;
                            produto.estoque -=1;
                            
                        } else
                        {
                            carrinhoDeCompras.push({produto, quantidade : 1})
                            produto.estoque -= 1
                        }
                    })
                }
              }}
    })
    console.log(carrinhoDeCompras)
    localStorage.setItem('carrinho', carrinhoDeCompras)
}

/* function removerDoCarrinho(produtoID){
    produtos.forEach(produto => { 
        if(produto.id == produtoID) { 
            produto.estoque +=1 
            if (carrinhoDeCompras.some(produtoCarrinho => produtoCarrinho.id == produtoID)){
                if(produtoCarrinho.quantidade > 1){
                    produtoCarrinho.quantidade -= 1;
                } else {
                    carrinhoDeCompras = produtos.filter(produto => produto.id != produtoID)
                }
            }
        }
    }
} */