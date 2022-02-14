const validateEmail = (email)=>{   
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validatePassword = (password) =>{
    return password?.length >5
}

const validateName = (name) =>{
    return name?.length >0
}

const validateAll = (email,password,fname,lname)=>{
    let isValidEmail = validateEmail(email)
    let isValidPassword = validatePassword(password)
    let isValidFname = validateName(fname)
    let isValidLname = validateName(lname)
    let isAllValid = isValidLname && isValidPassword && isValidEmail && isValidFname
    return {
        isValidEmail,isValidPassword,isValidFname,isValidLname,isAllValid
    }
}
const validations = {
    validateEmail,
    validatePassword,
    validateName,
    validateAll
}

module.exports =  validations