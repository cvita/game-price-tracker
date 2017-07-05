// A reducer takes in two things:

// 1. the action (info about what happened)
// 2. copy of the current state

function posts(state = [], action) { // state is given a default value here (es6)
    switch (action.type) {
        case 'INCREMENT_LIKES':
            // return the updated state
            console.log('Incrementing likes');
            const i = action.index;
            return [
                ...state.slice(0, i), // before the one we're updating
                { ...state[i], likes: state[i].likes + 1 },
                ...state.slice(i + 1) // after the one we're updating
            ];
        default:
            return state;
    }
}

export default posts;
