import React, {useState} from 'react';

//Container??
function example() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times!</p>
            <button onClick={() => setCount(count+1)}>
                Click Me
            </button>
        </div>
    );
}

export default example;