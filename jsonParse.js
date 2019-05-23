function load() {
    // loadData();
}

function loadData() {
    var xmlhttp = new XMLHttpRequest();
    var jsonArray=[];
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonObj= JSON.parse(xmlhttp.response);
            console.log(jsonObj);
            console.log(xmlhttp.response);
            populateTable(jsonObj);
        }
    };
    xmlhttp.open("GET", "http://localhost:7000/books", true);
    xmlhttp.send();
}

function populateTable(jsonObj) {
    document.getElementById("data").innerHTML = jsonObj[0].Nombre;
    var col = [];
    for (let index = 0; index < jsonObj.length; index++) {
        for (var key in jsonObj[index]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    var table = document.createElement("table");
    var tr = table.insertRow(-1);
    for (var i = 0; i < col.length-3; i++) {
        var th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }
    for (var i = 0; i < jsonObj.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 0; j < col.length-3; j++) {
            var cell = tr.insertCell(-1);
            cell.innerHTML = jsonObj[i][col[j]];
        }
    }
    document.getElementById("data").innerHTML = "";
    document.getElementById("data").appendChild(table);
    table.className = "tablecss";
}

function clearData() {
    document.getElementById("data").innerHTML = "";
}

function IrNuevo(){
    window.location.href='/nuevo_libro.html';
}
function IrEditar()
{
    window.location.href='/editar.html';
}
function editar()
{
    console.log("NADA");
}