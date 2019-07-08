window.addEventListener('load', () => {
	const nodes = {
		style: document.createElementNS('http://www.w3.org/2000/svg', 'style'),
		svg: document.getElementsByClassName('iviiv-logo')[0],
	};
	nodes.patterns = nodes.svg.querySelectorAll('pattern');

	const database = {
		ids: ['iviiv-f77', 'iviiv-77f', 'iviiv-7f7', 'iviiv-ff0'],
		degs: [0, -60, 90, 45],
		paths: ['', '', '', 'M1,0v-1M0,1h-1M1,2v1M2,1h1M-1-1h4v4h-4z'],
		sizes: ['', '', '', ''],
		ring: [
			[21, 21, 14, 310, 50],
			[21, 21, 14, 190, 290],
			[21, 21, 14, 70, 170],
		],
	};

	const request = new XMLHttpRequest();
	request.open('GET', './iviiv-logo.css');
	request.responseType = 'text';
	request.onload = () => {
		nodes.style.textContent = `
	/* <![CDATA[ */
			${request.response}
	/* ]]> */
	`;
		nodes.svg.prepend(nodes.style);
		nodes.svg.removeAttribute('visibility');
	};
	request.send();

	nodes.svg.querySelectorAll('#ring-mask path').forEach((path, index) => {
		path.setAttribute('d', describeArc(database.ring[index]));
	});
	nodes.svg.querySelectorAll('g path').forEach((path, index) => {
		['stroke'].map(x => path.setAttribute(x, `url('#${database.ids[index]}')`));
		if (database.ring[index]) path.setAttribute('d', describeArc(database.ring[index]));

	});

	nodes.patterns.forEach((pattern, index) => {
		const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

		path.setAttribute('d', database.paths[index] ? database.paths[index] : 'M0-1v4h2v-4');

		pattern.setAttribute('patternTransform', `rotate(${database.degs[index]})`);

		['width', 'height'].map(v => pattern.setAttribute(v, database.sizes[index] || 2));

		pattern.setAttribute('patternUnits', 'userSpaceOnUse');

		pattern.append(path);
	});
	// cгенерировать кольцо маски
	function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
		const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

		return {
			x: centerX + (radius * Math.cos(angleInRadians)),
			y: centerY + (radius * Math.sin(angleInRadians)),
		};
	}

	function describeArc([x, y, radius, startAngle, endAngle]) {
		const start = polarToCartesian(x, y, radius, endAngle);
		const end = polarToCartesian(x, y, radius, startAngle);

		const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

		const d = [
			'M', start.x, start.y,
			'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
		].join(' ');

		return d;
	}

	/* window.onload = function () {
		document.getElementById("arc1").setAttribute("d", describeArc(150, 150, 100, 0, 270));
	}; */


	// зелёное

	// синее
	// красное
	// сгенерировать qr
	// cгенерировать цифры
	// сгенерировать кольцо
});
