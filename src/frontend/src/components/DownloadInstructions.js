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
                    <Modal.Title>Ladda ner som App på Android</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className='Popup'>
                    <div className="Instruction">
                        <h4>1. Klicka på de tre punkterna</h4>
                        <img className='instructionImg' src="/images/guidance/chromeStep1.jpg"></img>
                    </div>
                    <div className="Instruction">
                        <h4>2.Välj lägg till på startskärmen</h4>
                        <img className='instructionImg' src="/images/guidance/chromeStep2.jpg"></img>
                    </div>
                    <div className="Instruction">
                        <h4>3. Tryck på "Lägg till"</h4>
                        <img className='instructionImg' src="/images/guidance/chromeStep3.jpg"></img>
                    </div>
                    <div className="Instruction">
                        <h4>4. Tryck på "LÄGG TILL"</h4>
                        <img className='instructionImg' src="/images/guidance/chromeStep4.jpg"></img>
                    </div>
                    <div className="Instruction">
                        <h4>5. Nu ligger den på hemskärmen!</h4>
                        <img className='instructionImg' src="/images/guidance/chromeStep5.jpg"></img>
                    </div>
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
                    <div className="Instruction">
                        <h4>1. Tryck på knappen som pilen pekar på</h4>
                        <img className='instructionImg' src="/images/guidance/safariStep1.PNG"></img>
                    </div>
                    <div className="Instruction">
                        <h4>2. Välj "Lägg till på hemskärmen"</h4>
                        <img className='instructionImg' src="/images/guidance/safariStep2.PNG"></img>
                    </div>
                    <div className="Instruction">
                        <h4>3. Tryck på "Lägg till"</h4>
                        <img className='instructionImg' src="/images/guidance/safariStep3.PNG"></img>
                    </div>
                    <div className="Instruction">
                        <h4>4. Nu ligger den på hemskärmen!</h4>
                        <img className='instructionImg' src="/images/guidance/safariStep4.jpg"></img>
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