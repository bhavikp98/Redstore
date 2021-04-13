let carts = document.querySelectorAll('.cart-btn');

let products = [
	{
		name: 'Printed T-shirts',
		tag: 'product-1',
		price: 250.00,
		inCart: 0
	},
	{
		name: 'Canvas Shoes',
		tag: 'product-2',
		price: 700.00,
		inCart: 0
	},
	{
		name: 'Mens Joggers',
		tag: 'product-3',
		price: 350.00,
		inCart: 0
	},
	{
		name: 'Puma T-shirts',
		tag: 'product-4',
		price: 2500.00,
		inCart: 0
	},
	{
		name: 'Shoes',
		tag: 'product-5',
		price: 550.00,
		inCart: 0
	},
	{
		name: 'Puma',
		tag: 'product-6',
		price: 750.00,
		inCart: 0
	},
	{
		name: 'Mens Socks',
		tag: 'product-7',
		price: 150.00,
		inCart: 0
	},

	{
		name: 'Wrist Watch',
		tag: 'product-8',
		price: 950.00,
		inCart: 0
	}
];

for(let i = 0 ; i < carts.length ; i++){
	carts[i].addEventListener('click', () =>{
		cartNumbers(products[i])	
		totalCost(products[i])
	})

}

function onLoadCartNumber(){
	var productNumber = localStorage.getItem('cartNumber');
	if(productNumber){
		document.querySelector('.cart span').innerText = productNumber;
	}
}


function cartNumbers(product){
	var productNumber = localStorage.getItem('cartNumber');
	productNumber = parseInt(productNumber)

	if(productNumber){
		localStorage.setItem('cartNumber' , productNumber + 1);
		document.querySelector('.cart span').innerText = productNumber + 1;
	}
	else{
		localStorage.setItem('cartNumber' , 1);
		document.querySelector('.cart span').innerText = 1;
	}
	
	setItems(product)
}

function setItems(product){
	let cartItems = localStorage.getItem('productInCart');
	cartItems = JSON.parse(cartItems);

	if (cartItems != null) {

		if (cartItems[product.tag] == undefined) {
			cartItems = {
				...cartItems,
				[product.tag]:product
			}
		}
		cartItems[product.tag].inCart += 1;
	}	 
	else{
		product.inCart = 1;
		cartItems = {
		[product.tag]:product
		}
	}
		

	localStorage.setItem("productInCart" , JSON.stringify(cartItems));
}

function totalCost(product){
	let cartCost = localStorage.getItem('totalCost');
	

	if(cartCost != null){
		cartCost = parseInt(cartCost);
		localStorage.setItem("totalCost" , cartCost + product.price);
	}
	else{
		localStorage.setItem("totalCost" , product.price);
	}
}

function displayCart(){
	let cartItem = localStorage.getItem("productInCart");
	cartItem = JSON.parse(cartItem);
	let productContainer = document.querySelector(".products");
	let cartCost = localStorage.getItem('totalCost');

	if (cartItem && productContainer) {
		productContainer.innerHTML = '';
		Object.values(cartItem).map(item =>{
			productContainer.innerHTML += `
			<div class="product">
				<i class="fa fa-trash" aria-hidden="true"></i>
				<img src="img/${item.tag}.jpg">
				<span>${item.name}</span>
			</div>
			<div class="price">Rs${item.price},00</div>
			<div class="quantity">
				<i class="fa fa-plus-circle" aria-hidden="true"></i>
				<span class="incart">${item.inCart}</span>
				<i class="fa fa-minus-circle" aria-hidden="true"></i>
			</div>
			<div class="total">
				Rs${item.inCart * item.price},00
			</div>
			`
		});

		productContainer.innerHTML += `
		<div class="cartTotalConatiner">

		<span class="cartTotaltitle">Total Price</span>
		<span class="cartTotal">Rs${cartCost},00</span>
		</div>
		`
	}
}

onLoadCartNumber()
displayCart()