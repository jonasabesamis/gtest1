/*
Local DB

#dduser TABLE
- user info
- 

#ddinfo
- random for now


#ddproduct
- 
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
}



///////////

var Initialize_Insert2 = function(Dat){
var db = window.openDatabase("Database001", "1.0", "DDD", 200000);
db.transaction(function(t) { 
t.executeSql('INSERT INTO DDData (ddname,ddinfo) values(?,?)', [Dat['one'], Dat['two']]);}, errorCB);
}

var Initialize_Insert2 = function(Dat){
var db = window.openDatabase("Database001", "1.0", "DDD", 200000);
db.transaction(function(t) { 
t.executeSql('INSERT INTO DDData (ddname,ddinfo) values(?,?)', [Dat['one'], Dat['two']]);}, errorCB);
}

var Initialize_Edit3 = function(Dat){

/*
$( ".ddslate" ).html( "" );
$( ".ddslate" ).append( "<div>"+ Dat['one'] +"</div>" );
$( ".ddslate" ).append( "<div>"+ Dat['two'] +"</div>" );
$( ".ddslate" ).append( "<div>"+ Dat['three'] +"</div>" );
*/

var db = window.openDatabase("Database001", "1.0", "DDD", 200000);
db.transaction(function(t) { 
t.executeSql('UPDATE DDData SET ddname = ?, ddinfo = ? WHERE id = ?', [Dat['one'], Dat['two'], Dat['three']]);}, errorCB);

Initialize_Display();	
}




var InitEdit = function(IEv){
var db = window.openDatabase("Database001", "1.0", "DDD", 200000);
db.transaction(function(t) 
{ t.executeSql('SELECT * FROM DDData WHERE id= ?', [IEv],Edit_Display,errorCB);}, errorCB);
}

var Edit_Display = function(tx, results){

var len = results.rows.length;
var i=0;
		
$( ".ddslate" ).html( "" );
$( ".ddslate" ).append( '<h1>New Form</h1>' );
$( ".ddslate" ).append( '<div class="fform"><form name="ff">' );
$( ".ddslate" ).append( '<label class="ddlabel001">Name<input type="text" name="NameX" id="NameX" class="ddfield001"></label>' );
$( ".ddslate" ).append( '<label class="ddlabel001">Info<input type="text" name="InfoX" id="InfoX" class="ddfield001"></label>' );
$( ".ddslate" ).append( '<label class="ddlabel001">ID<input type="text" name="IDX" id="IDX" class="ddfield001"></label>' );

$( ".ddslate" ).append( '</form><button onClick="EDIT();return false" class="ddbutton001">SUBMIT</button></div>' );

$("#NameX").val(results.rows.item(i).ddname);
$("#InfoX").val(results.rows.item(i).ddinfo);
$("#IDX").val(results.rows.item(i).id);

}

var InitDelete = function(IEv){
	
	
var db = window.openDatabase("Database001", "1.0", "DDD", 200000);
db.transaction(function(t) 
{ t.executeSql('DELETE FROM DDData WHERE id=?',[IEv]);}, errorCB);

$( ".ddslate" ).html( "" );

}



var LocalDB_Insert2 = function(tx,Dat){

alert('pasok dito')	

Dat['one'] = $("#NameX").val();
Dat['two'] = $("#InfoX").val();

$("#NameX").val('');
$("#InfoX").val('');

$( ".ddslate" ).html( "" );
$( ".ddslate" ).append( "<div>"+ Dat['one'] +"</div>" );
$( ".ddslate" ).append( "<div>"+ Dat['two'] +"</div>" );

}




var ADD = function(){
var Dat = [];

Dat['one'] = $("#NameX").val();
Dat['two'] = $("#InfoX").val();

$("#NameX").val('');
$("#InfoX").val('');
$( ".container" ).append( "<div>"+ Dat['one'] +"</div>" );
$( ".container" ).append( "<div>"+ Dat['two'] +"</div>" );

Initialize_Insert2(Dat)
}


var EDIT = function(){
var Dat = [];

Dat['one'] = $("#NameX").val();
Dat['two'] = $("#InfoX").val();
Dat['three'] = $("#IDX").val();

$( ".ddslate" ).html( "" );

Initialize_Edit3(Dat)
}



///////////
//Initialize new page for inssert

var Initialize_NewData = function(){
$( ".ddslate" ).html( "" );
$( ".ddslate" ).append( '<h1>New Form</h1>' );
$( ".ddslate" ).append( '<div class="fform"><form name="ff">' );
$( ".ddslate" ).append( '<label class="ddlabel001">Name<input type="text" name="NameX" id="NameX" class="ddfield001"></label>' );
$( ".ddslate" ).append( '<label class="ddlabel001">Info<input type="text" name="InfoX" id="InfoX" class="ddfield001"></label>' );
$( ".ddslate" ).append( '</form><button onClick="ADD();return false" class="ddbutton001">SUBMIT</button></div>' );
}





////

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
}

var LocalDB_Display = function(tx, results){
        var len = results.rows.length;
		//        console.log("DEMO table: " + len + " rows found.");
		
		$( ".ddslate" ).html( "" );
		
		$( ".ddslate" ).append( "<div>DEMO table: " + len + " rows found.</div>" );

        for(var i=0; i<len; i++){
        //console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
 		$( ".ddslate" ).append( "<div class='ddlink001' onclick='InitEdit(\""+results.rows.item(i).id+"\")'>" + results.rows.item(i).id + " | Name : " + results.rows.item(i).ddname + "| Info : " + results.rows.item(i).ddinfo + "</div>" );
        }	
}


/////////////////
//LIST DELETE

var List_Delete = function(){
var db = window.openDatabase("Database001", "1.0", "DDD", 200000);
db.transaction(Process_DList, errorCB);
}

var Process_DList = function(tx){
tx.executeSql('SELECT * FROM DDData', [], LocalDB_DList, errorCB);
}

var LocalDB_DList = function(tx, results){
        var len = results.rows.length;
		//        console.log("DEMO table: " + len + " rows found.");
		
		$( ".ddslate" ).html( "" );
		
		$( ".ddslate" ).append( "<div>Click to delete</div>" );

        for(var i=0; i<len; i++){
        //console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
 		$( ".ddslate" ).append( "<div class='ddlink001' onclick='InitDelete(\""+results.rows.item(i).id+"\")'>" + results.rows.item(i).id + " | Name : " + results.rows.item(i).ddname + "| Info : " + results.rows.item(i).ddinfo + "</div>" );
        }	
}




/////

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
	
	
	
	