(function(){
	//array que armazenará os objetos com src e id de 1 a 8
	var imagens = [];
	
	//imagem a ser exibida em caso de acerto
	var combinacao = document.querySelector("#certo");
	
	//imagem de fim do jogo
    var modalfimdejogo = document.querySelector("#modalfimdejogo");
	//var reiniciar = document.querySelector("#reinic");
	//reiniciar.addEventListener("click",iniciar);
	
	//array que armazena as cartas viradas
	var cardsVirados = [];
	

	//variável contadora de acertos. ao chegar em 8 o jogo termina
	var acertos = 0;
	
	function jogarNovamente(){
        //joga a mensagem de fim do jogo para o plano da frente
		modalfimdejogo.style.zIndex = 10 ;
		//adiciona o evento click à imagem de game over
		modalfimdejogo.addEventListener("click",iniciar,false);
	}



	//estrutura de atribiução das imagens aos card
	for(var i = 0; i < 16; i++){
		//cria um objeto img com um src e um id
		var img = {
			src: "imgweb/" + i + ".png",
			id: i%8
		};
		
		//inserer o objeto criado no array
		imagens.push(img);
	}
	
	//chama a função de inicialização do jogo
	iniciar();
	
	//função de inicialização do jogo
	function iniciar(){
		//zera o array de cartas viradas
		cardsVirados = [];
		
		//zera o contador de acertos
		acertos = 0;
		
		//embaralhamento do array de imagens
		imagens = randomSort(imagens);
		
		//lista de elementos div com as classes back e front
		var backFaces = document.getElementsByClassName("back");
		var frontFaces = document.getElementsByClassName("front");
		
		//posicionamento das cartas e adição do evento click
		for(var i = 0; i < 16; i++){
			//limpa as cartas marcadas
			backFaces[i].classList.remove("match","flipped");
			frontFaces[i].classList.remove("match","flipped");
			
			//posiciona as cartas no tabuleiro
			var card = document.querySelector("#card" + i);
			card.style.left = (i % 8) === 0 ? 5 + "px" : 5 + ((i % 8) * 165) + "px";
			card.style.top = i/8 >= 1 ? 250 + "px" : 5 + "px";
			
			//adiciona às cartas o evento click chamando a função que vira as cartas
			card.addEventListener("click",virar,false);
			
			//adiciona as imagens às cartas
			frontFaces[i].style.background = "url('" + imagens[i].src + "')";
			frontFaces[i].setAttribute("id",imagens[i].id);
		}
		
		//joga a imagem de game over para o plano de fundo
		modalfimdejogo.style.zIndex = "-2";
		
		//remove o evento click da imagem de game over
		modalfimdejogo.removeEventListener("click",iniciar,false);
			
	}//fim da função de inicialização do jogo
	
	
	//função que vira as cartas
	function virar(){
		//verifica se o número de cartas viradas é menor que 2
		if(cardsVirados.length < 2){
			//pega as faces da carta clicada
			var faces = this.getElementsByClassName("face");
			
			//confere se a carta já está virada, impedindo que a mesma carta seja virada duas vezes
			if(faces[0].classList[2]){
				return;
			}
			
			//adiciona a classe fliped às faces da carta para que sejam viradas
			faces[0].classList.toggle("flipped");
			faces[1].classList.toggle("flipped");
			
			//adiciona a carta clicada ao array de cartas viradas
			cardsVirados.push(this);
			
			//verifica se o número de cartas no array de cartas viradas é igual a 2
			if(cardsVirados.length === 2){
				//compara o id das cartas viradas para ver se houve um acerto
				if(cardsVirados[0].childNodes[3].id === cardsVirados[1].childNodes[3].id){
					//em caso de acerto adiciona a classe match a todas as faces das duas 
					//cartas presentes no array de cartas viradas
					cardsVirados[0].childNodes[1].classList.toggle("match");
					cardsVirados[0].childNodes[3].classList.toggle("match");
					cardsVirados[1].childNodes[1].classList.toggle("match");
					cardsVirados[1].childNodes[3].classList.toggle("match");
					
					//chama a função que exibe a mensagem MATCH
					combinacaoCerta();
					
					//limpa o array de cartas viradas
					cardsVirados = [];
					
					//soma um ao contador de acertos
					acertos++;
					
					//verifica se o contador de acertos chegou a 8
					if(acertos >= 8){
						//caso haja 8 acertos, chama a função que finaliza o jogo
						jogarNovamente();
					}
				} 
			} 
		} else {
			//em caso haver duas cartas no array de cartas viradas (terceiro click) remove a classe flipped das cartas no array de cartas viradas
			cardsVirados[0].childNodes[1].classList.toggle("flipped");
			cardsVirados[0].childNodes[3].classList.toggle("flipped");
			cardsVirados[1].childNodes[1].classList.toggle("flipped");
			cardsVirados[1].childNodes[3].classList.toggle("flipped");
			
			//limpa o array de cartas viradas
			cardsVirados = [];
		}
	}
	
	
	//função que embaralha as cartas recebendo um array de cartas por parâmetro
	function randomSort(array){
		//cria um array vazio
		var newArray = [];
		
		//executa a estrutura enquanto o novo array não atingir o mesmo número de elementos do arrau passado por parâmetro
		while(newArray.length !== array.length){
			//cria uma variável i recebendo um número aleatório entre 0 e o número de elementos no array -1
			var i = Math.floor(Math.random()*array.length);
			
			//verifica se o elemento indicado pelo índice i já existe no array novo
			if(newArray.indexOf(array[i]) < 0){
				//caso não exista é inserido
				newArray.push(array[i]);
			}
		}
		
		//retorna o array novo, que possui os elementos do array passado por parâmetro embaralhados
		return newArray;
	}//fim da função que embaralha as cartas
	
	
	//função que gera o sinal de MATCH
	function combinacaoCerta(){
		//joga a mensagem de MATCH para o primeiro plano
		combinacao.style.zIndex = "1";
		
		//deixa a mensagem transparente
		combinacao.style.opacity = "0";
		
		//move a mensagem para cima
		combinacao.style.top = "150px";
		
		//função executada após 1.5 segundo
		setTimeout(function(){
			//joga a mensagem de MATCH para o plano de fundo
			combinacao.style.zIndex = "-1";
			
			//remove a transparência da mansagem
			combinacao.style.opacity = "1";
			
			//move a mensagem para o centro da tela
			combinacao.style.top = "250px";
		},1500);
	}//fim da função que exibe mensagem de MATCH
	


}());
