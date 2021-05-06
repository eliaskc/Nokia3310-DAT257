import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import React,{useState} from 'react';


export default function Guests(props) {

    let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    let is_safari = navigator.userAgent.toLowerCase().indexOf('safari/') > -1;


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (isChrome) {
        console.log('Det här är chrome');
        return (
            <>
                <Button className='instructions-lnk' onClick={handleShow}>
                  Klicka här för att ladda ner som App
                </Button>
          
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Ladda ner som app på Android</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className='Popup'>
                      <h5>1. Tryck på knappen som pilen pekar på</h5>
                      <img src="/images/guidance/safariStep1.jpeg"></img>
                      <h5>2. Välj "Lägg till på hemskärmen"</h5>
                      <img src="/images/guidance/safariStep2.jpeg"></img>
                      <h5>3. Tryck på "Lägg till"</h5>
                      <img src="/images/guidance/safariStep3.jpeg"></img>
                      <h5>4. Nu ligger den på hemskärmen!</h5>
                      <img src="/images/guidance/safariStep4.jpeg"></img>
                    </Modal.Body>
                </Modal>
            </>
        )
    } 
    if (is_safari ) {
        console.log('Det här är safari')
        return (
            <>
                <Button className='instructions-lnk' onClick={handleShow}>
                  Klicka här för att ladda ner som App
                </Button>
          
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Ladda ner som App på iPhone</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className='Popup'>
                      <div>
                        <h5>1. Tryck på knappen som pilen pekar på</h5>
                        <img src="/images/guidance/safariStep1.jpeg"></img>
                        <h5>2. Välj "Lägg till på hemskärmen"</h5>
                        <img src="/images/guidance/safariStep2.jpeg"></img>
                        <h5>3. Tryck på "Lägg till"</h5>
                        <img src="/images/guidance/safariStep3.jpeg"></img>
                        <h5>4. Nu ligger den på hemskärmen!</h5>
                        <img src="/images/guidance/safariStep4.jpeg"></img>
                      </div>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
    else {
        return (
            <h1> </h1>
        )
    }
    
}