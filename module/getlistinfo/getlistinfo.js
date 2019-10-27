function GetListInfo(Listname){
    var text = '\n';
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + '/_api/web/lists',
        type: 'GET',
        async: false,
        headers: {
        'accept': 'application/json;odata=verbose',
        'content-type': 'application/json;odata=verbose',
        },
        success: function (data) {
            data = data.d.results;

            for(i in data){
       
                if(data[i].Title == Listname){
                    text = JSON.stringify(data[i], null , 2);
                    text = text.replace(/"/g,'');
                    text = text.replace(/,/g,'');
                    terminal.echo(text);
                
                }
                if(i == (data.length - 1)){
                    terminal.echo('Not found');
                }

            }

        },

        error: {}
    
    });


    return text;
}
