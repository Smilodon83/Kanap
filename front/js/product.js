//Récuperation du lien
let str = window.location.href;

//Récupération de l'id dans l'url via searchParams
let url = new URL(str);
let id = url.searchParams.get("id");

//Récupération des infos du produit dans l'API
fetch("http://localhost:3000/api/products/" + id)
    .then(reponse => {
        return reponse.json();
    })

    //Utilisation du resultat pour afficher les infos produit et ajouter la fonction d'ajout au panier
    .then(resultat => {
        const product = resultat;
        displayProduct(product);
        addToCart(product);
    })

    .catch((error) => alert("Impossible de récuperer la requette sur l'API,verrifiez que le server soit bien lancé"));


//Déclaration de la fonction d'affichage du produit
function displayProduct(product) {


    //Titre de la page
    document.querySelector('title').textContent = `${product.name}`;

    //item_img
    let productImg = document.createElement("img");
    document.querySelector(".item__img").append(productImg);
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;

    //Modification de la balise h1
    document.getElementById('title').innerText = product.name;

    // Modification du prix
    document.getElementById('price').innerText = product.price + " ";

    //Modification de la description
    document.getElementById('description').innerText = product.description;

    //Ajout des options de couleur 
    for (let color of product.colors) {
        let productColor = document.createElement("option");
        document.querySelector('#colors').append(productColor);
        productColor.value = color;
        productColor.innerText = color;

    }
}


//Création de la fonction d'ajout au panier
function addToCart(product) {
    // Gestion du panier via le local storage
    let colorChoose = document.querySelector("#colors");
    let quantityChoose = document.querySelector("#quantity");
    const btnAddCart = document.querySelector("#addToCart");



    //Ecoute du click sur le bouton ajouter au panier
    btnAddCart.addEventListener("click", event => {
        if (quantityChoose.value > 0 && quantityChoose.value <= 100 && colorChoose.value !== '') {
            // Actions a mener si l'utilisateur a bien saisie une quantité et une couleur :
            // On creé un objet "article" à stocker 
            let article = {
                id: id,
                color: colorChoose.value,
                quantity: parseInt(quantityChoose.value),
                //  name : product.name,
                // image : products.imageUrl
            };
            // console.log("message quantité", typeof quantityChoose.value);
            // On crée la variable "basket" qui sera la clé a enregistrer dans le local storage
            let basket = JSON.parse(localStorage.getItem("basket"));
            //Si il y a deja des produit avec dans le local storage :
            if (basket != null) {
                let foundProduct = basket.find(basket => (basket.id === id && basket.color === colorChoose.value));
                console.log(foundProduct);
                if (basket != null && foundProduct !== undefined) {
                    let addQuantity = parseInt(article.quantity) + parseInt(foundProduct.quantity);
                    foundProduct.quantity = addQuantity;
                    console.log(addQuantity);
                    localStorage.setItem("basket", JSON.stringify(basket));
                } else {
                    basket.push(article);
                    localStorage.setItem("basket", JSON.stringify(basket));
                }

            }
            //S'il n'y a pas des  produit dans le local storage :
            else {
                basket = [];
                basket.push(article);
                localStorage.setItem("basket", JSON.stringify(basket));
                console.log(basket);
            }
            // On informe l'utilisateur de l'ajout

            alert(`Vous avez bien ajouté ${quantityChoose.value} ${product.name} ${colorChoose.value} à votre panier`);



        } else //Informer l'utilisateur de devoir rentrer une quantité entre 0 et 100 ainsi q'une couleur
            alert("Merci de bien vouloir selectioner une couleur ainsi q'une quantité comprise entre 1 et 100");
    });
}