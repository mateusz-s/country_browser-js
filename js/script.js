var url = 'https://restcountries.eu/rest/v2/name/',
    countryContainer = $('#countries-container'),
	countryInput = $('#country-name'),
	countrySearchBtn = $('#search');

function countryLang(langList) {
    var lang = langList[0].name;
    for (var i = 1; i < langList.length; i++) {
        lang += ', ' + langList[i].name;
    }
    return lang;
}

function showCountriesList(resp) {
    countryContainer.empty();
    
    resp.forEach(function (item, index) {
        var countryTab = $('<table>').attr('id', 'country-table-' + index);
        
        for (var i = 1; i < 8; i++) {
            var countryTabRow = $('<tr>'),
                countryFlag = $('<img src="" alt="" class="country-flag">');
            
            countryTabRow.append('<td>');
            countryTabRow.append('<td>');
            
            var countryFirstCellInRow = countryTabRow.find('td').eq(0);
            var countrySecondCellInRow = countryTabRow.find('td').eq(1);

            switch(i) {
                case 1:
                    countryFirstCellInRow.append(countryFlag.attr('src', item.flag));
                    countrySecondCellInRow.text(item.name.toUpperCase());
                    break;
                case 2:
                    countryFirstCellInRow.text('Capital');
                    countrySecondCellInRow.text(item.capital);
                    break;
                case 3:
                    countryFirstCellInRow.text('Land area');
                    countrySecondCellInRow.text(item.area + ' km').append('<sup>2</sup>');
                    break;
                case 4:
                    countryFirstCellInRow.text('Population');
                    countrySecondCellInRow.text(item.population);
                    break;
                case 5:
                    countryFirstCellInRow.text('Language(s)');
                    countrySecondCellInRow.text(countryLang(item.languages));
                    break;
                case 6:
                    countryFirstCellInRow.text('Currency');
                    countrySecondCellInRow.text(item.currencies[0].name + ' (' + item.currencies[0].symbol + ', ' + item.currencies[0].code + ')');
                    break;
                case 7:
                    countryFirstCellInRow.text('Region');
                    countrySecondCellInRow.text(item.region);
            }
            
            countryTab.append(countryTabRow);
        }
        
        countryContainer.append(countryTab);
    });
    
    countryContainer.prepend('<h2>Countries list</h2>');
}

function typeError() {
    countryContainer.empty();
	
    var errorInfo = $('<h2>').text('No data avaliable! Please check your typing!').css({'color': 'red', 'text-align': 'center', 'text-transform': 'none', 'text-shadow': '0 0 10px #FFFFFF'});
	
    countryContainer.append(errorInfo);
}

function searchCountries() {
    var countryName = countryInput.val();
	countryInput.val('');
    
    if (!countryName.length) {
        countryName = 'Poland';
    }
    $.ajax({
        url: url + countryName,
        method: 'GET',
        success: showCountriesList,
        error: typeError
    });
}

$(document).keypress(function (e) {
    if (e.which == 13) {
        searchCountries();
    }
});

// Scroll to top button - Start
$(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
        $('.scrollUp').fadeIn();
    } else {
        $('.scrollUp').fadeOut();
    }
});
	
$('.scrollUp').click(function () {
    $('**html, body**').animate({scrollTop : 0}, 1000);
    return false;
}); // Scroll to top button - End

countrySearchBtn.click(searchCountries);