Transport layer lies in the devices. Its role is to take the data from the network and send to the application it belongs to (or, vice-versa) within the device.

## Transport Layer

- Multiplexing: Allows us to send multiple types of messages (e.g. file, video call,message) simultaneously via one medium.

- Demultiplexing: Allows us extract multiple types of messages (e.g. file, video call,message) simultaneously, received from the sender and send them to their corresponding applications.

- In the Sender side, different apps hand over their data to the sockets and in the Receiver side, after demultiplexing, socket help to send data to corresponding apps. Sockets have port number. Transport layer attaches these socket port numbers to every packet.

- Transport layer also takes care of congestion control by in-built algorithms.

- Transport layer uses checksum to avoid data corruption.

- To avoid data loss, this layer uses timers.

- To solve issues related with duplicated packets, we use sequence number (an unique identification number) for each packet.

## UDP 

- Data may or may not be delivered, may not be in order.
- It is a connectionless protocol
- UDP uses checksums and if there is any error, it won't care.
- A UDP packet (having size 2^16 - 1 bytes) contains

  - Source Port Number (2 bytes)
  - Destination Port Number (2 bytes)
  - Length of Datagram (2 bytes)
  - Checksum (2 bytes)
  - Data (Remaining part)

- It is very fast
- DNS uses UDP
- Used for Gaming, Video Conferencing

To see incoming packets we can use **tcpdump** command.

`sudo tcpdump -c 5` shows 5 packets.

## TCP 

- It is a Transport Layer Protocol

- Application layer sends lots of raw data. TCP segments this data i.e. divides in chunks and headers. It gives those to the Network layer where they may get further divided into smaller chunks. It may also collect the data from network layer.

- It provides congestion control.

- Takes care of 
  - when data does not arrive.
  - maintains the order of the data using sequence numbers.

- It is a connection-oriented protocol.

- It also provides error-control.

- It is full duplex in nature i.e. two computers connected via TCP can send files or receive files or do both simultaneoulsy.

- A TCP connection can be established between only two computers.

## 3-way Handshake

A connection between a client and a server is established using the following steps:

-  Client sends a connection request to the server, which contains a Synchronization Flag (a value inside a header) and a sequence number (random number) . 

-  Server returns a Synchronization Flag, an Acknowledgement Flag, an Acknowledgement number and a sequence number to the client.
   - _Acknowledgement Number = Sequence number received from client at the previous stage + 1_ 
   - The sequence number is also calculated based on the sequence number received from the client at the previous stage.

-  Finally, client sends an Acknowledgement Flag, an Acknowledgement number and a sequence number to the server.
   - _Acknowledgement Number= Sequence number received from server at the previous stage + 1_ 
   - The sequence number is also calculated based on the sequence number received from the server at the previous stage.

## Network Layer

- Here we work with routers.

- In network layer data travels in packets.

- Every router has a Network Address.

- A packet contains the Network Address of the source, destination and the information.

- A router (belonging to ISPs) sends packets from one network to the other using Forwarding Table and Routing Table till the packet reaches its destination router. This is known as Hop-by-hop forwarding.

- Control Plane creates Routing tables. Routers are considers are nodes and the links between the routers are edges of graph.

- Two types of routing is there

  - Static Routing: Requires manual operation, not adaptive
  - Dynamic Routing: It is adaptive.

- A IP address e.g. `192.168.2.30` consists of two parts,
  - `192.168.2` is Network Address
  - `30` is device address

- In Network layer, Internet Protocol is used.

- Types of IP address:
  - IPv4 : 32-bit address, consists 4 words each of 8 bits
  - IPv6 : 128-bit address, consists of 8 words each of 16 bits

- IP addresses are divided into 5 classes

  - Class A : **0.0.0.0** - **127.255.255.255**
  - Class B : **128.0.0.0** - **191.255.255.255**
  - Class C : **192.0.0.0** - **223.255.255.255**
  - Class D : **224.0.0.0** - **239.255.255.255**
  - Class E : **240.0.0.0** - **255.255.255.255**

- Subnet and Subnet masking

- Initially, IP addresses were provided on first-come-first-serve basis but now, it is provided based on region to minimize the latency.

- Reserved IP Addresses:

  - 127.0.0.1 : It is used as loopback address

- TTL or Time-to-Live refers to the amount of time or “hops” that a packet can take inside a network before being discarded by a router, until it reaches its destination.

- Middle boxes e.g. firewalls

- Network Address Translation or NAT

- DHCP

- ARP (Address Resolution Protocol) Cache

- MAC Address



