// Récupération des products dans l'API
fetch("http://localhost:3000/api/products")
.then(function(reponse){
        return reponse.json();    
})
.then(function(resultatAPI){
    const products = resultatAPI;
    // console.log(products);

    //Appel de la fonction displayProducts afin de generer l'affichage des produits obtenus
    displayProducts(products);


})

.catch((error) => {
    alert("Impossible de récuperer la requette sur l'API,verrifiez que le server soit bien lancé");
})

//On crée la fonction d'affichage
function displayProducts(products){
    for (let product in products){


        //Création de la balise <a> de l'article
        let productLink = document.createElement("a");
        document.querySelector("#items").append(productLink);
        productLink.href = `product.html?id=${products[product]._id}`;
    
        //Création de la balise <article> dans la balise <a>
        let productArticle = document.createElement("article");
        productLink.append(productArticle);
    
    
        //Création de la balise <img> dans la balise <article>
        let productImg = document.createElement("img");
        productArticle.append(productImg);
        productImg.src = products[product].imageUrl;
        productImg.alt = products[product].altTxt;
    
        //Création de la balise <h3> dans la balise <article>
        let productTitle = document.createElement("h3");
        productArticle.append(productTitle);
        productTitle.classList = "productName";
        productTitle.innerText = products[product].name;
    
    
        //Création de la balise <p> dans la balise <article>
        let productDescription = document.createElement("p");
        productArticle.append(productDescription);
        productDescription.classList = "productDescription";
        productDescription.innerText = products[product].description;
    
        

    
    }
}