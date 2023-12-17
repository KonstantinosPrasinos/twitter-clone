function validation(values) {

    let error = {}

    if(values.username === "" ) {
        error.username = "Name field should not be empty"
    }else {
        error.username = ""
    }

    if(values.password === "") {
        error.password = "Password field should not be empty"
    }else {
        error.password = ""
    }
    return error;


}


export default validation;