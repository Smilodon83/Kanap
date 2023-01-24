
//------Récupération du local storage-----------------

productLocalStorage = JSON.parse(localStorage.getItem("basket"));
let cart = document.getElementById("cart__items");
let productListFiltred = [];

// recuperer tt les produits avec fetch 
// Filtrer la liste des produits pour garder juste les produits qu'on a sur le localstorage
function getProducts() {
  fetch(`http://localhost:3000/api/products/`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (listProduct) {

      let list = listProduct;
      if (productLocalStorage && productLocalStorage.length) {
        let productBasket = productLocalStorage.map(product => product.id);// Recupérartion des ID du local Storage



        productListFiltred = list.filter(el => productBasket.includes(el._id));//Filtrer les produit de l'api en fonction de ceux present ds le LS
        
        getCart(productListFiltred);
        modifyQuantity();
        deleteArticle();
        getTotals();

      }else {
        let emptyBasket = document.createElement("p");
        emptyBasket.innerText="Votre Panier est vide";
        cart.appendChild(emptyBasket);
      }


    })

    .catch(function (err) {
      console.log("api error", err);
    })
}


getProducts();
function getCart(productList) {

  
 
  // on crée les éléments manquants dans le local storage

    for (let product in productLocalStorage) {
      const currentProduct = productList.find(p => p._id === productLocalStorage[product].id);
      //creation de l'article

      let article = document.createElement("article");
      document.querySelector("#cart__items").appendChild(article);
      article.className = "cart__item";
      article.setAttribute("data-id", productLocalStorage[product].id);

      // Ajout de la div "cart__item__img"
      let productDiv = document.createElement("div");
      article.appendChild(productDiv);
      productDiv.className = "cart__item__img";

      // ajout de l'image
      let productImg = document.createElement("img");
      productDiv.appendChild(productImg);
      productImg.src = currentProduct.imageUrl;
      productImg.alt = currentProduct.altTxt;


      // Ajout de la div "cart__item__content"
      let itemContent = document.createElement("div");
      article.appendChild(itemContent);
      itemContent.className = "cart__item__content";

      // Ajout de la div "cart__item__content__titlePrice"
      let itemContentTitlePrice = document.createElement("div");
      itemContent.appendChild(itemContentTitlePrice);
      itemContentTitlePrice.className = "cart__item__content__titlePrice";

      // Ajout du titre h3
      let productTitle = document.createElement("h2");
      itemContentTitlePrice.appendChild(productTitle);
      productTitle.innerText = currentProduct.name;

      // Ajout de la couleur
      let productColor = document.createElement("p");
      productTitle.appendChild(productColor);
      productColor.innerText = productLocalStorage[product].color;


      // Ajout du prix
      let productPrice = document.createElement("p");
      itemContentTitlePrice.appendChild(productPrice);
      // const currentProduct = productList.find(p => p._id === productLocalStorage[product].id);
      productPrice.classList = "product__price"
      productPrice.innerText = currentProduct.price + " €";

      // Ajout de la div "cart__item__content__settings"
      let itemContentSettings = document.createElement("div");
      itemContent.appendChild(itemContentSettings);
      itemContentSettings.className = "cart__item__content__settings";

      // Ajout de la div "cart__item__content__settings__quantity"
      let itemContentSettingsQuantity = document.createElement("div");
      itemContentSettings.appendChild(itemContentSettingsQuantity);
      itemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

      // Ajout de "Qté : "
      let productQte = document.createElement("p");
      itemContentSettingsQuantity.appendChild(productQte);
      productQte.innerText = "Qté : ";

      // Ajout de la quantité
      let productQuantity = document.createElement("input");
      itemContentSettingsQuantity.appendChild(productQuantity);
      productQuantity.value = productLocalStorage[product].quantity;
      productQuantity.className = "itemQuantity";
      productQuantity.setAttribute("type", "number");
      productQuantity.setAttribute("min", "1");
      productQuantity.setAttribute("max", "100");
      productQuantity.setAttribute("name", "itemQuantity");

      // Ajout de la "div" "cart__item__content__settings__delete"
      let itemContentSettingsDelete = document.createElement("div");
      itemContentSettings.appendChild(itemContentSettingsDelete);
      itemContentSettingsDelete.className = "cart__item__content__settings__delete";

      // Ajout de "p" suppression
      let productDelete = document.createElement("p");
      itemContentSettingsDelete.appendChild(productDelete);
      productDelete.className = "deleteItem";
      productDelete.innerText = "Supprimer";
    }
  }


function getTotals() {
  // On récupère la quantité totale
  let elementsQuantity = document.getElementsByClassName('itemQuantity');
  let myLength = elementsQuantity.length;
  totalQuantity = 0;
  //(expression initiale, condition, incrémentation)
  for (let i = 0; i < myLength; i++) {
    totalQuantity += elementsQuantity[i].valueAsNumber;
  }

  let productTotalQuantity = document.getElementById('totalQuantity');
  productTotalQuantity.innerText = totalQuantity;


  // On récupère le prix total
  let elementPrice = document.getElementsByClassName("product__price");
  
  totalPrice = 0;
  for (let i = 0; i < myLength; i++) {
    let price = parseInt(elementPrice[i].innerText.split(" €")[0]);
    totalPrice += (elementsQuantity[i].valueAsNumber * price);
    
  }

  let productTotalPrice = document.getElementById('totalPrice');
  productTotalPrice.innerText = totalPrice;

}


// On modifie la quantité d'un produit dans le panier



function modifyQuantity() {

  let itemModif = document.querySelectorAll(".itemQuantity");


  for (let j = 0; j < itemModif.length; j++) {
    itemModif[j].addEventListener("change", (event) => {
      event.preventDefault()
      //Je selectionne l'élément à modifier selon son Id et sa couleur
      let itemNew = productLocalStorage[j].quantity;
      let itemModifValue = itemModif[j].valueAsNumber;
      //J'ajoute une condition pour éviter que l'utilisateur saisisse une valeur négative ou supérieur à 100
     if (itemModif[j].valueAsNumber > 0 && itemModif[j].valueAsNumber <= 100){
      const result = productLocalStorage.filter(
        (element) => element.itemModifValue !== itemNew);

      result.quantity = itemModifValue;
      productLocalStorage[j].quantity = result.quantity;

      localStorage.setItem("basket", JSON.stringify(productLocalStorage));
      location.reload();
    }else {
      alert("La quantité doit etre comprise entre 0 et 100");
      location.reload();
    }
    

      
    });//fin addeventlistener
  }
}

//pour supprimer le produit du panier
deleteArticle();

function deleteArticle() {
  let deleteItem = document.querySelectorAll(".deleteItem");

  for (let k = 0; k < deleteItem.length; k++) {
    deleteItem[k].addEventListener("click", (event) => {
      event.preventDefault()

      //Je selectionne l'élément à modifier selon son Id et sa couleur
      let deleteId = productLocalStorage[k].id;
      let deleteColor = productLocalStorage[k].color;

      productLocalStorage = productLocalStorage.filter(
        (element) => element.id !== deleteId || element.color !== deleteColor);
      localStorage.setItem("basket", JSON.stringify(productLocalStorage));

      location.reload();
      alert("Votre article a bien été supprimé.")


    })//fin addEventListener
  }
}

/*******************/
//formulaire
/*******************/
//On declare contact et products et on le rempli au fur et à mesure de la validation
let contact = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: "",
};


let formulaire = document.querySelector('.cart__order__form input[type= "submit"]');
let inputs = document.querySelector(".cart__order__form__question");

let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let address = document.querySelector("#address");
let email = document.querySelector("#email");
let city = document.querySelector("#city");

let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
let addressErrorMsg = document.querySelector("#addressErrorMsg");
let emailErrorMsg = document.querySelector("#emailErrorMsg");
let cityErrorMsg = document.querySelector("#cityErrorMsg");

//Création des expressions régulières
let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');// pour le champ email
let letterRegExp = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$");// pour les champs nom, prénom et ville
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");//pour le champ adresse


let submit = document.querySelector("#order");

////condition avec regex et return des valeur boléennes selon condition remplie ou pas pour chaque input
/////////firstName/////////
firstName.addEventListener("input", function (e) {
  //arrête d'écouter après le résultat valide
  validFirstName(e.target.value);
  //récupération des valeurs pour construire l'objet contact
  contact.firstName = e.target.value;
});

function validFirstName(firstName) {
  //on déclare la validation sur faux
  let valid = false;
  //on test la regex
  let testName = letterRegExp.test(firstName);
  if (testName) {
    //si il n'y a pas de message d'erreur valid ok
    firstNameErrorMsg.textContent = "";
    valid = true;
  } else {
    //si il y a un message d'erreur valide reste false
    firstNameErrorMsg.textContent = "le prénom doit avoir 3 lettres minimum et pas de caractère spéciaux ou chiffres merci !!!";
    //on retourne le résultat de valid pour chaque champ
    valid = false;
  }
  return valid;
}

/////////lastName/////////
lastName.addEventListener("input", function (e) {
  validLastName(e.target.value);
  contact.lastName = e.target.value;
});

function validLastName(lastName) {
  let valid = false;
  let testLastName = letterRegExp.test(lastName);
  if (testLastName) {
    lastNameErrorMsg.textContent = "";
    valid = true;
  } else {
    lastNameErrorMsg.textContent = "le nom doit avoir 3 lettres minimum et pas de caractère spéciaux ou chiffres merci !!!";
    valid = false;
  }
  return valid;
}

/////////adress/////////
address.addEventListener("input", function (e) {
  validAddress(e.target.value);
  contact.address = e.target.value;
});

function validAddress(address) {
  let valid = false;
  let testAddress = addressRegExp.test(address);
  if (testAddress) {
    addressErrorMsg.textContent = "";
    valid = true;
  } else {
    addressErrorMsg.textContent = "merci de rentrer une adresse valide, max 50 caractères";
    valid = false;
  }
  return valid;
}

/////////city/////////
city.addEventListener("input", function (e) {
  validCity(e.target.value);
  contact.city = e.target.value;
});

function validCity(city) {
  let valid = false;
  let testCity = letterRegExp.test(city);
  if (testCity) {
    cityErrorMsg.textContent = "";
    valid = true;
  } else {
    cityErrorMsg.textContent = "merci de rentrer le nom de votre ville ou village, pas de code postal !!! ";
    valid = false;
  }
  return valid;
}

/////////email/////////
email.addEventListener("input", function (e) {
  validEmail(e.target.value);
  contact.email = e.target.value;
});

function validEmail(email) {
  let valid = false;
  let testEmail = emailRegExp.test(email);
  if (testEmail) {
    emailErrorMsg.textContent = "";
    valid = true;
  } else {
    emailErrorMsg.textContent = "Email non valide, il doit contenir un @ et 1 point suivi de maxixum 4 lettres, exemple toto@monmail.fr";
    valid = false;
  }
  return valid;
}
let products = [];
//Fonction d'écoute du bouton Confirmer
let ordeButton = document.querySelector("#order").addEventListener("click", (e) => {
  e.preventDefault();
  if (
    letterRegExp.test(firstName.value) == false ||
    letterRegExp.test(lastName.value) == false ||
    addressRegExp.test(address.value) == false ||
    letterRegExp.test(city.value) == false ||
    emailRegExp.test(email.value) == false
  ) {
    window.alert("Certains champs du formulaire sont manquants ou mal renseignés");
  } else if (
    firstName.value === "" ||
    lastName.value === "" ||
    address.value === "" ||
    city.value === "" ||
    email.value === ""
  ) {
    window.alert("Merci de remplir tout les champs");
  } else {
    //création contact sur LS
    localStorage.setItem("contact", JSON.stringify(contact));


    //Ajout d'une condition pour verifier s'il existe des produit dans le panier
    if (productLocalStorage && productLocalStorage.length) {
      for (let articleSelect of productLocalStorage) {
        products.push(articleSelect.id)
      };

      let order = {
        contact: contact,
        products: products,
      };


      /** 
       * fetch avec POST transforme JSON grace aux headers informations
       * méthode http body = données que l'on souhaite envoyer
      */
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json'
        },
      })
        .then((res) => res.json())
        .then((data) => {
          let orderId = data.orderId;
          window.location.assign("confirmation.html?id=" + orderId)

        });
      //Si le panier est vide     
    } else {
      alert("Votre panier est vide");
      location.reload();
    }
  }
});