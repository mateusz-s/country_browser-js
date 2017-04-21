var url = 'https://restcountries.eu/rest/v2/name/',
    countryContainer = $('#countries-container');


$('#search').click(searchCountries);

function searchCountries() {
    var countryName = $('#country-name').val();
    
    if (!countryName.length) {
        countryName = 'Poland';
    }
    $.ajax({
        url: url + countryName,
        method: 'GET',
        success: showCountriesList
    });
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

            switch(i) {
                case 1:
                    countryTabRow.find('td').eq(0).append(countryFlag.attr('src', item.flag));
                    countryTabRow.find('td').eq(1).text(item.name.toUpperCase());
                    break;
                case 2:
                    countryTabRow.find('td').eq(0).text('Capital');
                    countryTabRow.find('td').eq(1).text(item.capital);
                    break;
                case 3:
                    countryTabRow.find('td').eq(0).text('Land area');
                    countryTabRow.find('td').eq(1).text(item.area + ' km').append('<sup>2</sup>');
                    break;
                case 4:
                    countryTabRow.find('td').eq(0).text('Population');
                    countryTabRow.find('td').eq(1).text(item.population);
                    break;
                case 5:
                    countryTabRow.find('td').eq(0).text('Language(s)');
                    countryTabRow.find('td').eq(1).text(countryLang(item.languages));
                    break;
                case 6:
                    countryTabRow.find('td').eq(0).text('Currency');
                    countryTabRow.find('td').eq(1).text(item.currencies[0].name + ' (' + item.currencies[0].symbol + ', ' + item.currencies[0].code + ')');
                    break;
                case 7:
                    countryTabRow.find('td').eq(0).text('Region');
                    countryTabRow.find('td').eq(1).text(item.region);
            }
            
            countryTab.append(countryTabRow);
        }
        
        countryContainer.append(countryTab);
    });
    
    countryContainer.prepend('<h2>Countries list</h2>');
}

function countryLang(langList) {
    var lang = langList[0].name;
    for (var i = 1; i < langList.length; i++) {
        lang += ', ' + langList[i].name;
    }
    return lang;
}