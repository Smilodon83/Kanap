 //fonctions de gestion du local storage :

    // Enregistrer le pnier dans le LS
    function saveBasket(basket) {
        localStorage.setItem("basket", JSON.stringify(basket));
        }
        // Récuperer le panier dans le LS
        function getBasket() {
        let basket = localStorage.getItem("basket");
        if (basket == null) {
            return [];
        }else{
            return JSON.parse(basket);
        }
        }
        //Ajouter un produit au panier
        function addBasket(product) {
        let basket = getBasket();
        let foundProduct = basket.find(p => p.id == product.id);
        if (foundProduct !== undefined){
            foundProduct.quantity++;
        } else {
            product.quantity = 1;
            basket.push(product);
        }
        
        saveBasket(basket);
        }

        // Retirer des produit du panier
    function removeFromBasket(product){
        let basket = getBasket();
        basket = basket.filter(p => p.id != product.id);
        saveBasket(basket);
        
    }     
    
        // Modifier les quantité
        function changeQuantity(product,quantity) {
            let basket = getBasket();
            let foundProduct = basket.find(p => p.id == product.id);
            if (foundProduct != undefined) {
                foundProduct.quantity += quantity;
                if(foundProduct.quantity <= 0) {
                    removeFromBasket(foundProduct);
                }else {
                    saveBasket(basket);
                }
            }
        }

        // Recuperer le nombre de produit du panier
        function getNumberProduct() {
            let basket = getBasket();
            let number = 0;
            for (let product of basket) {
                number += product.quantity;
            }
            return number;


            
        }

        