function ModuleQueryList(){
    var text ='';
        var Listname = '';
        var Query = '';

        terminal.push(function(command2) {
    
            Listname = command2;
            
            terminal.push(function(command3) {
    
                terminal.echo(command3);
                Query = command3;

                text = GetItemByRestAPI(Listname,Query);
                text = JSON.stringify(text, null , 2);
                // text = text.replace(/"/g,'');
                // text = text.replace(/,/g,'');
                // text = text.replace(/{/g,'');
                // text = text.replace(/}/g,'');
                // text = text.replace(/:/g,'\t\t');
                this.echo(text);

            }, {
                prompt: 'Query > '
            });
                
        }, {
            prompt: 'List name > '
        });
    
}