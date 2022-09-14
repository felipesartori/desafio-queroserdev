
function Post(url, body) {
    let request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(body));
    return request;
}

function limparCampos() {
    document.getElementById('nome').value = ''
    document.getElementById('descricao').value = ''
    document.getElementById('preco').value = ''
    document.getElementById('categoria').value = ''
}

function registerProduct() {

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    event.preventDefault()
    let url = "http://localhost:3080/api/products"
    let nome = document.getElementById("nome").value
    let descricao = document.getElementById("descricao").value
    let preco = document.getElementById("preco").value
    let categoria = document.getElementById("categoria").value

    body = {
        "productName": nome,
        "productDescription": descricao,
        "price": preco,
        "productCategory": categoria
    }

    if (nome === "" || descricao === "" || preco === "" || categoria === "") {
        Toast.fire({
            icon: 'warning',
            title: 'Alguns campos não foram preenchidos!'
        });
    } else if (nome.length < 2) {
        Toast.fire({
            icon: 'warning',
            title: 'O nome do produto precisa ter no minimo 2 caracteres'
        });
    } else if (descricao.length < 10) {
        Toast.fire({
            icon: 'warning',
            title: 'A descrição do produto precisa ter no minimo 10 caracteres'
        });
    } else if (categoria.length < 4) {
        Toast.fire({
            icon: 'warning',
            title: 'A categoria do produto precisa ter no minimo 4 caracteres'
        });
    } else if (preco <= 0 || preco.length < 1) {
        Toast.fire({
            icon: 'warning',
            title: 'O preço do produto precisa ser maior que zero'
        });
    } else {
        retorno = Post(url, body)
        retorno.onload = function () {
            if (retorno.status === 201) {
                limparCampos();
                alert('O produto foi cadastrado!');
            }
            else {
                alert('Falha ao cadastrar o produto!');
            }
        }
    }
}    