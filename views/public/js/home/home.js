const tasksList = [];

$(document).ready(function () {
    getTasksList();

    $('#saveTaskBtn').click(function (e) {
        e.preventDefault();

        createNewTask();
    });

    $('#taskStatusCheckbox').change(function () {
        if ($(this).is(":checked")) {
            $(this).prop('checked');
        }

        changeTaskStatus();
    });


});


function getTasksList() {
    $.ajax({
        type: "GET",
        url: "http://localhost:5000/task/list",
        success: function (response) {
            if (response.success === true) {

                for (let index = 0; index < response.data.result.length; index++) {
                    const task = response.data.result[index];

                    tasksList.push(task);


                    let status;
                    if (task.status) status = 'checked';
                    else status = '';

                    let description;
                    if (task.description) description = task.description;
                    else description = '';


                    $('.todoListCardsWrapper').append(tasksListCardGenerator({
                        title: task.title,
                        description,
                        status,
                        cardId: task._id
                    }));

                }
            }
        },
        error: function (error) {
            const alertId = Date.now();
            $('#alertWrapper').append(alertBox(alertId, 'error', 'error', error.responseJSON.message));
        }
    });
}

function tasksListCardGenerator({title, description, status, cardId}) {
    return `
    <div class="card d-flex flex-column p-2 mb-2" id="taskWrapper">
                        <div id="taskStatusWrapper" class="p-2">
                                <input type="checkbox" ${status}  name="" id="taskStatusCheckbox">
                        </div>

                        <div id="taskTitleWrapper" class="p-2">
                            <p id="taskTitle">
                            <b>${title}</b>
                            </p>
                        </div>
                        
                        <div id="taskDescriptionWrapper" class="p-2">
                            <p id="taskDescription">
                            ${description}
                            </p>
                        </div>
                        
                        <div id="cardId">${cardId}</div>
    </div> 
    `;
}

function singleTaskGenerator({title, description, cardId}) {
    return `
            <div class="card d-flex flex-column p-2 mb-2" id="taskWrapper">
                        <div id="taskStatusWrapper" class="p-2">
                                <input type="checkbox"  name="" id="taskStatusCheckbox">
                        </div>

                        <div id="taskTitleWrapper" class="p-2">
                            <p id="taskTitle">
                            <b>${title}</b>
                            </p>
                        </div>
                        
                        <div id="taskDescriptionWrapper" class="p-2">
                            <p id="taskDescription">
                            ${description}
                            </p>
                        </div>
                        
                        <div id="cardId">${cardId}</div>
    </div> 
    `;
}

function createNewTask() {
    const title = $('#taskTitleInput').val();
    const description = $('#taskDescriptionInput').val();

    if (!title) {
        const alertId = Date.now();
        $('#alertWrapper').append(alertBox(alertId, 'error', 'password is not valid', 'please enter your task title'));

        return;
    }


    $.ajax({
        type: "POST",
        url: "http://localhost:5000/task/",
        data: {title, description},
        success: function (response) {
            const alertId = Date.now();
            $('#alertWrapper').append(alertBox(alertId, 'success', 'successful', 'new task created'));

            $('.todoListCardsWrapper').append(singleTaskGenerator({
                title: response.data.title,
                description: response.data.description,
                cardId: response.data._id
            }));

            console.log(response)

        },
        error: function (error) {

        }
    });
}

function changeTaskStatus({status}) {


    const taskId = $('#cardId').val();
    console.log(taskId);

    $.ajax({
        type: "GET",
        url: `http://localhost:5000/task/status/:${taskId}?status=${status}`,
        success: function (response) {
            const alertId = Date.now();
            $('#alertWrapper').append(alertBox(alertId, 'success', 'successful', 'status of your task changed'));
        },
        error: function (error) {
            const alertId = Date.now();
            $('#alertWrapper').append(alertBox(alertId, 'error', 'error', "we couldn't change status of your task please try again!"));
        }
    });
}