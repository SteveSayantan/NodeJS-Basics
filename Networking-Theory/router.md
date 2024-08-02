Router is used to connect to another network. Refer to [this](https://youtu.be/p9ScLm9S3B4?si=ZInKIMpJol-_AMae)

### Address Resolution Protocol

When a computer tries to send data to another, it must known the MAC address of the receiver. This is because computers and other devices (within a particular network) are connected using switches and switches can not deal with IP address. ARP helps get the MAC address of the receiver so that switches can work properly.

Steps involved in ARP:

Suppose the sender wants to send a message to the receiver present in the same network:

- The sender generates a broadcast message that consists of the **sender IP** 10.1.1.3 (say) , **receiver IP** 10.1.1.2 (say), **sender MAC** address and a **broadcast MAC** address which looks like FFFF.FFFF.FFFF

- This broadcast message is sent to the switch and switch sends it to all the devices connected to it (except the sender).

- The device with the same IP as receiver IP (i.e. 10.1.1.2) sends a response message to the switch. This response contains the MAC address of that device. Switch sends this response to the sender.

- Now, the sender knows the MAC address of the receiver.

- Sender sets the **receiver MAC** address and sends the original message (containing **sender IP & MAC** , **receiver IP & MAC** ) as a frame to the switch and it sends that to the specific MAC address.

### How does a Router work:

Suppose, the sender ,having IP 10.1.1.3 (say), wants to send a message to the receiver, having IP 23.227.38.65 (say) present in a different network:

- The sender generates a broadcast message that consists of the **sender IP** 10.1.1.3 (say), **sender MAC** address and a **broadcast MAC** address which looks like FFFF.FFFF.FFFF . Since, the **receiver IP** is in a different network, this broadcast message contains the gateway IP 10.1.1.1 (say) as **receiver IP** . 

- This broadcast message is sent to the switch and switch sends it to all the devices connected to it (except the sender). 

- Now, the router (i.e. the gateway), which is already connected to the switch, responds with a message containing the MAC address of the router itself. The switch sends this response to the sender.

- The sender sends the original message to the switch. This message contains the **sender IP & MAC**, **receiver IP** and **router's MAC** . The switch sends this message to the router.

- The router decapsulates the packet, reads the IP address. It creates a new copy of the message which contains the **sender IP & receiver IP**, **current router's MAC** and **next router's MAC** . It determines the next hop (say, router) using its routing table. This message is sent to the next hop.

  - This process repeats itself till the message reaches the destination router.

  - When the message jumps from one node to the next, the IP address remains the same but the MAC address keeps changing as it holds the physical address of the next hop.

  - But the IP address holds the logical address of the final host which might not be one hop away. Hence, host to host delivery is done by network layer and hop to hop delivery is done by datalink layer.

- When the message reaches its final hop, the router realizes that it does not have the L2 address to forward this message. Therefore, it starts a broadcast message which contains the **router's IP & MAC**, **receiver IP** i.e. 23.227.38.65 and a **broadcast MAC** address which looks like FFFF.FFFF.FFFF .

- This broadcast message is sent to the switch (which is connected to that router) and switch sends it to all the devices connected to it (except the router).

- The receiver (i.e. 23.227.38.65) sends a response message to the switch. This response contains the MAC address of that device. Switch sends this response back to the router.

- Now, router knows the MAC of the receiver. So, it sets the **receiver MAC** and sends the message to the switch. The switch sends it to the receiver.

- The router maintains a map which associates several groups of IPs with different physical ports on the router. It also stores the MAC addresses to avoid sending broadcast messages everytime.


Remember, each physical port of the router has its own MAC address.

To connet to an DNS server also, the sender needs to send a broadcast message first to get the MAC address of the DNS server. After that, the sender can communicate with the DNS server.