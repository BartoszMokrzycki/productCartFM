const allAddBtn = document.querySelectorAll('.normalStateBtn');

const emptyCartState = document.querySelector('.emptyState');
const submitOrderBox = document.querySelector('.orderSubmitBox');

const orderSum = document.querySelector('.orderSumAmount');

const finalSum = document.querySelector('.sumTotal');

const modal = document.querySelector('.modal');
const modalOrderSum = document.querySelector('.modalOrderSum');
const confirmOrderBtn = document.querySelector('.confirmBtn');
const modalFinalSum = document.querySelector('.modalFinalSum');

const restartBtn = document.querySelector('.restartBtn');

let sumAllOrders = 0;

const updateOrderSum = () => {
	if (orderSum) {
		orderSum.textContent = `(${sumAllOrders})`;
	}
};

//final order price
let finalSumTotal = 0;

const updateFinalSumTotal = () => {
	finalSum.textContent = `$${finalSumTotal.toFixed(2)}`;
	modalFinalSum.textContent = `$${finalSumTotal.toFixed(2)}`;
};

const changeBtnState = clickedButton => {
	const productDataDiv = clickedButton.parentElement.nextElementSibling;

	const productDataCategory = productDataDiv.querySelector('.category');
	const productDataName = productDataDiv.querySelector('.name');
	const productDataPrice = productDataDiv.querySelector('.price');

	//setting modal img

	const addToCartBtnParent = clickedButton.parentElement;
	console.log(addToCartBtnParent);
	const productImg = addToCartBtnParent
		.querySelector('img')
		.getAttribute('src');

	// new element
	const newBtn = document.createElement('div');
	newBtn.innerHTML = `
		<div class="decreaseBtn">-</div>
		<p class="productAmount">1</p>
		<div class="increaseBtn">+</div>`;
	newBtn.classList.add(
		'absolute',
		'w-[180px]',
		'justify-between',
		'-bottom-6',
		'flex',
		'items-center',
		'px-6',
		'py-3',
		'rounded-3xl',
		'border',
		'border-projectRed',
		'transition-colors',
		'hover:border-projectRed',
		'text-white',
		'bg-projectRed'
	);

	//previous button
	const prevBtn = document.createElement('button');
	prevBtn.innerHTML = `
	<img
		src="./images/icon-add-to-cart.svg"
		alt="Vanilla Panna Cotta"
		class="pr-2" />
	Add to Cart
	`;

	prevBtn.classList.add(
		'absolute',
		'normalStateBtn',
		'w-[180px]',
		'justify-center',
		'bg-white',
		'-bottom-6',
		'flex',
		'items-center',
		'px-6',
		'py-3',
		'rounded-3xl',
		'border',
		'border-projectRose400',
		'transition-colors',
		'hover:border-projectRed',
		'hover:text-projectRed'
	);

	clickedButton.parentNode.replaceChild(newBtn, clickedButton);

	const decreaseBtn = newBtn.querySelector('.decreaseBtn');
	const increaseBtn = newBtn.querySelector('.increaseBtn');
	const productAmount = newBtn.querySelector('.productAmount');
	const sumItemPrice = productDataPrice.textContent.trim();
	const sumItemPriceToNumber = parseFloat(
		sumItemPrice.replace('$', '').replace('.00', '')
	);

	let amount = 1; // Ustawiamy początkowy stan na 1
	productAmount.textContent = `${amount}`; // Wyświetlamy początkową ilość
	sumAllOrders++; // Dodajemy początkową ilość do sumy zamówień
	updateOrderSum(); // Aktualizujemy sumę zamówień
	finalSumTotal += sumItemPriceToNumber;
	updateFinalSumTotal();

	const totalPrice = parseFloat(sumItemPriceToNumber * amount);

	// adding to orderlist
	const orderSubmitItem = document.createElement('div');
	orderSubmitItem.classList.add(
		'item',
		'pt-6',
		'relative',
		'border-b',
		'border-projectRose100'
	);

	orderSubmitItem.innerHTML = `
    <button class="itemBtn">
		<img
			src="./images/icon-remove-item.svg"
			alt=""
			class="absolute right-2 top-5 border rounded-full p-1" />
	</button>
	<p class="text-projectRose900 font-semibold">
		${productDataName.textContent}
	</p>
	<div class="priceSubmit flex items-center justify-between ">
		<p class="amount font-semibold text-projectRed py-2">${amount}x</p>
		<p class="price font-normal text-projectRose500 px-4">
			${productDataPrice.textContent}
		</p>
		<p class="sumItem font-semibold text-projectRose500">
			$${totalPrice.toFixed(2)}
		</p>
	</div>
    `;
	submitOrderBox.prepend(orderSubmitItem);

	//modalSettings
	const modalSumedItem = document.createElement('div');
	modalSumedItem.style.display = 'flex';

	modalSumedItem.style.alignItems = 'center';

	modalSumedItem.innerHTML = `
	<img		
		src="${productImg}"
		alt=""
		class="modalImg w-12 h-12 py-2" />
	<div class="modalData">
		<div class="sumedName flex flex-col">
			<p class="name font-semibold">${productDataName.textContent}</p>
		<div class="flex">
			<p class="amount text-projectRed">${amount}x</p>
			<p class="itemPrice font-normal text-projectRose500 pl-4">
			${productDataPrice.textContent}
			</p>
		</div>
	</div>
	<p class="totalPrice text-xl font-semibold text-end">$${totalPrice.toFixed(
		2
	)}</p>
	</div>
	`;

	modalOrderSum.prepend(modalSumedItem);

	const showModal = () => {
		modal.classList.remove('hidden', 'md:hidden');
		modal.classList.add('md:flex');
	};

	// deleting single order item
	const deleteItemBtn = document.getElementsByClassName('itemBtn');
	console.log(deleteItemBtn);

	const handleDeleteItem = event => {
		const clickedButton = event.currentTarget;

		const orderSubmitItem = clickedButton.closest('.item');
		const itemPrice = orderSubmitItem.querySelector('.sumItem');
		const amountText = orderSubmitItem.querySelector('.amount').textContent;
		const amount = parseInt(amountText.replace('x', '').trim(), 10);

		// take price to delete
		const priceToRemove = parseFloat(
			itemPrice.textContent.replace('$', '').trim()
		);

		// find corresponding element
		const productName = orderSubmitItem
			.querySelector('.text-projectRose900')
			.textContent.trim();

		const modalSumedItem = Array.from(modalOrderSum.children).find(child => {
			const nameElement = child.querySelector('.name');
			return nameElement && nameElement.textContent.trim() === productName;
		});

		// restore btn to initial state
		if (newBtn.parentNode.contains(newBtn)) {
			newBtn.parentNode.replaceChild(prevBtn, newBtn);
		}

		// delete elements
		if (orderSubmitItem) orderSubmitItem.remove();
		if (modalSumedItem) modalSumedItem.remove();

		// update amount and prices
		sumAllOrders -= amount;
		finalSumTotal -= priceToRemove;
		updateOrderSum();
		updateFinalSumTotal();

		if (sumAllOrders === 0) {
			emptyCartState.classList.remove('hidden');
			submitOrderBox.classList.add('hidden');
		}
	};

	Array.from(document.getElementsByClassName('itemBtn')).forEach(button => {
		button.addEventListener('click', handleDeleteItem);
	});

	// products amount update
	const increaseAmount = () => {
		amount++;
		productAmount.textContent = `${amount}`;
		orderSubmitItem.querySelector('.amount').textContent = `${amount}x`;

		const updatedTotalPrice = sumItemPriceToNumber * amount;
		orderSubmitItem.querySelector(
			'.sumItem'
		).textContent = `$${updatedTotalPrice.toFixed(2)}`;
		console.log(updatedTotalPrice);

		sumAllOrders++;
		finalSumTotal += sumItemPriceToNumber;
		updateOrderSum();
		updateFinalSumTotal();

		modalSumedItem.innerHTML = `
        <img		
            src="${productImg}"
            alt=""
            class="modalImg w-12 h-12 py-2" />
        <div class="modalData">
            <div class="sumedName flex flex-col">
                <p class="name font-semibold">${productDataName.textContent}</p>
                <div class="flex">
                    <p class="amount text-projectRed">${amount}x</p>
                    <p class="itemPrice font-normal text-projectRose500 pl-4">
                        ${productDataPrice.textContent}
                    </p>
                </div>
            </div>
            <p class="totalPrice text-xl font-semibold text-end">$${updatedTotalPrice.toFixed(
							2
						)}</p>
        </div>
    `;
	};

	const decreaseAmount = () => {
		if (amount > 0) {
			amount--;
			productAmount.textContent = `${amount}`;
			orderSubmitItem.querySelector('.amount').textContent = `${amount}x`;

			const updatedTotalPrice = sumItemPriceToNumber * amount;
			orderSubmitItem.querySelector(
				'.sumItem'
			).textContent = `$${updatedTotalPrice.toFixed(2)}`;
			console.log(sumAllOrders);

			sumAllOrders--;
			finalSumTotal -= sumItemPriceToNumber;
			updateOrderSum();
			updateFinalSumTotal();

			modalSumedItem.innerHTML = `
            <img		
                src="${productImg}"
                alt=""
                class="modalImg w-12 h-12 py-2" />
            <div class="modalData">
                <div class="sumedName flex flex-col">
                    <p class="name font-semibold">${
											productDataName.textContent
										}</p>
                    <div class="flex">
                        <p class="amount text-projectRed">${amount}x</p>
                        <p class="itemPrice font-normal text-projectRose500 pl-4">
                            ${productDataPrice.textContent}
                        </p>
                    </div>
                </div>
                <p class="totalPrice text-xl font-semibold text-end">$${updatedTotalPrice.toFixed(
									2
								)}</p>
            </div>
        `;
		}

		if (amount === 0) {
			newBtn.parentNode.replaceChild(prevBtn, newBtn);
			prevBtn.addEventListener('click', event => {
				changeBtnState(event.currentTarget);
			});

			orderSubmitItem.remove();
			modalSumedItem.remove();

			if (sumAllOrders === 0) {
				emptyCartState.classList.remove('hidden');
				submitOrderBox.classList.add('hidden');
			}
		}
	};

	increaseBtn.addEventListener('click', increaseAmount);
	decreaseBtn.addEventListener('click', decreaseAmount);
	confirmOrderBtn.addEventListener('click', showModal);
};

allAddBtn.forEach(button => {
	button.addEventListener('click', event => {
		changeBtnState(event.currentTarget);
		emptyCartState.classList.add('hidden');
		submitOrderBox.classList.remove('hidden');
	});
});

restartBtn.addEventListener('click', () => {
	location.reload();
});
