function DeleteList() {
    var Listname = '';
    terminal.push(function(command2) {
    
        Listname = command2;
        var clientContext = new SP.ClientContext(SiteUrl);
        var oWebsite = clientContext.get_web();
        var listTitle = Listname;
        var oList = oWebsite.get_lists().getByTitle(listTitle);
        oList.deleteObject();

        clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
            
    }, {
        prompt: 'List name > '
    }); 
}

function onQuerySucceeded() {
    // var result = oList.get_title() + ' created.';
    terminal.echo('Delete Successful');

}

function onQueryFailed(sender, args) {
    // alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    terminal.echo('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}
