## History

Back in the days when we didn't have networking technologies such as networking cables, routers etc. , there were no connection between any two computers in the world. 
To transfer information, we had to use physical devices such as floopy,CD,pen drive etc.

## Connecting Two or more Computers (Locally)

We need

- Ethernet Cable : It is a cable that simply moves bits from one place to the other.

- Switch : It is one of the basic or fundamental thing in networking after cables. 

- Networking Card: To accept data from the ethernet cable, we need a Networking Card which has a unique address associated with it, known as MAC Address(48 bits in size, expressed in Hex) . It shouldn't be disclosed. Ex: `b7:32:97:f1:5b:3c`

Now, we have to connect that switch to our computers (two or more) using a special cable that comes with the switch and then you would have to log into the switch and manually configure it.

Information is sent over a network in packets (piece of information) . First a packet is sent to the switch and the switch sends the packet to its destination and it is received through the networking card of the destination computer. After that, the information is pulled out and processed further.

A packet contains a *source* , *destination*, and the *information* to be transferred.

## Connecting Numerous Computers (Globally)

If we have millions of computers or millions of other networks, it will be really impractical to try to use *switches* and connect millions of cable to connect all these computers.

We add a layer on top of the switches i.e. *routers* . Now these routers can be connected together using cables. Router decides which of the connected devices made a particular request via Network Access Translator.

Routers, though understand MAC address, work mainly with IP Address. Each router has an Global IP Address. It is basically a unique address assigned to a specific device on a network . 

Therefore, each computer on each router will have a unique IP address associated with it. The router's job is to assign IP addresses to all the computers connected to it (using Dynamic Host Configuration Protocol) and it will also route data from one network to the other or within the same network.

If two or more devices are connected to the same network, the first two portions of their IP addresses are identical. 

So this is what the internet really is. It's just billions of computers that are connected together using cables switches and routers and each one of them have their network card so they could now connect to the network either using an ethernet cable or maybe using Wi-Fi or even using cellular connection like 4G or 5G. As now each one of these devices have their own unique IP address so as long as it is connected to the internet it means that it can connect to this huge vast Network and just by specifying an IP address of a computer or a device, given that computer with that IP address is sending some information through that IP address, they can talk to each other . 

Apart from the IP address we also need to know the port because a computer could maybe send various informations on its different ports e.g. on Port 3000 it might send a website and maybe on port 6000 it send an image. Therefore, port number decides which application will receive the response.

## Some known Scenarios

If we are connected to a WiFi, that means we are connected to a router and that router is connected to the whole internet.

Generally, to connect a device to this Network, we have to rely on some companies known as ISPs . We need to buy some plan and connect our router to their cables that are somehow connected to the whole network. 

The router we buy for our home is not really a router, it is a combination of router and a switch. Whenever, we connect a device to our router, an IP Address is assigned to it.

`127.0.0.1` is called localhost or loopback address. The information sent through this IP address is sent back to the sender itself.

Two devices can connect only if at least one of them is opening a port and sending some info across that port. If neither of them are accepting any connections, nothing will happen.

## Protocols

To send different types of data over network, there are different rules. These rules are implemented by Internet Society. e.g.

- TCP : Transmission Control Protocol will ensure the data reaches its destination completely without being corrupted.
- UDP : User Datagram Protocol does not care if 100% of data is reaching to another person. Ex. Video Conferencing
- HTTP: It defines the format of data being transferred between server-clients and the process of transferring the data. It is a client-server protocol.