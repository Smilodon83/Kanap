//Récuperation du lien
let str = window.location.href;

//Récupération de l'id dans l'url via searchParams
let url = new URL(str);
let id = url.searchParams.get("id");
// console.log(id);

//Récupération des infos du produit dans l'API
fetch("http://localhost:3000/api/products/" + id)
    .then(reponse => {
        return reponse.json();
    })

    //Verrification dans la console du resultat obtenu sous forme de tableau
    .then(resultat => {
        const products = resultat;

        //Modification des elements de la page

        //Titre de la page

        document.querySelector('title').textContent = `${products.name}`;


        //item_img
        let productImg = document.createElement("img");
        document.querySelector(".item__img").append(productImg);
        productImg.src = products.imageUrl;
        productImg.alt = products.altTxt;

        //Modification de la balise h1
        document.getElementById('title').innerHTML = products.name;

        // Modification du prix
        document.getElementById('price').innerHTML = products.price + " ";

        //Modification de la description
        document.getElementById('description').innerHTML = products.description;

        //Ajout des options de couleur 
        for (let color of products.colors) {
            let productColor = document.createElement("option");
            document.querySelector('#colors').append(productColor);
            productColor.value = color;
            productColor.innerHTML = color;

        }


        // Gestion du panier via le local storage
        let colorChoose = document.querySelector("#colors");
        let quantityChoose = document.querySelector("#quantity");
        const btnAddCart = document.querySelector("#addToCart");
        let getStorage = JSON.parse(localStorage.getItem("products"));


        //Ecoute du click sur le bouton ajouter au panier
        btnAddCart.addEventListener("click", event => {
            if (quantityChoose.value > 0 && quantityChoose.value <= 100 && colorChoose.value !== '') {
                // Actions a mener si l'utilisateur a bien saisie une quantité et une couleur :
                    //Creation du produit a ajouter :
                    let articleToAdd = {
                        id : id,
                        quantity : quantityChoose.value,
                        color : colorChoose.value
                    }
                   
                    //Creation du tableau du local storage :
                    let articleInCart = [];

                    //Si le LS est vide on crée le produit
                    if (getStorage == null){
                        articleInCart.push(articleToAdd);
                        localStorage.setItem("products", JSON.stringify(articleInCart));

                        //Produit existant dans le LS, on ajoute la quantité
                    }else if (getStorage !== null && getStorage.find(article => article.id === id && article.color === colorChoose.value) != undefined) {
                        let foundArticle = getStorage.find(article => article.id === id && article.color === colorChoose.value);
                        articleInCart = getStorage;
                        let addQuantity = parseInt(articleToAdd.quantity) + parseInt(foundArticle.quantity);
                        foundArticle.quantity = addQuantity;
                        localStorage.setItem("products", JSON.stringify(articleInCart));
                    }// Sinon on ajoute le nouveau produit
                    else if (getStorage !== null) {
                        articleInCart = getStorage;
                        articleInCart.push(articleToAdd);
                        localStorage.setItem("products", JSON.stringify(articleInCart));
                      }

                      alert(`Vous avez bien ajouté ${quantityChoose.value} ${products.name} ${colorChoose.value} à votre panier`);


            




            } else //Informer l'utilisateur de devoir rentrer une quantité entre 0 et 100 ainsi q'une couleur
                alert("Merci de bien vouloir selectioner une couleur et une quantité entre 1 et 100");
        });

    })

    .catch((error) => alert("Impossible de récuperer la requette sur l'API,verrifiez que le server soit bien lancé"))



