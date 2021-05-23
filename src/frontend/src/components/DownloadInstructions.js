import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import React,{useState} from 'react';


export default function Guests(props) {

    let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    let is_safari = navigator.userAgent.toLowerCase().indexOf('safari/') > -1;

    const ua = navigator.userAgent;
    const isMobileOrTablet = (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) || /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua));


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (isChrome && isMobileOrTablet) {
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
                        <img className='instructionImg' alt="Instruktionsbild för att lägga till på hemskärmen "src="/images/guidance/chromeStep1.jpeg"></img>
                    </div>
                    <div className="Instruction">
                        <h4>2.Välj lägg till på startskärmen</h4>
                        <img className='instructionImg' alt="Intstruktionsbild för att lägga till på hemskärmen" src="/images/guidance/chromeStep2.jpeg"></img>
                    </div>
                    <div className="Instruction">
                        <h4>3. Tryck på "Lägg till"</h4>
                        <img className='instructionImg' alt="Intstruktionsbild för att lägga till på hemskärmen" src="/images/guidance/chromeStep3.jpeg"></img>
                    </div>
                    <div className="Instruction">
                        <h4>4. Tryck på "LÄGG TILL"</h4>
                        <img className='instructionImg' alt="Intstruktionsbild för att lägga till på hemskärmen" src="/images/guidance/chromeStep4.jpeg"></img>
                    </div>
                    <div className="Instruction">
                        <h4>5. Nu ligger den på hemskärmen!</h4>
                        <img className='instructionImg' alt="Intstruktionsbild för att lägga till på hemskärmen" src="/images/guidance/chromeStep5.jpeg"></img>
                    </div>
                    </Modal.Body>
                </Modal>
            </>
        )
    } 
    if (is_safari && isMobileOrTablet) {
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
                        <img className='instructionImg' alt="Intstruktionsbild för att lägga till på hemskärmen" src="/images/guidance/safariStep1.jpeg"></img>
                    </div>
                    <div className="Instruction">
                        <h4>2. Välj "Lägg till på hemskärmen"</h4>
                        <img className='instructionImg' alt="Intstruktionsbild för att lägga till på hemskärmen" src="/images/guidance/safariStep2.jpeg"></img>
                    </div>
                    <div className="Instruction">
                        <h4>3. Tryck på "Lägg till"</h4>
                        <img className='instructionImg' alt="Intstruktionsbild för att lägga till på hemskärmen" src="/images/guidance/safariStep3.jpeg"></img>
                    </div>
                    <div className="Instruction">
                        <h4>4. Nu ligger den på hemskärmen!</h4>
                        <img className='instructionImg' alt="Intstruktionsbild för att lägga till på hemskärmen" src="/images/guidance/safariStep4.jpeg"></img>
                    </div>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
    else {
        return (
            <div></div>
        )
    }
    
}