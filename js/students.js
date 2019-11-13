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
            item.style.color = 'white';

            // Set its contents:
            var textDiv = document.createElement("div");
            textDiv.style.color = 'white';
            textDiv.style.fontSize = '45px';
            textDiv.style.fontFamily = 'HarryPotter';
            textDiv.appendChild(document.createTextNode(students[i]));
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
        studentsDiv.appendChild(document.createTextNode("Currently registered students to Hogwarts:"));
        innerDiv.appendChild(helloDiv);
        innerDiv.appendChild(br);
        innerDiv.appendChild(studentsDiv);
        div.appendChild(innerDiv);
        div.style.margin = '30px';
        return div
    }



}(jQuery)
);

