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
    let player = [
        {id: 1, name: 'Player 1', color: '#f44336', position: 0},
        {id: 2, name: 'Player 2', color: '#ffeb3b', position: 0},
        {id: 3, name: 'Player 2', color: '#263238', position: 0},
        {id: 4, name: 'Player 2', color: '#4caf50', position: 0},
        {id: 5, name: 'Player 2', color: '#2196F3', position: 0},
    ]

    let liPlayer = '';
    player.forEach((p) => {
        liPlayer += `<li class="list-group-item d-flex justify-content-between align-items-center pl" data-id="${p.id}" style="color: ${p.color}; font-weight: bold">${p.name}<span class="badge badge-primary badge-pill">${p.position}</span></li>`
    })

    $('#listPlayer').html(liPlayer)

    // End Init Player List

    // // Add Player
    // $('#btnInputNewPlayer').on('click', function () {
    //     let name = $('#fieldNamePlayer').val()
    //     if (name == "") {
    //         alert('Name Player belum diisi...!')
    //     } else {
    //         player.push({
    //             id: (player.length + 1),
    //             name: name,
    //             position: 0,
    //             color: Math.floor(Math.random() * 16777215).toString(16)
    //         })
    //
    //         $('#fieldNamePlayer').val('')
    //     }
    //
    //     let liPlayer = '';
    //     for (let i = 0; i < player.length; i++) {
    //         liPlayer += `<li class="list-group-item d-flex justify-content-between align-items-center">${player[i].name}<span class="badge badge-primary badge-pill">${player[i].position}</span></li>`
    //     }
    //     $('#listPlayer').html(liPlayer)
    // })
    //
    // // End Add Player

    // Set active player

    let playerPlay = 1;
    let diceOne = 0;
    let diceTwo = 0;
    let stepTotal = 0;

    // init set active user
    $('.pl').each(function () {
        let id = $(this).data('id')
        if (id == playerPlay){
            $(this).addClass('active')
        }else {
            $(this).removeClass('active')
        }
    })

    $('#btnRoleDice').on('click', function () {
        diceOne = getRandomNumber(1, 6);
        diceTwo = getRandomNumber(1, 6);
        stepTotal = diceOne + diceTwo
        $('#DiceOne').text(diceOne)
        $('#DiceTwo').text(diceTwo)

        let dataPlayer = {
            player: getPlayer(player, playerPlay),
            step: stepTotal
        }

        runPlayer(dataPlayer, player)

        let playerMax = player.length;

        if (playerPlay != playerMax) {
            if (diceOne != diceTwo) {
                playerPlay++
            }
        } else {
            playerPlay = 1;
        }

        setTimeout(()=>{
            $('#DiceOne').text(0)
            $('#DiceTwo').text(0)

            $('.pl').each(function () {
                let id = $(this).data('id')
                if (id == playerPlay){
                    $(this).addClass('active')
                }else {
                    $(this).removeClass('active')
                }
            })

        },2500)

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
<!--            <hr>-->
<!--            <div class="row">-->
<!--                <div class="col-md-8">-->
<!--                    <div class="form-group">-->
<!--                    <input type="text" class="form-control" placeholder="Input name player" id="fieldNamePlayer">-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="col-md-4">-->
<!--                    <button class="btn btn-block btn-primary" id="btnInputNewPlayer">Submit</button>-->
<!--                </div>-->
<!--            </div>-->
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

function runPlayer(dataPlayer, listPlayer) {
    let positionNow = dataPlayer.player.position;
    let newPosition = positionNow + dataPlayer.step;
    for (let i = positionNow; i <= newPosition; i++) {
        $('#cell-' + i).append(`<div class="player-item ${dataPlayer.player.id}" style="background-color: ${dataPlayer.player.color}"></div>`)
        $('#cell-' + (i - 1)).find('.player-item.' + dataPlayer.player.id).remove()
    }

    // update position
    listPlayer.forEach((p) => {
        if (p.id == dataPlayer.player.id) {
            p.position = newPosition;
        }
    })
}

function getPlayer(dataPlayer, idPlayerActive) {
    let player;
    for (let i = 0; i < dataPlayer.length; i++) {
        if (dataPlayer[i].id == idPlayerActive) {
            player = dataPlayer[i];
        }
    }

    return player;
}