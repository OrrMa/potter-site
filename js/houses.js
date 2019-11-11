/*global WildRydes _config*/

var WildRydes = window.WildRydes || {};
WildRydes.map = WildRydes.map || {};

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

            // Set its contents:
            var h1 = document.createElement("H1");
            h1.appendChild(document.createTextNode(houses[i]));
            item.appendChild(h1);

            // Add it to the list:
            list.appendChild(item);
        }

        // Finally, return the constructed list:
        return list;
    }

    function makeUserElement(user) {
        var div = document.createElement('div');
        var h1 = document.createElement('H1');
        var h2 = document.createElement('H1');
        h1.appendChild(document.createTextNode(`Hello - ${user},`));
        h2.appendChild(document.createTextNode("The houses are:"));
        div.appendChild(h1);
        div.appendChild(h2);
        return div
    }



}(jQuery)
);

