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
        var students;
        $.ajax({
            method: 'GET',
            url: _config.api.invokeUrl + '/wizards/get/wizards',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: authToken
            },
            contentType: 'application/json',
            success: function (res) {
                user = res.user;
                students = res.students;
                document.getElementById('students').appendChild(makeListFromStudents(students));
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

    function makeListFromStudents(students) {
        var list = document.createElement('ul');

        for(var i = 0; i < students.length; i++) {
            // Create the list item:
            var item = document.createElement('li');

            // Set its contents:
            var h1 = document.createElement("H3");
            h1.style.color = 'white';
            h1.appendChild(document.createTextNode(students[i]));
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
        h1.appendChild(document.createTextNode(`Hello ${user} !`));
        h2.appendChild(document.createTextNode("The students are:"));
        div.appendChild(h1);
        div.appendChild(h2);
        return div
    }



}(jQuery)
);

