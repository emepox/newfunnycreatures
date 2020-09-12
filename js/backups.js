

//======================================= BACKUPS ========================================//
/*
ON LOAD FADEIN

$(window).on("load", function (){
    $('#preloader').fadeOut('slow', function () {
      $(this).remove();
    });
  });

/* -- Función en flecha: function (a) { return expresión; })
    Ejemplo:
        data.filter(producto => producto.descuento > 0)
        -- Es lo mismo que:
        data.filter(function(producto) {
            return producto.descuento > 0
        });



  ---- productos en sliders ----- 

    $.getJSON("js/lista-productos.json", function(data) { // Carga el json
        console.log(data);       

            $.each(data, function(k, v) { // hace un for each
                var d = data[k];

                if (d.descuento) {
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
                                        <span class="material-icons">star</span>
                                        <span class="material-icons">star</span>
                                        <span class="material-icons">star</span>
                                        <span class="material-icons">star</span>
                                        <span class="material-icons">star</span>
                                    </div>
                                    <span class="precio-tachado">${this.precio}${divisa}</span>
                                    <span class="precio-rebajado">${this.precio-(this.descuento/100*(this.precio))}${divisa}</span>
                                </div>
                            </a>
                            <button class="boton-carrito">Añadir</button>
                        </article>
                    </li>
                `
                }
            });
            
            $(".product-list").html(producto);
            sliderProd("#ofertas-home .glide-prod");
            sliderProd("#populares-home .glide-prod");
    });
---------------------

    function anadir_producto(p, d) {
        return p + "...$ {d.abcd}..."
    }

    producto = "";

    $.each... {
        d = data[k]
        producto = anadir_producto(producto, d);
    }
    $(."product-list").html(producto);

    ----------------------------

    function anadir_producto(p, d) {
        return p + "...$ {d.abcd}..."
    }

    producto = "";
    
    $.each... {
        d = data[k]
        producto = anadir_producto(producto, d);
    }
    $(."product-list").html(producto);

    

BACKUPS
=================================================================================
PRODUCTOS

    Tipo: monstruo, alimento, contencion, laboratorio
    Parte: cabeza, carcasa, superior, inferior, organos, accesorios
    
    Monstruo: (terrestre, acuatico, volador)
    Alimento: (carnivoro, herbivoro, omnivoro, otros)
    Contencion: (jaulas, cadenas, acuarios, aviarios)
    Laboratorio: (ensamblaje, material)

    extraPrecio: numero entre 1-5


$.getJSON("js/lista-productos.json", function(data) {
    var producto = "";
    // console.log(data);
    $.each(data, function(k, v) {
        $.each(v.variedades, function(k, v){
            // console.log(v.nombre);
        });
        var d = data[k];
        //console.log(v.variedades.nombre);
    
        producto += "<div>"+d.nombre+"</div>"

    });

    $("#testing").append(producto);
});


--------------------------------


    function populateProducts() {
        var sliderLimit = 10; // Límite de productos que van a popular el slider.
        var producto = "";
        var divisa = "§";
        $.getJSON("js/lista-productos.json", function(data) {
            
            console.log(data);
            $.each(data, function(k, v) {
                var d = data[k];  
                $.each(v.variedades, function(k, v){
                    console.log(v.nombre); // Equivale a v.variedades.nombre
                    
                });
                    producto += "<li class='glide__slide'>";
                    producto += "<article>";
                    producto += `<a class='product-url' href=${d.url}>`;
                    producto += "<div>";
                    producto += "<div class='img-container product-image'>";
                    producto += `<img src=${d.imagen} alt="Publicidad slider">`;
                    producto += "</div>";
                    producto += `<div><h3 class="product-name">${d.nombre}</h3></div>`;
                    producto += `<div class="estrellitas"><span class="material-icons">star</span><span class="material-icons">star</span><span class="material-icons">star</span><span class="material-icons">star</span><span class="material-icons">star</span></div>`
                    producto += "</div>"
                    producto += `<div class="precios">`
                    producto += `<span class="precio-tachado">${d.precio}${divisa}</span>`
                    producto += `<span class="precio-rebajado">${d.precio-(d.descuento/100*d.precio)}${divisa}</span>`
                    producto += "</div></a>"
                    producto += `<button class="boton-carrito">Añadir</button>`
                    producto += "</article></li>";
                
        
            });
        
            $(".product-list").html(producto);
            sliderProd(".glide-prod");

            console.log(producto);
        });

    }
---------------------------------








// Función para cargar assets solo cuando es necesario
/*
function cargaScripts(c, s) {
    
    var o = document.getElementsByClassName(c);
    if(o.length>0) {

        // Comprueba si ya está puesto el script.
        var flag = false;
        var x = document.getElementsByTagName("SCRIPT");
        console.log(x);
        for (i=0;i<x.length;i++){
            console.log("X: "+x[i].src);
            console.log(x[i].src.includes(s));

            if(x[i].src.includes(s)){
                flag = true;
                console.log("flag: "+flag);
            }
        }

        // Si no está, lo añade.
        if (flag == false) {

            // js
            var sc = document.createElement("script");
            sc.type = "text/javascript";
            sc.src = s;
            $("body").append(sc);  

        }
    }
    
}


----------------------

// Página de producto
function insertPageProducts(selector_container, data) {
    var producto = "";
    
    $.each(data, function (k, v) {
        producto += `
        <div>
        <div id="foto-producto">
            <img src="${this.imagen}" alt="craneo de draconino">
        </div>
        <div class="info-producto">
            <h1>${this.nombre}</h1>
            <div class="estrellitas">
                <span class="material-icons">star</span>
                <span class="material-icons">star</span>
                <span class="material-icons">star</span>
                <span class="material-icons">star</span>
                <span class="material-icons">star</span>
            </div>
            <p>${this.descripcionCorta}</p>
            <p>Especies disponibles:</p>
        </div>
        <div class="variedades-producto">
            <div class="lista-carrito">							
                <div><img src="img/mini-producto.png" alt="Especie Draconino"></div>
                <div>
                    <p>Dragón Dorado</p>
                    <p class="smaller">Draconia Regex</p>
                </div>
                <div>
                    <p class="precio-tachado">3.410,98€</p>
                    <p class="precio-rebajado">3.350,99€</p>
                    <button class="boton-carrito">Añadir</button>
                </div>
            </div>
            <div class="lista-carrito">							
                <div><img src="img/mini-producto.png" alt="Especie Draconino"></div>
                <div>
                    <p>Escamanteso Venenoso</p>
                    <p class="smaller">Heloderma Horribilis</p>
                </div>
                <div>
                    <p class="precio-normal">3.523€</p>
                    <button class="boton-carrito">Añadir</button>
                </div>
            </div>
            <div class="lista-carrito">							
                <div><img src="img/mini-producto.png" alt="Especie Draconino"></div>
                <div>
                    <p>Dinodragón Esmeralda</p>
                    <p class="smaller">Arthrobrontochloro Corpulentus</p>
                </div>
                <div>
                    <p class="precio-normal">3.733€</p>
                    <button class="boton-carrito">Añadir</button>
                </div>
            </div>
        </div>
        <div class="descripcion">
            ${this.descripcionLarga}
        </div>
    </div>
        `
    });

    $(selector_container).html(producto);

}




*/
