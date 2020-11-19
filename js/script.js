$(function () {

    $('#app').html(templateMain())
    $('#boardDivided').html(templateBoard())
    $('#boardPlayer').html(templatePlayer())

    $('#table-board tr').each(function (i, el) {
        let mapNumber = [
            {start: 100, end: 91},
            {start: 81, end: 90},
            {start: 80, end: 71},
            {start: 61, end: 70},
            {start: 60, end: 51},
            {start: 41, end: 50},
            {start: 40, end: 31},
            {start: 21, end: 30},
            {start: 20, end: 11},
            {start: 1, end: 10}
        ]

        if (i % 2 == 0) {
            let td = ''
            for (let j = mapNumber[i].start; j >= mapNumber[i].end; j--) {
                td += '<td class="cell" id="cell-' + j + '"><small>' + j + '</small></td>'
            }
            $(this).html(td)
        } else {
            let td = ''
            for (let j = mapNumber[i].start; j <= mapNumber[i].end; j++) {
                td += '<td class="cell" id="cell-' + j + '"><small>' + j + '</small></td>'
            }
            $(this).html(td)
        }
    })

    // Player
    let player = [
        {name: 'Player 1', position: 0},
        {name: 'Player 2', position: 0},
    ]

    let liPlayer = '';
    for (let i = 0; i < player.length; i++) {
        liPlayer += `<li class="list-group-item d-flex justify-content-between align-items-center">
    ${player[i].name}
    <span class="badge badge-primary badge-pill">${player[i].position}</span>
  </li>`
    }

    $('#listPlayer').html(liPlayer)

})


function templateMain() {
    let temp = `<div class="container-fluid">
        <div class="row">
            <div class="col-md-8">
                <div id="boardDivided" class="p-5">Board</div>
            </div>
            <div class="col-md-4">
                <div id="boardPlayer" class="pt-5 pr-4">Player</div>
            </div>
        </div>
    </div>`;

    return temp;
}

function templateBoard() {
    let temp = ``;
    temp += '<div class="card"><div class="card-body p-5">'
    temp += '<table class="table table-bordered m-0" id="table-board">'
    for (let i = 1; i <= 10; i++) {
        temp += '<tr></tr>';
    }
    temp += '</table>'
    temp += '</div></div>'
    return temp;
}

function templatePlayer() {
    let temp = `<div class="card">
        <div class="card-header">
            <div class="card-title m-0">Player</div>
        </div>
        <div class="card-body">
            <ul class="list-group" id="listPlayer"></ul>
            <hr>
            <div class="row">
                <div class="col-md-8">
                    <div class="form-group">
                    <input type="text" class="form-control" placeholder="Input name player">
                    </div>
                </div>
                <div class="col-md-4">
                    <button class="btn btn-block btn-primary">Submit</button>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <div class="form-group">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <h3>0</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <h3>0</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <button class="btn btn-block btn-primary">Role Diss</button>
            </div>
        </div>
    </div>`;

    return temp
}