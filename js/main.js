
$(document).ready(function(){

    
// VARIABLES GLOBALES

var divisa = "§";     // Divisa de los productos
var idProducto = $("#pagina-producto > section:first-of-type").attr("ID");
var idCategoria = $("#pagina-categoria .lista-productos>ul").attr("ID");
var sliderLimit = 10; // Límite de productos que van a popular el slider.

// CARGAR HEADER Y FOOTER

$('#footer').load('components/navigation.html #loadFooter'); // Footer

$('#header').load('components/navigation.html #loadHeader', function(){ // Header
    // Esto añade el script del megamenú después de que cargue el header.
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/mega-menu/megamenu.js";
    $("body").append(s);        
});

// SLIDER GLIDE. CAROUSEL IMÁGENES
if ($("#carousel").length > 0) {
    sliderImg(".glide");
}


// LLAMADAS JSON
$.getJSON("js/lista-productos.json", function (data) {
   // Llamada a página de producto
   if ($("#pagina-producto").length > 0) {
        insertPageProducts(`#${idProducto}`, data.filter(producto => producto.id == idProducto));  
     }

    // Llamada a página de categorías
    if($("#pagina-categoria").length>0) {
       insertPageCategory(`#${idCategoria}`, 
       data.filter(producto => producto.tipo.includes(idCategoria)));
    }

    // Llamada a las ofertas 
    if ($("#ofertas-home").length > 0) {
        insertProducts("#ofertas-home .product-list", ".glide-prod1", data.filter(producto => producto.descuento > 0));
    }
   // Llamada a los populares
   if ($("#populares-home").length > 0) {
        insertProducts("#populares-home .product-list", ".glide-prod2", data.filter(producto => producto.popularidad > 0));
    }

    // Llamada a los similares
    if ($("#similares-producto").length > 0) {
        insertProducts("#similares-producto .product-list", ".glide-prod3", data.filter(producto => producto.tipo.includes(categoriasSimilares(idProducto))));

        function categoriasSimilares (id) {
            var categoriaPrincipal = data[idProducto].tipo[0];
            return categoriaPrincipal;
        } 
    }

});


// =========== FUNCIONES ==============

// COOKIES
var c;
var d;
// Comprobar si hay cookie cuando el documento está ready.
if(readCookie("contador")===null) {
    // Si no hay cookie, se crea una con valor 0.
    c=0;
    createCookie("contador", c, 1); // crear cookie
    
    d = parseInt(readCookie("contador"));
    

} else { // Su ya existe una cookie, se lee su valor y se muestra en el icono del carrito.
    // Cuando ajaxComplete porque el menú se carga con load().
    console.log("entered read else");
    $(document).ajaxComplete(function(){
        if (readCookie("contador")!= 0) { // Si el valor esdiferente a 0, significa que ya hay cookie.
            //Metemos el valor en una variable d y la mostramos en el html del carrito.
            d = parseInt(readCookie("contador"));
            // Estilos
            $(".num-carrito").html(d);
            $(".num-carrito").css({"background":"red", "color":"white"});

        } else {
            d = parseInt(readCookie("contador"));
        }
    });
}

//  Contador cart
$(document).on("click", ".boton-carrito", function() {
    d++;
    createCookie("contador", d, 1)
    d = parseInt(readCookie("contador"));
    // Estilos
    $(".num-carrito").html(d);
    $(".num-carrito").css({"background":"red", "color":"white"});

    // Mensaje producto añadido
    var pa = "<div class='product-added'>Producto añadido en el carrito</div>"
    $("#wrapper").append(pa);

    setTimeout(function(){
        $(".product-added").fadeIn("fast", callback);
    }, 0);

    function callback() {
        setTimeout(function() {
        $(".product-added").fadeOut();
        }, 1000 );
    };
    
});

// Create cookie
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

// Read cookie
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

// Delete cookie
function eraseCookie(name) {
    createCookie(name,"",-1);
    console.log("deleted");
}

// Sacar la media de las puntuaciones de las opiniones
function damePuntuacionMedia(data, esto) {
    var puntuaciones = 0;
    var sum = 0;
    $.each(esto.opiniones, function (e, l) {
        puntuaciones += this.puntuacion;
        sum ++;
    });
    var puntuacionFinal = puntuaciones/sum;
return puntuacionFinal;

}

// Estrellitas
function dameEstrellitas (numero) {
    var e = "";
    var resto = 5-numero;
    
    if(Number.isInteger(numero) == true) {
        for (i=0;i<numero;i++) {
            e += "<span class='material-icons'>star</span>"
        }
        for (i=0;i<resto;i++) {
            e += "<span class='material-icons'>star_border</span>"
        }

    } else {
        for (i=0;i<numero-1;i++) {
            e += "<span class='material-icons'>star</span>"
        }
        e += "<span class='material-icons'>star_half</span>"

        for (i=0;i<resto-1;i++) {
            e += "<span class='material-icons'>star_border</span>"
        }
    }
    return e;
}

// Precios
function damePrecio(precio, descuento, extra) {
    var precioExtra = (precio+precio*(extra/10)).toFixed(2);
    var precioDescuento = (precioExtra-precioExtra*(descuento/10)).toFixed(2);
    var precioFinal;
    if (descuento > 0) {
        precioFinal = `
            <p class="precio-tachado">${precioExtra}${divisa}</p>
            <p class="precio-rebajado">${precioDescuento}${divisa}</p>
        `
    } else {
        precioFinal = `
        <p class="precio-normal">${precioExtra}${divisa}</p>
        `
    }
    return precioFinal;
}

function latinName(esto) {
    
    if(esto.hasOwnProperty("nombreLatin")) {
        return `<p class="smaller">${esto.nombreLatin}</p>`;
    } else {
        return "<p></p>";
    }
}

// Página de producto
function insertPageProducts(selector_container, data) {
    var producto = "";
    
    $.each(data, function (k, v) {
        
        producto += `
        <div id="ficha">
        <div>
        <div id="foto-producto">
            <img src="${this.imagen}" alt="craneo de draconino">
        </div>
        <div class="info-producto">
            <h1>${this.nombre}</h1>
            <div class="estrellitas">
                ${dameEstrellitas(damePuntuacionMedia(data, this))}
            </div>
            <p>${this.descripcionCorta}</p>
            <p class="bold">Especies disponibles:</p>
        `
        $.each(v.variedades, function (l, m) {
            var variedades = "";
            variedades += `
            <div class="variedades-producto">
                <div class="lista-carrito">							
                    <div><img src="img/mini-producto.png" alt="Especie Draconino"></div>
                    <div>
                        <p>${this.nombre}</p>
                        ${latinName(this)}
                        
                    </div>
                    <div>

                        ${damePrecio(data[k].precio, data[k].descuento, this.extraPrecio)}
                        <button class="boton-carrito">Añadir</button>
                    </div>
                </div>

            </div>`
            producto = producto + variedades;
        });

        producto += `</div></div>
      
        <div class="descripcion">
            ${this.descripcionLarga}
        
        </div>`

        $(selector_container).html(producto);

        var opiniones = "";
        $.each(v.opiniones, function (o, p) {
           
            opiniones += `
            <div class="lista-opiniones">
				<div>
                    <div class="estrellitas">
                    ${dameEstrellitas(this.puntuacion)}
                        
					</div>
					<p>${this.nombre}</p>
					<p class="smaller">${this.fecha}</p>

				</div>
				<div>
					<p>${this.titulo}</p>
					<p class="smaller">${this.comentario}</p>
				</div>
            </div>`
            
        });
 
        $("#lista-opiniones").html(opiniones);
    });
}

// Página de categoría
function insertPageCategory(selector_container, data) {
    var producto = "";
    $.each(data, function (k, v) {
        producto += `
        <li>
            <article>
                <a class='product-url' href=${this.url}>
                    <div>
                        <div class='img-container product-image'>
                        <img class="icon" src=${this.imagen} alt="Imagen roducto">
                        </div>
                        <div><h3 class="product-name">${this.nombre}</h3></div>

                    </div>
                    <div class="precios">
                        <div class="estrellitas">
                        
                        ${dameEstrellitas(damePuntuacionMedia(data, this))}
 
                        </div>

                        ${damePrecio(data[k].precio, data[k].descuento, 0)}

                    </div>
                </a>
                <button class="boton-carrito">Añadir</button>
            </article>
        </li>
    `

    });

    $(selector_container).html(producto);

};

// Productos en sliders con Glide
function insertProducts(selector_container, selector_slider, data) {
    var producto = "";
    $.each(data, function (k, v) {
        producto += `
        <li class='glide__slide'>
            <article>
                <a class='product-url' href=${this.url}>
                    <div>
                        <div class='img-container product-image'>
                        <img src=${this.imagen} alt="Publicidad slider">
                        </div>
                        <div><h3 class="product-name">${this.nombre}</h3></div>

                    </div>
                    <div class="precios">
                        <div class="estrellitas">
                        ${dameEstrellitas(damePuntuacionMedia(data, this))}
                        </div>

                        ${damePrecio(data[k].precio, data[k].descuento, 0)}

                    </div>
                </a>
                <button class="boton-carrito">Añadir</button>
            </article>
        </li>
    `

    });

    $(selector_container).html(producto);
    sliderProd(selector_slider);
};

// Configuración Sliders
// Imágenes
function sliderImg(clase) {
    var sliderConfig = {
        type: "carousel",
        startAt: 0
    }
    new Glide(clase, sliderConfig).mount()
}
// Productos
function sliderProd(clase) {
    var sliderConfig = {
        type: "carousel",
        startAt: 0,
        breakpoints: {
            500: {
                perView: 1
            },
            650: {
                perView: 2
            },
            800: {
              perView: 3
            },
            10000: {
                perView: 4
              }
          }
    }
    new Glide(clase, sliderConfig).mount()
}

// INICIO FORMULARIOS =_=_=_=_=_=_=_=_=_=_=_=_=

// Variables Regex
var regex = {
    name: /[^0-9]+$/i,
    email: /^((([!#$%&'*+\-\/=?^_`{|}~\w])|([!#$%&'*+\-\/=?^_`{|}~\w][!#$%&'*+\-\/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-\/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/,
    tel: /^[0-9]*$/,
    adress: /[\s\S]*/i,
    postalcode: /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/,
    country: /[^0-9]+$/i,
    asunto: /[\s\S]*/i,
    mensaje: /[\s\S]*/i,
}

// MONSTRUOS A LA CARTA
// Función de foco
$(".datos input").blur(function(){validation(this)});

// Función de submit
$("#alacarta").submit(function(){
    var aviso = "<p>Por favor, rellena los datos, selecciona al menos un elemento de la lista y acepta la política de privacidad.</p>";
    $(".datos input").each(function (){
        if(validation(this) == false) {
            event.preventDefault();
            $(".mensaje-aviso").html(aviso);
            console.log("datos");
        }
    });

   // Checkbox
    if ($(".checkbox input[type='checkbox']:checked").length == 0) {
        event.preventDefault();
        $(".mensaje-aviso").html(aviso);

    }
       
    if ($(".terminos input[type='checkbox']:checked").length == 0) {
        event.preventDefault();
        $(".mensaje-aviso").html(aviso);
        $(".terminos > span").css("visibility", "visible");

    }

    
});

// NEWSLETTER

$(document).on("click", ".opciones-newsletter input[type='checkbox']", function(){

if ((".opciones-newsletter input[type='checkbox']:checked").length > 0) {
    $(".form-content p > span").css("visibility", "hidden");
}
});
$(document).on("submit", "#newsletter", function(){
    
    if(validacionRegex("#emailnews", regex.email) == false || validacionVacio("#emailnews")==false) {
        event.preventDefault();
        $("footer .mail-input span").css("color", "red");
        $("#emailnews").css("border-color", "red");
        
    }

    if ($(".opciones-newsletter input[type='checkbox']:checked").length == 0)  {
        event.preventDefault();
        $(".form-content p > span").css("visibility", "visible");
    }
});


// CONTACTO
$("#contacto-form li >*").focusout(function(){validation(this)});
$("#contacto-form").submit(function(){

    $("#contacto-form li > *").each(function (){
        if(validation(this) == false) {
            event.preventDefault();
           $("#contacto-aviso").css("visibility", "visible");
            console.log(this);
            console.log(validation(this));
        }

    });

    if ($("#contacto-form input[type='checkbox']:checked").length == 0)  {
        event.preventDefault();
        $("#contacto-form span").css("color", "red");
        $("#contacto-aviso").css("visibility", "visible");
    }

});

// Funciones básicas
// Función de validación
function validation(esto) {
    if(validacionRegex(esto, regex[`${esto.id}`]) == false || validacionVacio(esto)==false) {
       // $(esto).prev().css("visibility", "visible");
        $(esto).css({"color": "red", "border-color": "red"});
       
        return false;

    } else {
        // $(esto).prev().css("visibility", "hidden");
        $(esto).css({"color": "inherit", "border-color": "inherit"});
        
        return true;
    }
}

// Validación Regex
function validacionRegex(esto, regexP) {
    var valor = $(esto).val();
    var v = regexP.test(valor);
    return v;
}
// Validación inputs vacíos
function validacionVacio(esto) {
    var valor = $(esto).val();
    if(valor) {
    return true;
} else {
    return false;
}
}

// API MAPA =_=_=_=_=_=_=_=_=_=

if ($("#contacto").length>0) {
    var map = new ol.Map({
        target: 'map',
        layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
        ],
        view: new ol.View({
        center: ol.proj.fromLonLat([25.209503, 47.101914]),
        zoom: 10
        })
    });
}

// POPUP

$(window).scroll(function(){
    if(readCookie("popup")===null) { // Comprobar si hay cookie de popup
        if(($(document).scrollTop()>=$(document).height()/5)) {
            $(".popup, #popup").show();
    };
};
});

$(".cerrar, .popup a").click(function(){
    createCookie("popup", 1, 1); // crear cookie
    $(".popup, #popup").hide();
   
});

// Mouseover effect

$(document).ajaxComplete(function(){
    $(".variedades-producto .lista-carrito").mouseover(function(){
        $(this).css("border", "2px solid grey");
    });

    $(".variedades-producto .lista-carrito").mouseout(function(){
        $(this).css("border", "2px solid transparent");
    });

    
});


}); // FIN DOCUMENT.READY