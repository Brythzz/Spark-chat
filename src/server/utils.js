import crypto from 'crypto';


//////////////////////////////////////////////////
//  UTILS
//////////////////////////////////////////////////


export const getRandomColor = () => {
    const colors = ['#ffc66d', '#b995f8', '#e199be', '#67c9a4', '#6897bb', '#cc7832'];
    return colors[Math.floor(Math.random() * colors.length)];
}

export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const validateRequest = (body) => {
    for (let param of body)
        if (!typeof (param || null) === 'string') return false;

    return true;
}

export const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}

export const toLowerCaseString = (str) => {
    return String(str).toLowerCase();
}

export const getJSON = (str) => {
    try {
        const json = JSON.parse(str);
        return json;
    }
    catch {
        return null;
    }
}