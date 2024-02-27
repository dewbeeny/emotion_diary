const MyButton = ({ text, onClick, type }) => {

    const btoType = ['positive', 'negative'].includes(type) ? type :'default' ;
    return (
        //버튼의 클래스 네임을 타입별로(negative or positive etc..) 다르게 설정
        <button
            className={["MyButton", `MyButton_${btoType}`].join(" ")}
    onClick = { onClick } >
            {text}
        </button>
    );
}

MyButton.defaultProps = {
    type: "default",
};

export default MyButton;
