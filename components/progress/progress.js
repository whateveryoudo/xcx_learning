let comData = {//当前组件需要的数据
}
let proMehtods = {//自定义方法

}
function ProgressPannel(){
    //获取当前页面对象
    let curPage = getCurrentPages()[getCurrentPages().length - 1];
    //当前页面添加方法
    Object.assign(curPage,proMehtods);
    //当前页面添加数据
    curPage.setData(comData);
}
export default {
    ProgressPannel
}