function Get(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function criarLinhas(produtos) {
    console.log('produtos', produtos)

    const formCurrency = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    })

    let lista = document.createElement('li');
    lista.className = "cartao cadastro"

    let linha1 = document.createElement('p');
    const productName = document.createTextNode(`${produtos.productName} - ${produtos.productCategory}`)
    linha1.appendChild(productName);
    lista.appendChild(linha1);

    let linha2 = document.createElement('p');
    const productDescription = document.createTextNode(`${produtos.productDescription}`)
    linha2.appendChild(productDescription);
    lista.appendChild(linha2);

    let linha3 = document.createElement('p');
    const productPrice = document.createTextNode(`${formCurrency.format(produtos.price)}`)
    linha3.appendChild(productPrice);
    lista.appendChild(linha3);

    return lista;
}

function main() {
    let data = Get("http://localhost:3080/api/products");
    let produtos = JSON.parse(data);
    console.log('produtos', produtos.length)

    if (produtos.length === 0) {

        let lista = document.getElementById("lista");
        // let linha = document.createElement('li');
        // linha.className = "cartao cadastro"
        lista.className = 'cartao cadastro'

        let linha1 = document.createElement('p');
        const withoutProduct = document.createTextNode(`Não há produtos cadastrados`)
        linha1.appendChild(withoutProduct);
        lista.appendChild(linha1);

    } else {
        let lista = document.getElementById("lista");
        produtos.forEach(element => {
            let linha = criarLinhas(element);
            lista.appendChild(linha);
        });
    }
}

main()