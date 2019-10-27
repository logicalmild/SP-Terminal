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
            var temp = data.d.results;
            
            if(ListName == 'title'){
                for(i=0 ; i < temp.length ; i++){
                    text += temp[i].Title + '\n';
                }
            }else{
                for(i=0 ; i < temp.length ; i++){
                    if(ListName.toUpperCase() == temp[i].Title.toUpperCase()){
                        text += PackTextRow(40,temp[i]) + '\n';
                    }else if(i == (temp.length-1)){
                        text = 'List ' + ListName + ' is not found.\n';

                    }
                    
                }
            }   
            
        },

        error: {}
    
    });


    return text;
}

