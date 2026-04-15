// This is to emulate how middlewares are executed in libraries like express. 

//Whenever we use app.use(), a callback fn. is pushed in an array that holds middlewares

let middlewareArr = [(cb) => { console.log("first middleware"); cb() }, (cb) => { console.log("second middleware"); cb() }];

// this is the response we send to the client
const res = () => { console.log("final response") }

function runMiddlewares() {

    if (middlewareArr.length < 1) {
        res();
        return;
    }

    let promise = Promise.resolve();

    for (let i = 0; i < middlewareArr.length; i++) {

        promise = promise.then(() => new Promise((resolve, reject) => {
            middlewareArr[i](resolve);
        }))

    }

    promise.then(res);

}

runMiddlewares()