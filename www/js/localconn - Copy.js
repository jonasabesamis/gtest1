/*
Local DB

*/

var Initialize_Create = function(){
//var dbShell = window.openDatabase(name, version, display_name, size);
var db = window.openDatabase("Database001", "1.0", "DDD", 200000);
//run the database
db.transaction(LocalDB_Create, errorLDB, successLDB);
}


var LocalDB_Create = function(tx){
tx.executeSql('CREATE TABLE IF NOT EXISTS DDData(id INTEGER PRIMARY KEY AUTOINCREMENT, ddname TEXT, ddinfo TEXT)');	//dd_value DECIMAL
}


var Initialize_Insert = function(){
var db = window.openDatabase("Database001", "1.0", "DDD", 200000);
db.transaction(LocalDB_Insert, errorCB);
}

var LocalDB_Insert = function(tx){
tx.executeSql('INSERT INTO DDData (ddname,ddinfo) VALUES ("First name", "First row")');
tx.executeSql('INSERT INTO DDData (ddname,ddinfo) VALUES ("Second name", "Second row")');
tx.executeSql('INSERT INTO DDData (ddname,ddinfo) VALUES ("Third name", "Third row")');
//t.executeSql('insert into diary(title,body,published) values(?,?,?)', [data.title, data.body, new Date().getTime()];

alert('INSERT DONE');
 
}

var LocalDB_Update = function(cc){

}

var LocalDB_Delete = function(cc){

}


var Initialize_Display = function(){
var db = window.openDatabase("Database001", "1.0", "DDD", 200000);
db.transaction(Process_Display, errorCB);
}

var Process_Display = function(tx){
tx.executeSql('SELECT * FROM DDData', [], LocalDB_Display, errorCB);
alert('all done. the last result show be displayed')
}

var LocalDB_Display = function(tx, results){
        var len = results.rows.length;
		//        console.log("DEMO table: " + len + " rows found.");
		$( ".container" ).append( "<div>DEMO table: " + len + " rows found.</div>" );

        for(var i=0; i<len; i++){
        //console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
 		$( ".container" ).append( "<div>Row = " + i + " ID = " + results.rows.item(i).id + " Name =  " + results.rows.item(i).ddname + " Info" + results.rows.item(i).ddinfo + "</DIV>" );
        }	
}


var successLDB = function() {
alert("Database created");
}


var errorLDB = function(err) {
alert("Error processing SQL: "+err.code);
}

////////////


function populateDB(tx) {
         tx.executeSql('DROP TABLE IF EXISTS DEMO');
         tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
         tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
         tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
    }

    // Transaction error callback
    //
    function errorCB(err) {
        console.log("Error processing SQL: "+err.code);
    }

    // Transaction success callback
    //
    function successCB() {
        alert("success, database created!");
		
		//QUERY DB
		var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
        db.transaction(queryDB, errorCB);
    }

    // Query the database
    function queryDB(tx) {
        tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
		
		alert('all done. the last result show be displayed')
    }
	
	
	    // Query the success callback
    //
    function querySuccess(tx, results) {
        var len = results.rows.length;
		//        console.log("DEMO table: " + len + " rows found.");
		$( ".container" ).append( "<div>DEMO table: " + len + " rows found.</div>" );

        for(var i=0; i<len; i++){
        //console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
 		$( ".container" ).append( "<div>Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data + "</DIV>" );
        }
    }