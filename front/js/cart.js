//Récuperation du local storage
let basket = JSON.parse(localStorage.getItem("basket"));
console.table(basket);
let total = 0 ;
//On boucle sur le tableau pour recuperer les informations de l'api et afficher chaque produits
for (let item of basket){
    let itemId = item.id;
    let itemColor = item.color;
    let itemQuantity = item.quantity;
//Récupération des informations à afficher via l'api
fetch(`http://localhost:3000/api/products/${itemId}`)
.then(function(reponse){
    return reponse.json();    
})
.then(function(resultatAPI){
const products = resultatAPI;
console.table(products);
console.log(products);

    
//Modification du DOM 
    //Balise article
    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute('data-id',itemId);
    productArticle.setAttribute('data-color',itemColor);
    
    //<div class"cart__item__img>
    let divImg = document.createElement("div");
    productArticle.appendChild(divImg);
    divImg.className = "cart__item__img";

    //<img>
    let productImg = document.createElement("img");
    divImg.appendChild(productImg);
    productImg.src = products.imageUrl;
    productImg.alt = products.altTxt;

    //<div class="cart__item__content">
    let divProductInfo = document.createElement("div");
    productArticle.append(divProductInfo);
    divProductInfo.className ="cart__item__content";

    //<div class="cart__item__content__description">
    let divProductDescription = document.createElement("div");
    divProductInfo.appendChild(divProductDescription);
    divProductDescription.className = "cart__item__content__description";

    //Balise <h2>
    let productName = document.createElement("h2");
    divProductDescription.append(productName);
    productName.innerText = products.name;

    //Pargraphe Couleur
    let productColor = document.createElement("p");
    divProductDescription.append(productColor);
    productColor.innerHTML ="Couleur : " + itemColor;

    //Paragraphe Prix
    let productPrice = document.createElement("p");
    divProductDescription.append(productPrice);
    productPrice.id = "unitPrice"
    productPrice.innerHTML ="Prix : " + products.price  + " €";
    let unitPrice = products.price;
    let totalUnit =+ unitPrice;
    total += products.price * itemQuantity ;
    


    //<div class="cart__item__content__settings">
    let divProductSettings = document.createElement("div");
    divProductInfo.appendChild(divProductSettings);
    divProductSettings.className = "cart__item__content__settings";

    // <div class="cart__item__content__settings__quantity">
    let divProductSettingsQuantity = document.createElement("div");
    divProductSettings.append(divProductSettingsQuantity);
    divProductSettingsQuantity.className =  "cart__item__content__settings__quantity";
    //Paragraphe quantité
    let productQuantity = document.createElement("p");
    divProductSettingsQuantity.append(productQuantity);
    productQuantity.innerHTML ="Quantité : ";

    //Balise input choix quantité
    let inputQuantity = document.createElement("input");
    divProductSettingsQuantity.append(inputQuantity);
    inputQuantity.type ="number";
    inputQuantity.className = "itemQuantity";
    inputQuantity.name = "itemQuantity";
    inputQuantity.min = 1;
    inputQuantity.max = 100;
    inputQuantity.value = itemQuantity;

    //Balise bouton delete
    let divDeletebtn = document.createElement("div");
    divProductSettings.append(divDeletebtn);
    divDeletebtn.className ="cart__item__content__settings__delete";
    let deleteBtn = document.createElement("p");
    divDeletebtn.append(deleteBtn);
    deleteBtn.className="deleteItem";
    deleteBtn.innerHTML="Supprimer";
 
         //Calcul du nombre total d'elements du panier
         let totalItem = document.querySelector("#totalQuantity");
         totalItem.innerHTML = getNumberProduct();
     
     
         //Calcul du prix total
         let totalItemPrice = document.querySelector("#totalPrice");
         totalItemPrice.innerHTML = total;


 
    
})

}

        

 
 


   
    

