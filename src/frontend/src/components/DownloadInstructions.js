import Button from 'react-bootstrap/Button'


export default function Guests(props) {

    let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    let is_safari = navigator.userAgent.toLowerCase().indexOf('safari/') > -1;


    if (isChrome) {
        console.log('Det här är chrome');
        return (
        <Button>chrome</Button>
        )
    } 
    if (is_safari ) {
        console.log('Det här är safari')
        return (
            <Button>safari</Button>
        )
    }
    else {
        console.log('fsdfas');
        return (
            <Button>lol</Button>
        )
    }
    
}