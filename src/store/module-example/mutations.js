/*
export function someMutation (state) {
}
*/
export const getuserAccount = (state,itemsv) =>{
    state.userAccount = itemsv
    // 登录用户
}
//  用户列表
export const getuserDatalist = (state,itemsv) =>{
    state.userDatalist = itemsv
    
}
//  项目列表
export const getProjectnametlist = (state,itemsv) =>{
    console.log(itemsv);
    state.Projectnametlist = itemsv
}
// 设备组
export const ProjectFacility = (state,itemsv) =>{
    state.ProjectFacility = itemsv
}
