
//Comprueba si el navegador soporta filereader de HTML5
function handleFiles(files)
{
    if(window.FileReader)
    {
        getAsText(files[0])
    } else {
        alert('File reader not supporter in browser.');
    }
}
function getAsText (fileToRead){
    let reader = new FileReader();
    reader.onload = loadHandler
    reader.onerror = errorHandler
    //Lee el archivo en memoria como UTF-8
    reader.readAsText(fileToRead)
}
function loadHandler (event){
    let csv = event.target.result
    processData(csv)
}


function processData(csv){
    let allTextLines = csv.split(/\r\n|\n/);
    var lines = []
    while(allTextLines.length){
        lines.push(allTextLines.shift().split(','))
    }
    console.log(lines)
    drawOutput(lines)
}


function errorHandler(evt){
    if(evt.target.error.name == "NotReadableError"){
        alert('Cannot read file!');
    }
}

function drawOutput(lines){
    //Limpia texto ya existente
    document.getElementById("output").innerHTML="";

    var table = document.createElement("table")
    for(var i = 0 ; i<lines.length;i++){
        var row = table.insertRow(-1)
        for(var j = 0; j< lines[i].length;j++){
            var firstNameCell = row.insertCell(-1)
            firstNameCell.appendChild(document.createTextNode(lines[i][j]))

        }
    }

    document.getElementById("output").appendChild(table);
}