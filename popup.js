
$(document).ready(function() {
	var cards = document.querySelectorAll('div[data-testid="home-card-sale"]');
	applySqft(cards);
	var url = window.location.href;

	// on click events - if new url, start 100ms interval with 10s max to check if new homes rendered
	$(document).click(function(e) {
		setTimeout(function() {
			if (url !== window.location.href) {
				console.log('URL changed: ', window.location.href);
				url = window.location.href;
				document.querySelectorAll('.kinda-to-the-right').forEach(e => e.remove()); // remove all previous custom elements
				
				var loaded = false;
				var timedOut = false;

				setTimeout(function() {
					if (loaded === false) {
						clearInterval(interv);
					}
				}, 10000);

				var interv = setInterval(function() {
					var cards = document.querySelectorAll('div[data-testid="home-card-sale"]');
					if (cards && cards.length) {
						loaded = true;
						applySqft(cards);
						clearInterval(interv);
					}
				}, 100);
			}
		}, 2000);
	});
});


function applySqft(cards) {
	cards.forEach(function(card) {
		var priceElement = card.querySelector('div[data-testid="property-price"]');
		var sqftElement = card.querySelector('div[data-testid="property-floorSpace"]');

		if (priceElement && sqftElement) {
			var price = priceElement.textContent.replace('$', '').replace(/,/g, '').replace('+', '');
			var sqft = sqftElement.textContent.replace(/,/g, '').replace(' sqft', '');
			var pricePerSqft = String(Math.round(Number(price) / Number(sqft)));

			var dataRow = card.querySelector('.MediaBlock__MediaContainer-skmvlj-0');

			var el = document.createElement('div');
			el.classList.add('dCeMHc'); // copy trulia class for styling
			el.classList.add('kinda-to-the-right');

			var el2 = document.createElement('div');
			el2.classList.add('faqTnc'); // copy trulia class for styling
			el2.classList.add('bolddd');

			el2.textContent = '$' + pricePerSqft + '/sqft';

			el.appendChild(el2);
			dataRow.appendChild(el);
		}
	});
}



