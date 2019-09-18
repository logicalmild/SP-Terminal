function GetSubsite(){
    var requestUri = "https://spofficial.sharepoint.com/_api/search/query?querytext='contentclass:STS_Site contentclass:STS_Web'&selectproperties='Title,Path'&rowlimit=500";
    var requestHeaders = {
    "accept": "application/json;odata=verbose"
    }
    var text;

    $.ajax({
        url: requestUri,
        type: 'GET',
        dataType: 'json',
        async: false,
        headers: requestHeaders,
        success: function (data) 
        {      
        
            data = data.d; 
            text = JSON.stringify(data, null , 4);
            text = text.replace(/"/g,'');
            text = text.replace(/,/g,'');
            // text = text.replace(/{/g,'');
            // text = text.replace(/}/g,'');
            
            
        },
        error: function ajaxError(response) {
            console.log(response.status + ' ' + response.statusText);
        }
    });

    return text;

}