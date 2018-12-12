

//BuyBrink
$(document).ready(function(){
	listaBrinquedosCarrinho();

	
    $(".btnAdiciona").click(function(){
        adicionaBrinquedoCarrinho($(this));
    });
	
	$("#formulario").submit(function(event){
        mensagem();
		event.preventDefault();
    });
	
	$("#Form").submit(function(event){
        alertar();
		event.preventDefault();
    });

	$("#imgCarrinho").click(function(){
		listaBrinquedosCarrinho();
	});
	
	$("#btnExcluirTodos").click(function(){
		esvaziarLista();
	})
	
	$(document).on("click", ".btnExcluir", function(){
		excluirBrinquedo($(this));
		
	})
	  
	   	
});

function mensagem(){
	alert("Sua mensagem foi enviada!");
	window.location.replace("contatos.html");
}
	
function alertar(){
	alert("Seu formulário foi enviado!");
	window.location.replace("trabalheconosco.html");
}

function adicionaBrinquedoCarrinho(elemento){
    
    // recuperando dados
    id = elemento.attr("id");
    nome = $("#nome" + id).text();
    valor = $("#valor" + id).text();
	descricao = $("#descricao" + id).text();
	quantidade = $("#quantidade" + id).val();
	
    
    //criando Brinquedo
    brinquedo = JSON.stringify(
        {
            "id": id,
            "Nome": nome,
            "Valor": valor,
			"Descricao": descricao,
			"Quantidade": quantidade
        }
    );

    //criando carrinho
    carrinho = [];

    if(window.localStorage.getItem("carrinho") != null){
        carrinho = JSON.parse(
            window.localStorage.getItem("carrinho")
        );
    }
    carrinho.push(brinquedo);

    //adicionado no Local Storage
    window.localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert("Brinquedo adicionado ao carrinho!");

}

function listaBrinquedosCarrinho(){
    
    if(window.localStorage.getItem("carrinho") == null){
        $("#listaProdutos").html(" ");
    }else{
        carrinho = JSON.parse(
            window.localStorage.getItem("carrinho")
        );
        itens = "";
        for(i=0; i<carrinho.length; i++){
            produto = JSON.parse(carrinho[i]);
            itens = itens + "<tr>" +
			"<td>" + produto.Nome + " </td> " +
			"<td>" + produto.Valor + " </td> " +
			"<td>" + produto.Descricao + " </td> " + 
			"<td>" +produto.Quantidade + " </td> " +
			"<td>" + '<img id="btnExcluir" class="menos btnExcluir" onclick="excluirBrinquedo(elemento)" src="img/lixeirinha.png" alt="Excluir" >' + "</td>"+ "</tr>";
        }

        $("#listaProdutos").html(itens);
    }

}

function esvaziarLista(){
	del = window.confirm("Tem certeza que deseja excluir Tudo?");
	
	if(del == false){
		return false;
	}
	localStorage.removeItem("carrinho");
	listaBrinquedosCarrinho();	
}

function excluirBrinquedo(elemento)  
{		

	del = window.confirm("Tem certeza que deseja excluir esse Brinquedo da Lista?");

	id = elemento.attr("id");
	
	
	//pegando a lista de brinquedos do localStorage
	listaBrinquedosCarrinho = JSON.parse(
		window.localStorage.getItem("carrinho")
	);

	//estrutura de repetição para buscar o indice do contato
	indice = 0;
	for(i=0; i<carrinho.length; i++){
		brinquedo = JSON.parse(carrinho[i]);
		if(itens == id){
			indice = i;
		}
	}

	//excluindo elemento da lista
	carrinho.splice(indice,1);

	//salvando a lista do localstorage
	window.localStorage.setItem("carrinho", JSON.stringify(carrinho));
	

	//atualizando a agenda
	window.location.replace("Carrinho.html");
	     
	
}

