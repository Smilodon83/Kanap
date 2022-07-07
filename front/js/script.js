// Récupération des products dans l'API
fetch("http://localhost:3000/api/products")
.then(function(reponse){
        return reponse.json();    
})
.then(function(resultatAPI){
    const products = resultatAPI;
    console.table(products);
for (let product in products){


    //Création de la balise <a> de l'article
    let productLink = document.createElement("a");
    document.querySelector("#items").append(productLink);
    productLink.href = `product.html?id=${products[product]._id}`;

    //Création de la balise <article>
    let productArticle = document.createElement("article");
    productLink.append(productArticle);


    //Création de la balise <img>
    let productImg = document.createElement("img");
    productArticle.append(productImg);
    productImg.src = products[product].imageUrl;
    productImg.alt = products[product].altTxt;

    //Création de la balise <h3>
    let productTitle = document.createElement("h3");
    productArticle.append(productTitle);
    productTitle.classList = "productName";
    productTitle.innerHTML = products[product].name;


    //Création de la balise <p> descriptive
    let productDescription = document.createElement("p");
    productArticle.append(productDescription);
    productDescription.classList = "productDescription";
    productDescription.innerHTML = products[product].description;

    
    // //Bonus ajout du prix :
    // let productPrice = document.createElement("p");
    // productArticle.append(productPrice);
    // productPrice.innerHTML = `Prix : ${products[product].price} €`;



}

})

.catch((error) => {
    alert("Impossible de récuperer la requette sur l'API,verrifiez que le server soit bien lancé");
})


