import Dropdown from 'react-dropdown';

export default function Guests(props) {
    function displayAmount(n){
        console.log(n)
        props.guestProps(n)
    }

    const options = [
        '1', '2', '3', '4', '5', '6', '7', '8'
    ];

    const defaultOption = options[0]

    return (
        <div>
            <h2><span>Number of guests</span></h2>
            <div className='guestsDropdown'>
                <Dropdown options={options} onChange={displayAmount} value={defaultOption}></Dropdown>
            </div>
        </div>
    )
}