'use strict';

let errors = [];

/** Função que guarda a lista de erros das validações*/
function Validation() {
    errors = [];
}

Validation.prototype.isRequired = (value, message) => {
    if (!value || value == null || value.length <= 0 ) {
        errors.push({message: message});
    }
};

Validation.prototype.hasMinLen = (value, min, message) => {
    if (!value || value.length < min) {
        errors.push({message: message});
    }
};

Validation.prototype.hasMaxLen = (value, max, message) => {
    if (!value || value.length > max) {
        errors.push({message: message});
    }
};

Validation.prototype.isFixedLen = (value, len, message) => {
    if (value.length != len) {
        errors.push({message: message});
    }
};

Validation.prototype.isEmail = (value, message) => {
    if (!value == '') {
        let reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
        if (!reg.test(value)) {
            errors.push({message: message});
        }
    }
};

Validation.prototype.isTel = (value, message) => {
    if (!value == '') {
        let reg = new RegExp(/^[1-9]{2}(?:[2-8]|9[1-9])[0-9]{3}[0-9]{4}$/);
        if (!reg.test(value)) {
            errors.push({message: message});
        }
    }
};

Validation.prototype.isCEP = (value, message) => {
    if (!value == '') {
        let reg = new RegExp(/^[0-9]{8}$/);
        if (!reg.test(value)) {
            errors.push({message: message});
        }
    }
};

Validation.prototype.isMoney = (value, message) => {
    if (!value == '') {
        let reg = new RegExp(/^[0-9]{0,3}.[0-9]{2}$/);
        if (!reg.test(value)) {
            errors.push({message: message});
        }
    }
};

Validation.prototype.isNumber = (value, message) => {
    if (!value == '') {
        let reg = new RegExp(/^(0|[1-9]\d*)$/);
        if (!reg.test(value)) {
            errors.push({message: message});
        }
    }
};

Validation.prototype.errors = () => {
    return errors;
};

Validation.prototype.clear = () => {
    errors = [];
};

Validation.prototype.isValid = () => {
    return errors.length == 0;
};

module.exports = Validation;
