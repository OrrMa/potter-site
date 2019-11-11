"use strict";
! function() {
    var n = $("html"),
        t = function() {
            $(".btn-menu").on("click", function(t) {
                t.preventDefault(), n.toggleClass("menu-opened")
            })
        },
        e = function() {
            t()
        };
    e()
}();


! function() {
    var url =document.URL;
    var splitedUrl = url.split("#");
    if(splitedUrl.length > 1) {
        var parameters = splitedUrl[1].split("&");
        for(var i=0; i< parameters.length; i++) {
            var token = parameters[i];
            var splited_token = token.split("=");
            if(splited_token[0] === "id_token"){
                var finalToken = splited_token[1];
                console.log(finalToken);
                window.localStorage.setItem("SAML-ID-TOKEN", finalToken);
            }
        }
    }
}();
