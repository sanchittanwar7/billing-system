import {Form, Row, Col, Button} from 'react-bootstrap';
import {quantityUnits} from '../constants/constants'

const AddItem = ({item, updateItem, removeItem}) => {

    const renderUnits = quantityUnits.map(quantityUnit => <option
        key={quantityUnit}
        value={quantityUnit}
    >
        {quantityUnit}
    </option>);

    const updateDescription = (e) => {
        updateItem({...item, description: e.target.value});
    };

    const updateQuantity = (e) => {
        updateItem({...item, quantity: e.target.value});
    };

    const updatePrice = (e) => {
        updateItem({...item, price: e.target.value});
    };

    const updateUnit = (e) => {
        updateItem({...item, unit: e.target.value});
    };

    const renderRow = () => {
        return (
            <Row>
                <Form.Group as={Col} controlId="formGridCity" onChange={updateDescription}>
                    <Form.Control />
                </Form.Group>
    
                <Form.Group as={Col} controlId="formGridCity" onChange={updateQuantity}>
                    <Form.Control />
                </Form.Group>
    
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Select defaultValue="" onChange={updateUnit}>
                        <option>Select a unit</option>
                        {renderUnits}
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCity" onChange={updatePrice}>
                    <Form.Control />
                </Form.Group>

                <Col>
                    <Button
                        onClick={e => removeItem(item)}
                        variant="outline-dark"
                    >
                        X
                    </Button>
                </Col>

            </Row>
        )
    }

  return renderRow();
};

export default AddItem;
