$(function () {

    $('#app').html(templateBoard())


})


function templateBoard() {
    let temp = `<div class="container-fluid">
        <div class="row">
            <div class="col-md-8">
                <div id="boardDivided" class="p-4">Board</div>
            </div>
            <div class="col-md-4">
                <div id="boardPlayer" class="p-4">Player</div>
            </div>
        </div>
    </div>`;

    return temp;
}