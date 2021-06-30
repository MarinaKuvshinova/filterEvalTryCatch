		// функция которая возвращает масисив элементов у которых тип совпадает с типом переданым в аргументе
const filterByType = (type, ...values) => values.filter(value => typeof value === type), 
	//функция для скрития блоков 'div.dialog__response-block
	hideAllResponseBlocks = () => {
		//вносим в переменную массив из элементов с классом div.dialog__response-block
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		//перебираем найденные элементы и скрываем их стилями
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
	//функция отображения результата
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		//вызываем функцию для поиска и потом скрытия элементов
		hideAllResponseBlocks();
		//ищи элементы с селевтором blockSelector и показываем их
		document.querySelector(blockSelector).style.display = 'block';
		//если в переменная истина spanSelector выполняем что в условии
		if (spanSelector) {
			//ищим элемент с селектором spanSelector и задаем ему текст что храннится в переменной msgText
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
//выводим блок и текст с ошибкой
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
//выводим блок и текст с результатом
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
//выводим блок и текст если результата нет
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
//ставниваем переданный тип и массив значение
	tryFilterByType = (type, values) => {
		//блок кода
		try {
			//выполняем строку кода с которой вызываем функцию для сравнения типа и значений. После этого полученый массив переводим в строку через ,
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			//формируем сообщение
			const alertMsg = (valuesArray.length) ?
				//если переменная не пусная формируем сообщение в котором указываем тип и данные что нашли
				`Данные с типом ${type}: ${valuesArray}` :
				//если значений нет формируем об этом сообщение
				`Отсутствуют данные типа ${type}`;
			//показываем сообщение с полученным результатом
			showResults(alertMsg);
		//отлавниваем ошибки
		} catch (e) {
			//выводим блок с ошибкой
			showError(`Ошибка: ${e}`);
		}
	};
//ищим елемент с #filter-btn
const filterButton = document.querySelector('#filter-btn');
//подписываем найденую кнопку на событие клик
filterButton.addEventListener('click', e => {
	//ищим елемент с #type
	const typeInput = document.querySelector('#type');
	//ищим елемент с #data
	const dataInput = document.querySelector('#data');
	//проверяем пустой ли инпуте
	if (dataInput.value === '') {
		//показываем тултип в котором говорим что поле пустым быть не может
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		//показываем блок без результата
		showNoResults();
	//иначе
	} else {
		//прячем тултип
		dataInput.setCustomValidity('');
		//отменяем стандартное поведение
		e.preventDefault();
		//сравниваем данные что ввели
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

