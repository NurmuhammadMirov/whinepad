import Excel from "./Excel";
import Logo from "./Logo";
import Body from "./Body";
import Button from './Button';
import Suggest from './Suggest';
import './Discovery.css';

function Discovery() {
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
        </div>
    )
}

export default Discovery;