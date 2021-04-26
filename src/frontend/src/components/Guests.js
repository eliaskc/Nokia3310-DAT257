import Button from 'react-bootstrap/Button';

export default function Guests(props) {
    function displayAmount(n){
        console.log(n)
        props.guestProps(n)
    }

    return (
        <div>
            <h2><span>Number of guests</span></h2>
            <Button onClick={() => displayAmount(1)}>1</Button>
            <Button onClick={() => displayAmount(2)}>2</Button>
            <Button onClick={() => displayAmount(3)}>3</Button>
            <Button onClick={() => displayAmount(4)}>4</Button>
            <Button onClick={() => displayAmount(5)}>5</Button>
            <Button onClick={() => displayAmount(6)}>6</Button>
        </div>
    )
}