const getUnauthorizedResponse = (req) => {
    return req.auth
        ? ({'message': 'Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected'})
        : {'message': 'No credentials provided'}
}

const nameOrEmailRequired = () => {
    return {
        "message": "Either email or name parameter should be sent in the url"
    }
}

const noContactFoundWithMail = () => {
    return {
        "message": "No contact found with this email"
    }
}

const noContactFoundWithName = () => {
    return {
        "message": "No contacts found with this name"
    }
}

const noEmail = () => {
    return {
        "message": "Email does not exists"
    }
}

const emailMissing = () => {
    return {
        "message": "Email needs to be sent in the request"
    }
}

const updated = () => {
    return {
        "message": "Updated Successfully"
    }
}

const deleted = () => {
    return "Deleted Successfully";
}

const welcome = () => {
    return "Welcome to contacts book application!";
}

module.exports = {
    getUnauthorizedResponse: getUnauthorizedResponse,
    nameOrEmailRequired: nameOrEmailRequired(),
    noContactFoundWithMail: noContactFoundWithMail(),
    noContactFoundWithName: noContactFoundWithName(),
    noEmail: noEmail(),
    emailMissing: emailMissing(),
    updated: updated(),
    deleted: deleted(),
    welcome: welcome()
}