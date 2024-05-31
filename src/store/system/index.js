
const system = {
    state: {
        routerList: [],
        closeDrag: true,//是否开启表单拖拽
    },
    mutations: {
        set_system_routerList: (state, list) => {
            console.log('list', list)
            // localStorage.setItem('microActivitiRouterList',JSON.stringify(list))
            state.routerList = list
        },
        set_closeDrag: (state, closeDrag) => {
            state.closeDrag = closeDrag
        },
       
    },
    actions: {
       
    }
}

export default system
