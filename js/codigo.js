$("#panel").panel();
$("#panel").enhanceWithin();

$("#btnBuscar").click(buscarPelicula);

$( document ).ready(function() {
    $.mobile.defaultPageTransition = 'none';
});


function buscarPelicula(){
    var _texto = $("#txtPelicula").val();
    
    $.ajax({
        url: "https://api.themoviedb.org/3/search/movie",
        dataType: "json",
        type: "get",
        data: {
            query:_texto,
            api_key: "0d13cbb13af31d53ca30550020660e13"
        },
        success: verResultados
    });
}

function verResultados(_res){
    $("#divRes").empty();
    for (var i = 0; i < _res.results.length; i++) {
        var _anio = _res.results[i].release_date;
        var _img = "https://image.tmdb.org/t/p/w92/" + _res.results[i].poster_path;
        var _idPeli = _res.results[i].id;
        $("#divRes").append("<div data-idPeli = " + _idPeli + "><img src=" + _img + ">"
            + '<p>Title: <strong>' + _res.results[i].title + 
            '</p></strong><p>Release date: <strong>' + _res.results[i].release_date +
            '</p></strong><p>IMDB average: <strong>' + _res.results[i].vote_average +
            '</p></strong></div><hr>');
    }
    $("#divRes>div").click(detalles);
    $(":mobile-pagecontainer").pagecontainer("change","#pResultados");
}

function detalles(_e){
    var _idPeli = $(_e.currentTarget).attr("data-idPeli");
    var _url = "https://api.themoviedb.org/3/movie/";
    $.ajax({
        url: _url + _idPeli,
        dataType: "json",
        type: "get",
        data: {
            api_key: "0d13cbb13af31d53ca30550020660e13",
            append_to_response: "images"
        },
        success: verDetalles
    });
    
}

function verDetalles(_peli){
    $("#divDetalles").empty();
    var _html = "<h1>" + _peli.title + "</h1>";
    _html += "<h2>" + _peli.tagline + "</h2>";
    
    var _cantEst = _peli.vote_average;
    _cantEst = Math.ceil(_cantEst);
    var cantResto = 10 - _cantEst;
    
    var vacia = "<img class='estrellita' src='img/estrella_vacia.png'>";
    var llena = "<img class='estrellita' src='img/estrella_llena.png'>";
    while (_cantEst > 0){
        _html += llena;
        _cantEst --;
    }
    while (cantResto > 0){
        _html += vacia;
        cantResto --;
    }
    _html += "<br><br>";
    for (var i = 0; i < _peli.images.posters.length; i++) {
        _html += "<img src=https://image.tmdb.org/t/p/w500/" + _peli.images.posters[i].file_path + "><br>";
    }
    
    $("#divDetalles").append(_html);
    $(":mobile-pagecontainer").pagecontainer("change","#pDetalles");
}



