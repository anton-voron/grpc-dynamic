const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');

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


class ClientApp {

    sendReqeust(client) {
        const request = {
            greeting: {
                first_name: "Jerry",
                last_name: "Tom",
            }
        }

        client.greet(request, (error, response) => {
            if (!error) {
                console.log(`Greeting response: ${response.result}`);
            } else {
                console.error(error);
            }
        });
    }

    main() {
        const client = new packageDefinition.Greet('127.0.0.1:50051', grpc.credentials.createInsecure());
        this.sendReqeust(client);
    }
};

const clientApp = new ClientApp();
clientApp.main();