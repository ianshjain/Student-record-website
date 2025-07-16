let rollbox, namebox, branchbox, jsbox, dbmsbox, tb;

function init() {
    rollbox = document.getElementById("rollbox");
    namebox = document.getElementById("namebox");
    branchbox = document.getElementById("Branchbox");
    jsbox = document.getElementById("jsbox");
    dbmsbox = document.getElementById("dbmsbox");
    tb = document.getElementById("tbody");

    setupdata();
}

function setupdata() {
    var data = localStorage.getItem("students");
    if (!data) return;

    var studs = JSON.parse(data);
    for (var sd of studs) {
        createRow(sd.roll, sd.name, sd.branch, parseFloat(sd.js), parseFloat(sd.dbms));
    }
}

function add(evt) {
    evt.preventDefault();

    var roll = rollbox.value;
    var name = namebox.value;
    var branch = branchbox.value;
    var js = parseFloat(jsbox.value);
    var dbms = parseFloat(dbmsbox.value);

    createRow(roll, name, branch, js, dbms);
    evt.target.reset(); // Clear form
}

function createRow(roll, name, branch, js, dbms) {
    var total = js + dbms;

    var tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${roll}</td>
        <td>${name}</td>
        <td>${branch}</td>
        <td>${js}</td>
        <td>${dbms}</td>
        <td>${total}</td>
    `;

    // Delete Button
    var td7 = document.createElement("td");
    var btn = document.createElement("button");
    btn.innerHTML = "Delete";
    btn.onclick = function () {
        if (confirm("Are you sure you want to delete?")) {
            tr.remove();
        }
    };
    td7.appendChild(btn);
    tr.appendChild(td7);

    tb.appendChild(tr);
}

function Save() {
    var rows = tb.querySelectorAll("tr");
    var studs = [];

    // Skip the header row
    for (var i = 1; i < rows.length; i++) {
        var tds = rows[i].querySelectorAll("td");

        if (tds.length < 6) continue;

        var ob = {
            roll: tds[0].innerHTML,
            name: tds[1].innerHTML,
            branch: tds[2].innerHTML,
            js: tds[3].innerHTML,
            dbms: tds[4].innerHTML
        };
        studs.push(ob);
    }

    localStorage.setItem("students", JSON.stringify(studs));
    alert("Data saved!");
}
