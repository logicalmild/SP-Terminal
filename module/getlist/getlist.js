function GetList(){
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
            text = data.d.results;
      
        },

        error: {}
    
    });


    return text;
}

