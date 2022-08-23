/** create alert box, alert id is a unique id for each alert, type is success or error, title for alert title and message is alert message */
function alertBox(alertId, type = 'success', title, message) {


    let colorCode;

    if (type === 'error') {
        colorCode = 'f10a0a'
    } else {
        colorCode = '4BB543'
    }

    return `
    <!-- alert box -->
    <div id="alertMessage" class="${alertId} alertMessage shadow p-2" style="background-color:#${colorCode};">
        <div class="alert-header">
            <h6>${title}</h6>
            <button onclick="closealert(${alertId});" id="closeBtn-alert"> <i class="fas fa-times-square"></i></button>
        </div>

        <div class="alert-body">
            <p>${message}</p>
        </div>
    </div>
    `;
}

/** close alert box */
function closealert(alertId) {
    $(`.${alertId}`).remove();
}