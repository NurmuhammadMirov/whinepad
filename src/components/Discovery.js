import { useRef } from "react";
import Excel from "./Excel";
import Logo from "./Logo";
import Body from "./Body";
import Button from './Button';
import Suggest from './Suggest';
import Rating from './Rating';
import FormInput from "./FormInput";
import Form from "./Form";
import Actions from "./Actions";
import DialogExample from "./DialogExample";
import schema from '../config/schema';
import './Discovery.css';

function Discovery() {
    const form = useRef();
    return (
        <div className="Discovery">
            <h2>Logo</h2>
            <div style={{ background: '#f6f6f6', display: 'inline-block' }}>
                <Logo />
            </div>

            <h2>Body</h2>
            <Body>I am content inside the body</Body>

            <h2>Button</h2>
            <p>
                Button with onClick:{''}
                <Button onClick={() => alert('ouch')}>Click Me</Button>
            </p>
            <p>
                A link: <Button href="https://reactjs.org/">Follow me</Button>
            </p>
            <p>
                Custom class name:{''}
                <Button className="Discovery-custom-button">I do nothing</Button>
            </p>

            <h2>Suggest</h2>
            <p>
                <Suggest options={['eenie', 'meenie', 'miney', 'mo']} />
            </p>

            <h2>Rating</h2>
            <p>
                No initial value: <Rating />
            </p>
            <p>
                Initial value 4: <Rating defaultValue={4} />
            </p>
            <p>
                This one goes to 11: <Rating max={11} />
            </p>
            <p>
                Read-only: <Rating readonly={true} defaultValue={3} />
            </p>

            <h2>Form inputs</h2>
            <table className="Discovery-pad">
                <tbody>
                    <tr>
                        <td>Vanilla input</td>
                        <td><FormInput /></td>
                    </tr>
                    <tr>
                        <td>Prefilled</td>
                        <td><FormInput defaultValue="with a default" /></td>
                    </tr>
                    <tr>
                        <td>Year</td>
                        <td><FormInput type="year" /></td>
                    </tr>
                    <tr>
                        <td>Rating</td>
                        <td><FormInput type="rating" defaultValue={4} /></td>
                    </tr>
                    <tr>
                        <td>Suggest</td>
                        <td>
                            <FormInput
                                type="suggest"
                                options={['red', 'green', 'blue']}
                                defaultValue="green"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Vanilla textarea</td>
                        <td><FormInput type="textarea" /></td>
                    </tr>
                </tbody>
            </table>

            <h2>Form</h2>
            <div className="Discovery-pad Discovery-narrow">
                <Form 
                    ref={form}
                    fields={{ 
                        rateme: {label: 'Rating', type: 'rating'},
                        freetext: {label: 'Greetings'},
                    }}
                    initialData={{rateme: 4, freetext: 'Hello'}}
                />
                <p>
                    <Button
                        onClick={() => {
                            const data = {};
                            Array.from(form.current).forEach(
                                (input) => (data[input.id] = input.value)
                            );
                            alert(JSON.stringify(data));
                        }}
                    >
                        Submit
                    </Button>
                </p>
            </div>

            <h2>Actions</h2>
            <div>
                <Actions onAction={(type) => alert(type)} />
            </div>

            <h2>Dialog</h2>
            <DialogExample />
            <h2>Excel</h2>
            <Excel
                schema={schema}
                initialData={schema.name.samples.map((_, idx) => {
                    const element = {};
                    for (let key in schema) {
                        element[key] = schema[key].samples[idx];
                    }
                    return element;
                })}
                onDataChange={(data) => {
                    console.log(data);
                }}
            />
        </div>
    )
}

export default Discovery;