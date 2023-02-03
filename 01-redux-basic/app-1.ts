


// Accion
interface Action {
    type: string;
    payload?: any;
};

// const incrementadorAction: Action = {
//     type: 'INCREMENTAR'
// };

function reducer( state = 10, action: Action) {
    
    // if (action.type === 'INCREMENTAR'){
    //     return state +=1;
    // }

    switch ( action.type){
        case 'INCREMENTAR':
            return state +=1;

        case 'DECREMENTAR':
            return state -=1;

        case 'MULTIPLICAR':
            return state * action.payload;
        
        case 'DIVIDIR':
            return state / action.payload;

        default:
            return state;
    }
    
    // return state;
}

// Usar reducer

const incrementadorAction: Action = {
    type: 'INCREMENTAR'
};

console.log(reducer(10, incrementadorAction)); // resultado de 11

const decrementadorAction: Action = {
    type: 'DECREMENTAR'
};

console.log(reducer(10, decrementadorAction)); // resultado de 9

const multiplicarAction: Action = {
    type: 'MULTIPLICAR',
    payload: 2,
};

console.log(reducer(10, multiplicarAction)); // resultado de 20

const dividirAction: Action = {
    type: 'DIVIDIR',
    payload: 2,
};

console.log(reducer(10, dividirAction)); // resultado de 5