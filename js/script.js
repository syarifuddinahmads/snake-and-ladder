let player =[]

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
                td += '<td class="cell" id="cell-' + j + '"><div class="number-cell">' + j + '</div></td>'
            }
            $(this).html(td)
        } else {
            let td = ''
            for (let j = mapNumber[i].start; j <= mapNumber[i].end; j++) {
                td += '<td class="cell" id="cell-' + j + '"><div class="number-cell">' + j + '</div></td>'
            }
            $(this).html(td)
        }
    })

    // Init Player List
    player = [
        {id: 1, name: 'Player 1', color: '#f44336', position: 0},
        {id: 2, name: 'Player 2', color: '#ffeb3b', position: 0},
        {id: 3, name: 'Player 3', color: '#263238', position: 0},
        {id: 4, name: 'Player 4', color: '#4caf50', position: 0},
        {id: 5, name: 'Player 5', color: '#2196F3', position: 0},
    ]

    let liPlayer = '';
    player.forEach((p) => {
        liPlayer += `<li class="list-group-item d-flex justify-content-between align-items-center pl" data-id="${p.id}" style="color: ${p.color}; font-weight: bold">${p.name}<span class="badge badge-primary badge-pill">${p.position}</span></li>`
    })

    $('#listPlayer').html(liPlayer)

    // End Init Player List

    // Set active player

    let playerPlay = 1;
    let diceOne = 0;
    let diceTwo = 0;
    let stepTotal = 0;

    // init set active user
    $('.pl').each(function () {
        let id = $(this).data('id')
        if (id == playerPlay) {
            $(this).addClass('active')
        } else {
            $(this).removeClass('active')
        }
    })

    $('#btnRoleDice').on('click', function () {
        diceOne = getRandomNumber(1, 6);
        diceTwo = getRandomNumber(1, 6);
        stepTotal = diceOne + diceTwo
        $('#DiceOne').text(diceOne)
        $('#DiceTwo').text(diceTwo)

        let dataPlayer = getPlayer(player, playerPlay);
        let positionNow = dataPlayer.position;
        let newPosition = positionNow + stepTotal;

        let timeInterval = 500;

        setInterval(() => {
            if (positionNow != newPosition) {
                positionNow += 1;
                $('#cell-' + (positionNow - 1)).find('.player-item.' + dataPlayer.id).remove()
                $('#cell-' + positionNow).append(`<div class="player-item ${dataPlayer.id}" style="background-color: ${dataPlayer.color}"></div>`)
            }
        }, timeInterval)

        // update position
        player.forEach((p) => {
            if (p.id == dataPlayer.id) {
                p.position =  newPosition;
            }
        })

        let playerMax = player.length;

        if (playerPlay != playerMax) {
            if (diceOne != diceTwo) {
                playerPlay++
            }
        } else {
            if (diceOne == diceTwo) {
                playerPlay += 1;
            }else{
                playerPlay = 1;
            }
        }

        setTimeout(() => {
            $('#DiceOne').text(0)
            $('#DiceTwo').text(0)

            $('.pl').each(function () {
                let id = $(this).data('id')
                if (id == playerPlay) {
                    $(this).addClass('active')
                } else {
                    $(this).removeClass('active')
                }
            })

            rulesGame(dataPlayer, newPosition)


        }, (timeInterval * (newPosition - positionNow + 1)))

    })

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
        </div>
        <div class="card-footer">
            <div class="form-group">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <h3 id="DiceOne">0</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <h3 id="DiceTwo">0</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <button class="btn btn-block btn-primary" id="btnRoleDice">Role Dice</button>
            </div>
        </div>
    </div>`;

    return temp
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getPlayer(dataPlayer, idPlayerActive) {
    let playerSelected;
    for (let i = 0; i < dataPlayer.length; i++) {
        if (dataPlayer[i].id == idPlayerActive) {
            playerSelected = dataPlayer[i];
        }
    }

    return playerSelected;
}

function rulesGame(dataPlayer, playerPosition) {

    let listRules = [
        {id_rule: '1', from: 1, to: 38, type:'up'},
        {id_rule: '4', from: 4, to: 14, type:'up'},
        {id_rule: '9', from: 9, to: 38, type:'up'},
        {id_rule: '17', from: 17, to: 7, type:'down'},
        {id_rule: '21', from: 21, to: 38, type:'up'},
        {id_rule: '28', from: 28, to: 84, type:'up'},
        {id_rule: '51', from: 51, to: 67, type:'up'},
        {id_rule: '54', from: 54, to: 34, type:'down'},
        {id_rule: '62', from: 62, to: 19, type:'down'},
        {id_rule: '64', from: 64, to: 60, type:'down'},
        {id_rule: '71', from: 71, to: 91, type:'up'},
        {id_rule: '80', from: 80, to: 100, type:'up'},
        {id_rule: '87', from: 87, to: 24, type:'down'},
        {id_rule: '93', from: 93, to: 73, type:'down'},
        {id_rule: '95', from: 95, to: 75, type:'down'},
        {id_rule: '98', from: 98, to: 79, type:'down'},
    ];

    listRules.forEach((r)=>{
        if (r.id_rule == playerPosition){
            switch (r.type) {
                case "up":
                    alert("Naik dari "+r.from+' ke '+r.to)
                    break;
                case "down":
                    alert("Turun dari "+r.from+' ke '+r.to)
                    break
            }

            $('#cell-' + playerPosition).find('.player-item.' + dataPlayer.id).remove()
            $('#cell-' + r.to).append(`<div class="player-item ${dataPlayer.id}" style="background-color: ${dataPlayer.color}"></div>`)

            // update position
            player.forEach((p) => {
                if (p.id == dataPlayer.id) {
                    p.position =  r.to;
                }
            })

        }
    })

    if (playerPosition == 100){
        alert(dataPlayer.name+' You Win...')
        location.reload();
    }


}