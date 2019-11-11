"use strict";

var poolData = {
    UserPoolId: _config.cognito.userPoolId,
    ClientId: _config.cognito.userPoolClientId
};

var userPool;

userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

if (typeof AWSCognito !== 'undefined') {
    AWSCognito.config.region = _config.cognito.region;
}

function signOut() {
    userPool.getCurrentUser().signOut();
    window.localStorage.setItem("SAML-ID-TOKEN", null);
}

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
    var url = document.URL;
    var splitedUrl = url.split("#");
    if(splitedUrl.length > 1) {
        var parameters = splitedUrl[1].split("&");
        for(var i=0; i< parameters.length; i++) {
            var token = parameters[i];
            var splited_token = token.split("=");
            if(splited_token[0] === "id_token"){
                var finalToken = splited_token[1];
                window.localStorage.setItem("SAML-ID-TOKEN", finalToken);
            }
        }
    }
}();
