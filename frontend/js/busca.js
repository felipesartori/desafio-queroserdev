function Get(url) {
  let request = new XMLHttpRequest()
  request.open("GET", url, false)
  request.send()
  return request.responseText
}

function buscar() {
  if (document.getElementById("buttonPesquisa").innerHTML === 'Limpar') {
    document.getElementById("sendmsg").value = '';
    searchProduct('')
    document.getElementById("buttonPesquisa").innerHTML = 'Enviar';    
  } else {
    searchProduct(document.getElementById("sendmsg").value)
  }
}

function searchProduct(value) {
  // recupera elementos
  let registros = document.getElementById("lista");
  let busca = value

  // remover os elementos da lista
  while (registros.firstChild) {
    registros.removeChild(lista.firstChild);
  };

  // obtem os registros do banco através do endpoint productssearch
  let data = Get(`http://localhost:3080/api/productssearch?search=${busca}`);
  let produtos = JSON.parse(data);

  // se não retornar produtos, mostrar uma mensagem que não encontrou
  if (produtos.length === 0) {
    let lista = document.getElementById("lista");
    lista.className = 'cartao cadastro'
    let linha1 = document.createElement('p');
    const withoutProduct = document.createTextNode(`Não foram encontrados registros correspondentes a busca!`)
    linha1.appendChild(withoutProduct);
    lista.appendChild(linha1);
  } else { // caso tenha encontrado, cria os elementos em tela
    produtos.forEach(element => {
      let linha = criarLinhas(element);
      registros.appendChild(linha);
    });
  }

  document.getElementById("buttonPesquisa").innerHTML = 'Limpar';
}
