window.addEventListener('load', obtenerNombresArchivos);

openPdfBtn= document.getElementById("openPdfBtn")
var lista = [];
var URL = "./bills-pdf"

function obtenerNombresArchivos() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "./bills-pdf", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var listaArchivos = obtenerListaArchivos(xhr.responseText);
      console.log(listaArchivos);
    }
  };
  xhr.send();
}
/*
function obtenerNombresArchivos() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', './bills-pdf/', true);

  xhr.onload = function() {
    if (xhr.status === 200) {
      var nombresArchivos = [];
      var listaArchivos = xhr.responseXML.getElementsByTagName('a');
      for (var i = 0; i < listaArchivos.length; i++) {
        var nombreArchivo = listaArchivos[i].textContent;
        if (nombreArchivo !== '' && nombreArchivo !== 'pdfs/') {
          if (nombreArchivo.endsWith('.pdf')) {
            nombresArchivos.push(nombreArchivo);
          }
        }
      }
      console.log(nombresArchivos);
    } else {
      console.error('Error al obtener la lista de archivos');
    }
  };

  xhr.send();
}
*/
function obtenerListaArchivos(respuesta) {

  var inicio = respuesta.indexOf("<body>") + 6;
  var fin = respuesta.indexOf("</body>");
  var contenido = respuesta.substring(inicio, fin);
  var elementos = contenido.split("<a");
  for (var i = 1; i < elementos.length; i++) {
    var href = elementos[i].match(/href="(.*?)"/)[1];
    var nombreArchivo = href.substring(href.lastIndexOf("/") + 1);

    if (nombreArchivo !== '' && nombreArchivo !== 'pdfs/') {
      if (nombreArchivo.endsWith('.pdf')) {
        lista.push(nombreArchivo);
      }
    }
    
  }
  return lista;
}

function abrirElSiguiente() {
  
}

openPdfBtn.addEventListener("click", cargarSiguienteArchivo)

function cargarSiguienteArchivo() {
  var primerArchivo = lista[0];
  console.log(lista);
  console.log(primerArchivo);
  var iframe = document.getElementById('pdf-iframe');
  iframe.setAttribute('src', 'bills-pdf/' + primerArchivo);
  lista.shift();
}