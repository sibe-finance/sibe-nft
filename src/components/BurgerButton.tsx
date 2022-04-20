export default function Burger (props:any) {
    return (
        <button className="burger" onClick={() => props.setOpen(!props.open)}>
            <div style={{transform:  props.open ? 'rotate(45deg)' : 'translateY(-6px)', width : "28px"}}></div>
            <div style={{transform:  props.open ? 'translateX(20px)' : 'scaleX(1)', opacity: props.open ? '0' : '1', width : "20px"}}></div>
            <div style={{transform:  props.open ? 'rotate(-45deg)' : 'translateY(6px)', width : "28px"}}></div>
        </button>
    )
};