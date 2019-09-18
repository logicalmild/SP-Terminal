function GetSiteInfo(){
    
    var text = '\n';
    var Reserve = 50;
    text = JSON.stringify(_spPageContextInfo, null , 2);
    text = text.replace(/"/g,'');
    text = text.replace(/,/g,'');
    SiteUrl = _spPageContextInfo.webServerRelativeUrl;

    return text;
}