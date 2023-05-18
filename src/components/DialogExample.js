import { useState } from "react";
import Button from "./Button";
import Dialog from "./Dialog";

function DialogExample() {
    const [example, setExample] = useState(null);
    return (
        <>
            <p>
                <Button onClick={() => setExample(1)}>Example 1</Button>{' '}
                <Button onClick={() => setExample(2)}>Example 2</Button>
            </p>

            {example === 1 ? (
                <Dialog
                    modal
                    header="Out-of-the-box example"
                    onAction={(type) => {
                        alert(type);
                        setExample(null);
                    }}>
                    Hello, dialog!
                </Dialog>
            ) : null}

            {example === 2 ? (
                <Dialog
                    header="Not modal, custom dismiss button"
                    hasCancel={false}
                    confirmLabel="Whatever"
                    onAction={(type) => {
                        alert(type);
                        setExample(null);
                    }}>
                    anything goes here, like a <Button>a button</Button> for example
                </Dialog>
            ) : null}
        </>
    );
}

export default DialogExample;