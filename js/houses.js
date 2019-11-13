/*global WildRydes _config*/

var WildRydes = window.WildRydes || {};
WildRydes.map = WildRydes.map || {};
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

(
    function rideScopeWrapper($) {
        var authToken;
        WildRydes.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
            requestStudents();
        } else {
            window.location.href = 'signin.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = 'signin.html';
    });
    function requestStudents() {
        var user;
        var houses;
        $.ajax({
            method: 'GET',
            url: _config.api.invokeUrl + '/houses/get/houses',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: authToken
            },
            contentType: 'application/json',
            success: function (res) {
                user = res.user;
                houses = res.houses;
                document.getElementById('houses').appendChild(makeListFromHouses(houses));
                document.getElementById('user').appendChild(makeUserElement(user));
            },
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 401) {
                    window.location.href = '401.html';
                }
                console.error('Error requesting Students: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
            }
        });
    }

    function makeListFromHouses(houses) {
        var list = document.createElement('ul');

        for(var i = 0; i < houses.length; i++) {
            // Create the list item:
            var item = document.createElement('li');
            item.style.color = 'white';

            // Set its contents:
            // Set its contents:
            var textDiv = document.createElement("div");
            textDiv.style.color = 'white';
            textDiv.style.fontSize = '45px';
            textDiv.style.fontFamily = 'HarryPotter';
            var textNode = document.createTextNode(houses[i]);
            textDiv.appendChild(textNode);
            item.appendChild(textDiv);

            // Add it to the list:
            list.appendChild(item);
        }



        // Finally, return the constructed list:
        return list;
    }

    function makeUserElement(user) {
        var div = document.createElement('div');
        div.style.fontFamily = "HarryPotter";
        var innerDiv = document.createElement('div');
        var helloDiv = document.createElement('div');
        var studentsDiv = document.createElement('div');
        var br = document.createElement('br');
        innerDiv.style.color = 'white';
        innerDiv.style.fontSize = '60px';
        innerDiv.style.display = 'flex';
        innerDiv.style.flexDirection = 'column';
        innerDiv.style.flexDirection = 'column';
        helloDiv.appendChild(document.createTextNode(`Hello, ${user}!`));
        studentsDiv.appendChild(document.createTextNode("The Houses at Hogwarts are:"));
        innerDiv.appendChild(helloDiv);
        innerDiv.appendChild(br);
        innerDiv.appendChild(studentsDiv);
        div.appendChild(innerDiv);
        div.style.margin = '30px';
        return div
    }



}(jQuery)
);

