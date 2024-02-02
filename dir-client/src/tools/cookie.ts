export const getCookiesAll=():{[k:string]:string}=>{
    const cookies= document.cookie
    const parsed=cookies.split(';')
    const total:{[key:string]:string} = {}
    if(cookies.length!==0){
        for(let item of parsed){
            const split = item.trim().split('=')
            total[split[0]]=split[1]
        }
    }
    return total
}

export const setCookie = 
(name:string|number,value:string|number)=>{
    document.cookie=`${name}=${value}; path=/;`
}

export const clearCookiesAll=()=>{
    document.cookie.split(";").forEach((cookie)=>{
        document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
}
