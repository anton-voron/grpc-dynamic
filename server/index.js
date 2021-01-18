const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');
const { RSA_PKCS1_OAEP_PADDING } = require('constants');

// grpc service definiiton for greet 

const greetProtoPath = path.join(__dirname, "..", "protos", "greet.proto");
const greetProtoDefinition = protoLoader.loadSync(greetProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    default: true,
    oneofs: true
});
const packageDefinition = grpc.loadPackageDefinition(greetProtoDefinition).greet;


class App {

    greet(socket, callback) {
        const { first_name, last_name } = socket.request.greeting;
        console.log(socket.request);
        callback(null, {
            result: `Hello ${first_name} ${last_name}`
        })
    };


    main() {
        const server = new grpc.Server();
        server.addService(packageDefinition.Greet.service, {
            greet: this.greet
        });
        server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
        server.start();
        console.log("Server Running at http://127.0.0.1:50051");
    }
};

const app = new App();
app.main();