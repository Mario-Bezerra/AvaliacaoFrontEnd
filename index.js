var produtosProcurados = [];
var carrinhoDeCompras = [];
var totalCompra = 0;

function search(nomeProcurado) {
    produtosProcurados = [];
    produtos.forEach(produto => {
        if (produto.nome.toLowerCase().indexOf(nomeProcurado.toLowerCase()) > -1) {
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

function adicionarNoCarrinho(produtoID) {
    if(JSON.parse(localStorage.getItem('carrinho')) == null){
        localStorage.setItem('carrinho', JSON.stringify(carrinhoDeCompras))
    }
    carrinhoDeCompras = JSON.parse(localStorage.getItem('carrinho'))
    produtos.forEach(produto => {
        if(produto.id === produtoID){
            if (produto.estoque >= 1) {
                if (carrinhoDeCompras.length == 0) {
                    carrinhoDeCompras.push({ produto , quantidade : 1})
                    produto.estoque -= 1
                }
                else {
                    if (acharPosicao(produtoID) > -1) {
                        var posicao = 0
                        posicao = acharPosicao(produtoID)
                        carrinhoDeCompras[posicao]["quantidade"] += 1
                    } else {
                        carrinhoDeCompras.push({ produto, quantidade: 1 })
                    }
                }
                produto.estoque -= 1
            }
        }
    })
    localStorage.setItem('carrinho', JSON.stringify(carrinhoDeCompras))
    displayCarrinho()
}

function removerDoCarrinho(produtoID) {
    carrinhoDeCompras = JSON.parse(localStorage.getItem('carrinho'))
    carrinhoDeCompras.forEach(produtoCarrinho => {
        if (produtoCarrinho.produto.id == produtoID) {
            if (produtoCarrinho.quantidade == 1) {
                carrinhoDeCompras.splice(acharPosicao(produtoID), 1)
            } else {
                produtoCarrinho["quantidade"] -= 1
            }
        }
    })
    produtos.forEach(produto => {
        if (produto.id == produtoID) {
            produto.estoque += 1
        }
    })

    localStorage.setItem('carrinho', JSON.stringify(carrinhoDeCompras))
    displayCarrinho()
}

function displayCarrinho() {
    totalCompra = 0
    let carrinhoAtual = JSON.parse(localStorage.getItem('carrinho'))
    console.log(carrinhoAtual)
    var txt = ''
    for (let i = 0; i < carrinhoAtual.length; i++) {
        let subtotal = (carrinhoAtual[i].quantidade * carrinhoAtual[i].produto.preco)
        txt += `<tr>
        <td>${carrinhoAtual[i].produto.id}</td>
        <td>${carrinhoAtual[i].produto.nome}</td>
        <td>${carrinhoAtual[i].produto.preco}</td>

        <td> <button class="btn btn-dark" onclick="removerDoCarrinho(${carrinhoAtual[i].produto.id})">  - </button></td>
        <td>${carrinhoAtual[i].quantidade}</td> 
        <td> <button id="aumentar" class="btn btn-dark" onclick="adicionarNoCarrinho(${carrinhoAtual[i].produto.id})">  + </button></td>
        <td>${subtotal}</td> 
        <td> <button onchange="verificarEstoque(${carrinhoAtual[i].produto.id})" class="btn btn-dark" onclick="apagarDoCarrinho(${carrinhoAtual[i].produto.id})"> Apagar</td>
        
    </tr>`
        totalCompra += subtotal
    }
    document.getElementById('insercaoProdutos').innerHTML = txt;
    document.getElementById('totalCarrinho').innerHTML = totalCompra;
}

function acharPosicao(produtoID) {
    var i = 0;
    for (i = 0; i < carrinhoDeCompras.length; i++) {
        console.log(carrinhoDeCompras[i].produto.id)
        if (carrinhoDeCompras[i].produto.id == produtoID) {
            return i;
        }
    }
    return -1;
}

function acharProdutoPorID(produtoID) {
    var i = 0;
    for (i = 0; i < produtos.length; i++) {
        if (produtos[i] == produtoID) {
            return produtos[i];
        }
    }
    return -1;
}

function apagarDoCarrinho(produtoID){
    carrinhoDeCompras = JSON.parse(localStorage.getItem('carrinho'))
    carrinhoDeCompras.splice(acharPosicao(produtoID), 1)
    localStorage.setItem('carrinho', JSON.stringify(carrinhoDeCompras))
    displayCarrinho()
}

function verificarEstoque(produtoID){
    let posicao = acharPosicao(produtoID);
    let produtoVerificado = acharProdutoPorID(produtoID)
    if(carrinhoDeCompras[posicao].quantidade > produtoVerificado.estoque){
        document.getElementById("aumentar").classList.add("disabled");
    }
}