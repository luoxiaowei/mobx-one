export const getQuery = (search) => {
    let query = search.replace('?', '').split('&'), obj = {};
    for (let i = 0; i < query.length; i++) {
        let arr = query[i].split('=');
        obj[arr[0]] = arr[1];
    }
    return obj;
};