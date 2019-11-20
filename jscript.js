(function(){
    
    /**array para armazenar varios elementos */
    var images = [];
   
    /**objeto e seus atributos*/
    for ( var i = 0; i < 16; i++ ){
        var img = {
            src:"imgweb/" + i +".png",
            id: i % 8
        };


        images.push(img);
         /** cada objeto gerado é armazenado no array*/
    }


    /** chamar fução */ 
	startGame();
    






    /** função para iniciar jogo */ 
	function startGame () {
        images = randomSort(images);
        /**aray imagens vai receber o resultado do processo
         * de embaralhamento da função passando o array como parametro 
        */

        /**chamar funçao responsavel por embaralhar carta */
        /** var -> armazenar referencia de todos os divs 
        que possui clace face */
        
        /** getelements -> trazer todos os elementos que possui a classe passada no parametro 
        */
        var backFaces = document.getElementsByClassName("back");
        
       
        for(var i = 0; i < 16; i++){

            /**distribuir e organizar as cartas */
            var card = document.querySelector("#card" + i);
            card.style.left = i % 8 === 0 ? 5 + "px" : i % 8 * 165 + 5 +"px";
            card.style.top = i < 8 ? 5 + "px" : 250 +"px";
            
            /** atribuir a cada carta um evento que vai
            disparar função que movimenta a carta*/
            card.addEventListener("click",flipCard,false);


            /** pra cada div que ele capturou atribuir um backgroud  */
            backFaces[i].style.background = "url("+images[i].src +")";
            backFaces[i].setAttribute = ("id, images[i].id");
        
        }  
    }

    /**Funçao embaralhar carta*/
    function randomSort(oldArray){
    /**funçao nativa que gera numeros aleatorios */
    /**floor arrendondar sempre para baixo*/
        //(Math.floor(Math.random()*11));
        //indentifica a posiçao de um elemento dentro do arrei e retorna o valor numero desse elemento
        //var arrTeste =["banana","morango","maca"];
        //console.log(arrTest.length);

        /**criar array vazio, avaliar o numero de elementos do array
         * criar um indice  com valor aleatório
         * avaliar se o elemento indicado já existe no novo array
         * inserir o elemento indicado no novo array 
        */
       
        var newArray = [];
        while(newArray.length !== oldArray.length){
            var i = Math.floor (Math.random()*oldArray.length);
            if(newArray.indexOf(oldArray[i]) < 0 ){
                newArray.push(oldArray[i]);
            }
        }

        return newArray;
    }
    function flipCard(){
        /**rotacionar as duas faces da carta */
        /** variavel faces recebe lista de elementos 
         * a card clicada é o que dispara o evento 
         * no caso esse evento
         */
        var faces = this.getElementsByClassName("face");
        /**console.log(faces);*/
        /**atribuir esses elementos a uma nova classe*/
        /**varrer em busca de determinada classe pra remover se encontrar ou inserir se não   */
        /**um é back e o outro é front 0e1 */
        faces[0].classList.toggle("flipped");
        faces[1].classList.toggle("flipped");

    
    }
}());