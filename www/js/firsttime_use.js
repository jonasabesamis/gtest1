/*
First time use





*/


var Init_Use = function(){
var db = window.openDatabase("DataDD", "1.0", "DDD", 200000);
db.transaction(Init_Check001, errorCB);
}

var Init_Check001 = function(tx){
tx.executeSql('SELECT * FROM DDUser', [], Init_Result001, errorCB);
}


var Init_Result001 = function(tx, results){
        var len = results.rows.length;
		//        console.log("DEMO table: " + len + " rows found.");
		
		$( ".ddslate" ).html( "" );		
		$( ".ddslate" ).append( "<div>Initialize First time use 001: " + len + " rows found.</div>" );
		
		alert('initiliazed ' + len);
}