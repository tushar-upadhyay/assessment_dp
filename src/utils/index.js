export const parseId = (url)=> {
    return url.match(/\d/g).join('');
}

export const parseTableHeaders = (tableData)=> {
    const excluded = ['homeworld','created','edited','url'];
    const keys = Object.keys(tableData);
    const headers = [];
    for(let key of keys){
        if(typeof tableData[key] === 'string' && !excluded.includes(key)){
            headers.push(key);
        }
    }
    return headers;
}