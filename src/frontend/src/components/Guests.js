import React,{useState} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export default function Guests(props) {
    const [dropdownTitle, setDropDownTitle] = useState('Välj antal gäster');

    let guestsAmount = [1,2,3,4,5,6,7,8];

    function handleSelect(item){
        console.log(item)
        props.guestProps(item)
    }
    
    return (
        <div>
            <h2><span>Gäster</span></h2>
            <DropdownButton title={dropdownTitle} id="dropdown-menu" onSelect={handleSelect}>
                {guestsAmount.map(n => (
                    <Dropdown.Item key={n.toString()} eventKey={n} onClick={() => setDropDownTitle(n.toString())}> {n} </Dropdown.Item>
                ))}
            </DropdownButton>
        </div>
    )
}