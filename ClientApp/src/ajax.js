export default xhrFD(_url, _formData, _context){
    var url = _context.props.backendURL + "/" + item.id;

    var xhr = new XMLHttpRequest();
    xhr.open("delete", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 204) {
            /*_context.loadData();*/
        }
        store.addNotification({
            ...undefinedNotification,
            ...definedMessages.equipmentTypeForm[xhr.status],

        });
    }.bind(_context);
    xhr.send();
};