// Список курсов
    let courses = [
        { name: "Courses in England", prices: [0, 100] }, 
        { name: "Courses in Germany", prices: [500, null] }, 
        { name: "Courses in Italy", prices: [100, 200] }, 
        { name: "Courses in Russia", prices: [null, 400] },
        { name: "Courses in China", prices: [50, 250] },
        { name: "Courses in USA", prices: [200, null] },
        { name: "Courses in Kazakhstan", prices: [56, 324] },
        { name: "Courses in France", prices: [null, null] },
    ];

// Варианты цен (фильтры), которые ищет пользователь
    let requiredRange1 = [null, 200];
    let requiredRange2 = [100, 350];
    let requiredRange3 = [200, null];

//Сортировка по возрастанию от первой цены
	var sortCorses = courses.slice(0);
	sortCorses.sort(function (a, b) {
	  return a.prices[0] - b.prices[0];
	});
//В массиве filtered будет находится отфильтрованный список
	var filtered = [];
//Функция филтра курсов
	function rangePrice(requiredRange) {
//Проверка что запрос без ошибок
 	 if (isNaN(requiredRange[0]) || (isNaN(requiredRange[1]))){
   		alert('Нужно писать число!');
  		} else {
  		if ((requiredRange[0] < 0) || (requiredRange[1] < 0)){
    	alert('Нужно писать число больше 0');
  		} else{
  			filtered = [];
//Если в запросе пользователя 2 аргумент неопределен выставляем его максимально большим числом
  			if (requiredRange[1] == null) requiredRange[1] = Number.MAX_SAFE_INTEGER;
			if (requiredRange[0] == null) requiredRange[0] = 0;

// Цикл по всем курсам с проверкой условий из запроса пользователя
  			sortCorses.forEach(function (item, i, arr) {
			if (item.prices[1] == null) item.prices[1] = Number.MAX_SAFE_INTEGER;
			if (item.prices[0] == null) item.prices[0] = 0;

			if (requiredRange[0] >= item.prices[0]) {
				if (requiredRange[0] <= item.prices[1]) {
					if (item.prices[1] < requiredRange[1]) {
						filtered.push({name: item.name, priceStart: requiredRange[0], priceEnd: item.prices[1]});
        			} else {
          				filtered.push({name: item.name, priceStart: requiredRange[0], priceEnd: requiredRange[1]});
        			}
      			}
    		} else {
      			if (requiredRange[1] >= item.prices[0]) {
        			if (item.prices[1] < requiredRange[1]) {
        				filtered.push({name: item.name, priceStart: item.prices[0], priceEnd: item.prices[1]});} 
        				else {          
        				filtered.push({name: item.name, priceStart: item.prices[0], priceEnd: requiredRange[1]});
        				}
      				}
    			}
  			});

			document.write("По вашему запросу от " + requiredRange[0] + "р. ");
			if (requiredRange[1] == Number.MAX_SAFE_INTEGER) {
    			requiredRange[1] = "";
    			document.write("Вам подходят следующие курсы: " + "<br />");
  			} else {
    			document.write("до " + requiredRange[1] + "р. Вам подходят следующие курсы: " + "<br />");
  			}
//Вывод списка по запросу пользователя
  			if (filtered.length !== 0) {  
  				filtered.forEach(function (item, i, arr) {
    				document.write(item.name + " по цене от " + item.priceStart + "р.");
    				if (item.priceEnd !== Number.MAX_SAFE_INTEGER)
      				document.write(" до " + item.priceEnd + "р.");
    				document.write("<br />");});
  			}
    		else 
        		document.write("К сожалению подходящих курсов нет <br />"); 
   			document.write("<br />");
  			}  
 		}
	}

rangePrice(requiredRange1);
rangePrice(requiredRange2);
rangePrice(requiredRange3);
