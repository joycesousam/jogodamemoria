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
        faces[0].classList.toggle("flipped")
        faces[1].classList.toggle("flipped")
    
    }
}());