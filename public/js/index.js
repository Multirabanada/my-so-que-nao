// Verificar se o email foi preenchdo
const verificaCampoPreenchido = (evento)=>{
    if(evento.target.value == ''){
        evento.target.style.outline = "2px solid #993300";
        evento.target.setAttribute('placeholder',`Preencha o campo ${evento.target.name}!`)
    } else {
        evento.target.style.outline = "none";
        evento.target.setAttribute('placeholder','')
    }
}

const onFileChange = evento => {
    let img = document.getElementById('output');
    img.src = URL.createObjectURL(evento.target.files[0])
}


// 1 - Capturar os elementos do HTML para o JS
let inputNome = document.getElementById('nome');
let inputEmail = document.querySelector('#registro > form input[type=email]');
let inputSenha = document.querySelector('#registro > form input[type=password]');
let inputCofirmacao = document.querySelector('#registro > form input[type=password][name=confirmacao]');
let inputFile = document.querySelector('#registro > form input[type=file]');
let form = document.getElementById('formularioCadastro');

// 2 - Associar ao evento "perdeu o foco" uma função
// 3 - A função vai avisar ao usuário que o campo de
//     email foi deixado em branco
inputNome.addEventListener('blur', verificaCampoPreenchido);
inputEmail.addEventListener('blur', verificaCampoPreenchido);
inputSenha.addEventListener('blur', verificaCampoPreenchido);
inputCofirmacao.addEventListener('blur', verificaCampoPreenchido);
inputFile.addEventListener('change', onFileChange);
form.addEventListener(
    'submit',
    async (evt) =>{

        // Impedir o formulário de ser enviado...
        evt.preventDefault();

        // Levantando os dados do formulário
        let formData = new FormData(form);
        

        // Construindo um objeto com os dados do formulário
        // let corpoDaRequisicao = {
        //     nome: inputNome.value,
        //     email: inputEmail.value,
        //     senha: inputSenha.value
        // }

        // Enviando o formData para o servidor
        // Usando a funcao fetch
        let response = await fetch(
            'http://localhost:3000/api/v1/usuarios',
            {
                method:'POST',
                body: formData,
            }
        );
        if(response.status == 409){alert("Usuário já cadstrado")}
        if(response.status == 500){alert("Erro. Tente novamente mais tarde.")}
        if(response.status == 201){
            let usuario = await response.json();
            mostarApp(usuario);
        }
    }
);

function mostarApp(usuario){
    console.log(usuario)
    //Esconder a div de registro
    document.getElementById('registro').style.display = 'none';
    //Mostar a div de App
    document.getElementById('app').style.display = 'block';
    //Preencher os locais com as informacoes do usuario
    document.getElementById('app-nome').innerText = usuario.nome;
    let aEmail = document.getElementById('app-email');
    aEmail.innerText = usuario.email;
    aEmail.setAttribute('href',`mailto:${usuario.email}`);
    let imgAvatar = document.getElementById('app-avatar');
    imgAvatar.setAttribute('alt',`Foto de ${usuario.nome}`);
    imgAvatar.setAttribute('src',`img/avatares/${usuario.foto}`);
}























// Criando um array de amigos
let amigos = [
    {
        id: 1,
        nome: "Wendel Cutrim",
        email: "wendel@digitalhouse.com",
        foto: `img/face.jpg`
    },
    {
        id: 2,
        nome: "Sérgio Moura",
        email: "ssiqueira@digitalhouse.com",
        foto: `img/face.jpg`
    },
    {
        id: 3,
        nome: "Silvia Fiacador",
        email: "silvia@digitalhouse.com",
        foto: `img/face.jpg`
    }
]

// Localizar/carregar elementos do HTML aqui para o mundo JS
// Exemplo: Carregar elemento que mostra lista de amigos
let listaDeAmigos = document.getElementById("listaDeAmigos");

// 1 - Criar uma string com a estrutura html que exibe um usuário
let string = '';
for (let i = 0; i < amigos.length; i++) {
    const amigo = amigos[i];
    string += `
    <article onclick="alert('clicou em ${amigo.nome}')">
        <img src="${amigo.foto}" alt="Foto de ${amigo.nome}">
        <span>${amigo.nome}</span>
        <a href="mailto:${amigo.email}">${amigo.email}</a>
    </article>
    `
}

// 2 - Injetar essa string no elemento listaDeAmigos
listaDeAmigos.innerHTML += string;