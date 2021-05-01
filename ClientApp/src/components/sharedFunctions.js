export var undefinedNotification = {
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
    animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
    dismiss: {
        duration: 5000,
        onScreen: true
    }
};
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
    equipmentForm: {
        "201": {
            type: "success",
            title: "Wonderful!",
            message: "Новое оборудование добавлено!",
        },
        "400": {
            type: "danger",
            title: "Ошибка! Не удалось добавить оборудование!",
            message: "Форма не заполнена или заполнена не верно!",
        },
        "204": {
            type: "info",
            title: "Удалено!",
            message: "Оборудование удалено!",
        }
    },
    equipmentTypeForm: {
        "201": {
            type: "success",
            title: "Wonderful!",
            message: "Новый тип оборудования добавлен!",
        },
        "400": {
            type: "danger",
            title: "Ошибка! Не удалось добавить тип оборудования!",
            message: "Форма не заполнена или заполнена не верно!",
        },
        "204": {
            type: "info",
            title: "Удалено!",
            message: "Тип оборудования удалено!",
        }
    },
    userForm: {
        "201": {
            type: "success",
            title: "Wonderful!",
            message: "Новый пользователь добавлен!",
        },
        "400": {
            type: "danger",
            title: "Ошибка! Не удалось добавить пользователя!",
            message: "Форма не заполнена или заполнена не верно!",
        },
        "204": {
            type: "info",
            title: "Удалено!",
            message: "Пользователь удалён!",
        }
    }
};