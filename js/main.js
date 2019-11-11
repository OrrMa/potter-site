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


// ! function() {
//     var url =document.URL;
//     var splitedUrl = url.split("#");
//     if(splitedUrl.length > 1) {
//         var parameters = splitedUrl.split("&");
//         for(var i=0; i< parameters.length; i++) {
//
//         }
//     }
// }();

! function onLoad() {
    var auth = initCognitoSDK();
    var curUrl = window.location.href;
    auth.parseCognitoWebResponse(curUrl);
}();
