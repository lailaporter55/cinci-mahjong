//user can only make booking while logged in
//user can view bookings while logged out

//booking is similar to /maker in domo and the review 
const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const handleParty = (e, onPartyAdded) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#partyName').value;
    const time = e.target.querySelector('#partyTime').value;
    const attendees = e.target.querySelector('#partyAttendees').value;

    if (!name || !time || !attendees) {
        helper.handleError('All fields are required');
        return false;
    }

    helper.sendPost(e.target.action, { name, time, attendees }, onPartyAdded);
    return false;
}

//this actually isnt needed bc the parties are already made 
const PartyForm = (props) => {
    return (
        <form id="partyForm"
            onSubmit={(e) => handleParty(e, props.triggerReload)}
            name="partyForm"
            action="/book"
            method="POST"
            className="partyForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="partyName" type="text" name="name" placeholder="Party Name" />
            <label htmlFor="time">Time: </label>
            <input id="partyTime" type="text" name="time" placeholder="Party Time" />
            <label htmlFor="attendees">Attendees: </label>
            <input id="partyAttendees" type="number" min="1" name="attendees" />
            <input className="makePartySubmit" type="submit" value="Create Party" />

        </form>
    );
};

//shows the list of parties the user has booked 
const PartyList = (props) => {
    const [parties, book] = useState(props.parties);

    useEffect(() => {
        const loadPartiesFromServer = async () => {
            const response = await fetch('/getParties');
            const data = await response.json();
            book(data.parties);
        };
        loadPartiesFromServer();
    }, [props.reloadParty]);

    if (parties.length === 0) {
        return (
            <div className="partyList">
                <h3 className="emptyParty">No Party Yet!</h3>
            </div>

        );
    }
    const partyNodes = parties.map(party => {
        return (
            <div key={party.id} className="party">
                <img src="/assets/img/mahjongParty.jpg" alt="mahjong party" class="mahjongParty" />
                <h3 className="partyName">Name: </h3>
                <h3 className="partyTime">Time: </h3>
                <h3 className="partyAttendees">Attendees: </h3>
                <h3 className="partyPrice">Price: </h3>
            </div>
        );
    });

    return (
        <div className="partyList">
            {partyNodes}
        </div>
    )
};

//gets called when buttons in book are pressed
const addToCart = (tile) => {
    const exists = cart.find(item => item.id === tile.id);
    if (exists) {
        return (
            setCart(
                cart.map(item =>
                    item.id === tile.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            )
        );
    } else {
        return (
            setCart([...cart, { ...tile, quantity: 1 }])
        );

    }
};

//all booking options will be shown to the user even if they are not logged in 
const App = async (props) => {
    const [reloadParty, setReloadParty, addToCart] = useState(false);
    <div id="book">
            <PartyForm triggerReload={() => setReloadParty(!reloadParty)} />
        </div>
    if (props.isLoggedIn) {
        <div class="addToCart">
        <button onClick={() => addToCart(tile)}>Add to Cart</button>
        </div>
    }

    return (
        <div id="parties">
            <PartyList parties={[]} reloadParty={reloadParty} />
        </div>
    );
};

const init = async () => {

    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
};

window.onload = init;