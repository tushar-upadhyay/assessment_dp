

export const Show = (props) => {
    if(props.show === true){
        console.log('tushaar')
        return props.children;
    }
    return <></>
}