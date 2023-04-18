const amqp = require('amqplib');

async function consumeMessages() {
    const connection = await amqp.connect('amqp://localhost');

    const channel = await connection.createChannel();

    await channel.assertExchange('personExchange', 'direct');

    const q = await channel.assertQueue('InfoQueue');

    await channel.bindQueue(q.queue, 'personExchange', 'Info');


    channel.consume(q.queue, (msg) => {
        
        const data = JSON.parse(msg.content);
        console.log(data);
        channel.ack(msg);
    });

}

consumeMessages();
