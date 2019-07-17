export const isAuth = (key) => {
    if (localStorage.webInfo && JSON.parse(localStorage.webInfo)) {
        let webInfo = JSON.parse(localStorage.webInfo);
        return (webInfo.menu || {})[key];
    } else {
        if (window.location.pathname != '/login') {
            window.location.href = '/login';
            return false;
        }
    }
}

export const getQuery = (search) => {
    let query = search.replace('?', '').split('&'), obj = {};
    for (let i = 0; i < query.length; i++) {
        let arr = query[i].split('=');
        obj[arr[0]] = arr[1];
    }
    return obj;
};