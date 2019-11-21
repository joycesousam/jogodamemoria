(function(){
    
    /**array para armazenar os objetos com imagem e id 
     * da carta 1 a 8
     */
    var imagens = [];
    //imagem de acertos 
    var combinacao = document.querySelector("#match");
    //fim de jogo 
    var modal = document.querySelector("#fimdejogo");
    //array para armazenar as cartas viradas 
    var cartaInvertida = [];
    //variavel conta os acertos até o 8
    var acertos = 0;
    
    
    
    
    
    
    /** imagens para as cartas
     * objeto var e seus atributos(imagem e id )
     */
    for ( var i = 0; i < 16; i++ ){
        var img = {
            src:"imgweb/" + i +".png",
            id: i % 8
        };


        imagens.push(img);
         /** cada objeto gerado é inserido no array*/
    }


    /** chamar fução */ 
	startGame();
    


    /** função para iniciar jogo */ 
	function startGame () {
        //zera o array de cartas viradas 
        cartaInvertida = [];
        //zera o contador de acertos
        acertos = 0;
        //embaralhar as imagens do array
        imagens = randomSort(imagens);
      

        /** var -> armazenar referencia de todos os divs 
        que possui clace face */
        
        /** getelements -> trazer todos os elementos 
         * que possui a classe passada no parametro 
        */
        var backFaces = document.getElementsByClassName("back");
        var frontFaces = document.getElementsByClassName("front");
        
        
        /**distribuir e organizar as cartas */
        for(var i = 0; i < 16; i++){
            //limpa as cartas marcadas
            backFaces[i].classList.remove("match","flipped");
            frontFaces[i].classList.remove("match","flipped");
            //posiciona as cartas 
            var card = document.querySelector("#card" + i);
            card.style.left = (i % 8) === 0 ? 5 + "px" : 5 + ((i % 8) * 165) + "px";
            card.style.top = i/8 >= 1 ? 250 + "px" : 5 + "px";
            /** atribuir a cada carta um evento que vai
            disparar função que movimenta a carta*/
            card.addEventListener("click",virarCarta,false);


            /** pra cada div que ele capturou atribuir um backgroud (imagem) */
            backFaces[i].style.background = "url('"+imagens[i].src +"')";
            backFaces[i].setAttribute = ("id, imagens[i].id");
        
        }  
        //joga a imagem de gameover para o plano de fundo
        modal.style.zIndex = "-2";
        //remove o evento click da imagem game over
		modal.removeEventListener('click',function(){
            startGame();
        },false);
    }

   //funçao de virar cartas 
    //função que vira as cartas
	function virarCarta(){
		//verifica se o número de cartas viradas é menor que 2
		if(cartaInvertida.length < 2){
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
			cartaInvertida.push(this);
			
			//verifica se o número de cartas no array de cartas viradas é igual a 2
			if(cartaInvertida.length === 2){
				//compara o id das cartas viradas para ver se houve um acerto
				if(cartaInvertida[0].childNodes[3].id === cartaInvertida[1].childNodes[3].id){
					//em caso de acerto adiciona a classe match a todas as faces das duas cartas presentes no array de cartas viradas
					cartaInvertida[0].childNodes[1].classList.toggle("match");
					cartaInvertida[0].childNodes[3].classList.toggle("match");
					cartaInvertida[1].childNodes[1].classList.toggle("match");
					cartaInvertida[1].childNodes[3].classList.toggle("match");
					
					//chama a função que exibe a mensagem MATCH
					matchCardsSign();
					
					//limpa o array de cartas viradas
					cartaInvertida = [];
					
					//soma um ao contador de acertos
					acertos++;
					
					//verifica se o contador de acertos chegou a 8
					if(acertos >= 8){
						//caso haja 8 acertos, chama a função que finaliza o jogo
						fimdojogo();
					}
				} 
			} 
		} else {
			//em caso haver duas cartas no array de cartas viradas (terceiro click) remove a classe flipped das cartas no array de cartas viradas
			cartaInvertida[0].childNodes[1].classList.toggle("flipped");
			cartaInvertida[0].childNodes[3].classList.toggle("flipped");
			cartaInvertida[1].childNodes[1].classList.toggle("flipped");
			cartaInvertida[1].childNodes[3].classList.toggle("flipped");
			
			//limpa o array de cartas viradas
			cartaInvertida = [];
		}
	}




    /**Funçao embaralhar carta
     * recebendo um array de cartas por parâmetro
    */
    function randomSort(oldArray){

        /**criar array vazio, avaliar o numero de elementos do array
         * criar um indice  com valor aleatório
         * avaliar se o elemento indicado já existe no novo array
         * inserir o elemento indicado no novo array 
        */
       //array vazio 
        var newArray = [];
        /**executa o while até que o novo array tenha quantidade de elementos igual 
         * ao array passado no parametro
        */
        while(newArray.length !== oldArray.length){
            /**cria uma variável i recebendo um número 
            aleatório entre 0 e o número de elementos no array -1*/
            var i = Math.floor (Math.random()*oldArray.length);
            //verifica se o elemento indicado pelo índice i já existe no array novo
            if(newArray.indexOf(oldArray[i]) < 0 ){
                //caso não exista é inserido
                newArray.push(oldArray[i]);
            }
        }
        /**retorna o array novo, que possui os elementos 
        do array passado por parâmetro embaralhados */
        return newArray;
    }

    //função que gera o sinal de MATCH
	function matchCardsSign(){
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
    }

    function fimdojogo(){
		//joga a mensagem de fim do jogo para o plano da frente
		modal.style.zIndex = "99";
		
		//adiciona o evento click à imagem de game over
		modal.addEventListener('click',function(){
			//chama a função que reinicia o jogo
			startGame();
		},false);
    
    }
}());