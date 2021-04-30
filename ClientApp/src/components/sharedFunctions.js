export var successNotification = {
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
    animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
    dismiss: {
        duration: 5000,
        onScreen: true
    }
};
export var deniedNotification = {
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
    animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
    dismiss: {
        duration: 10000,
        onScreen: true
    }
};
export var infoNotification = {
    type: "info",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
    animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
    dismiss: {
        duration: 10000,
        onScreen: true
    }
};

export var definedMessages = {
    "One or more validation errors occurred." : "Форма не заполнена или заполнена не верно!"
};