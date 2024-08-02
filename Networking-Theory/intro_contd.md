## Ports

Port numbers are of 16 bits, therefore 2^16 ~ 65000 ports are available. 
- 0 - 1023 ports (aka system ports or well-known ports) are reserved, e.g. http uses port 80 . To use these ports we might require our app to be run with root priviledges (i.e. using **sudo**). Not recommended to be used.

- 1024 - 49151 ports are known as User Ports. They are registered for specific applications, e.g. MongoDB uses 27017, SQL uses 1433

- Remaining ones are dynamic/private ports. They are often used for temporary purposes, and applications can dynamically choose an available port from this range.

- We can listen to multiple applications on a single port if each of those uses different transport layer protocol, e.g. we can run a TCP and UDP app simultaneously on port 8000 .

## Mode of Connection

- Physical: Optical fibre cable, Coaxial Cable
- Wireless: Bluetooth, Wifi, 3G, 4G, 5G etc.

## Important Terms:
Google for more info.

- LAN
- MAN
- WAN

Internet can be defined as a collection of these three.

- SONET : Synchronous Optical Networking, carries data using Optical fibre cables, hence can cover larger distances.

- Frame Relay: It is a way to connect LAN to Internet.
- MODEM
- Tier 1 ISP: In India, Tata
- Tier 2 ISP: In India, Airtel, JIO

- Bus Topology
- Ring Topology
- Star Topology
- Tree Topology : Combination of Bus and Star topologies
- Mesh Topology

Read important CCNA articles [here](https://www.ccnablog.com/lessons/)

## OSI Model

Open Systems Interconnection Model is a theoretical model which defines how two or more computer communicate with each other. Every layer has its protocol, devices etc.

It has 7 layers, they can be remembered as **Please Do Not Throw Sausage Pizza Away** (in bottom-up manner)

- Application Layer : It contains the software which the user directly communicates with. HTTP, HTTPS,FTP, SMTP etc. are used by this layer. This layer directs the data to the correct application instace.

- Presentation Layer : It converts the data in correct format (e.g. ASCII,GIF,JPEG), compresses the data, encrypts/decrypts the data using SSL.

- Session Layer : It helps setting up and managing the connections and enables sending and receiving of data. It also terminates the connected sessions (when we are done) . It performs authentication, authorization before establishing the session. 

- Transport Layer :  Uses UDP or TCP. The header attached by this layer contains info about the port number and protocol used (UDP or TCP). It is responsible for process-to-process delivery. It takes care of the following:

  - Segmentation: Data received is divided into small parts aka segments. Each segment will contain the port number of the source and the destination, as well as a sequence number (for reassembling the segments in correct order)

  - Flow Control: It basically controls the amount of the data being transported. 

  - Error Control

- Network Layer: It transmission of the received data segments from one computer to the other located in another network. Router is present at this layer. IP addressing done in this layer is called logical addressing. It adds the source and destination IP address to each segment and forms IP packets.

- Datalink Layer: Adds MAC address to the packets, converts it in a frame. Switch is present at this layer. It also performs Access Control, Flow Control and Error Control. This layer adds both header and trailer. It performs hop-to-hop delivery.

  - Difference b/w Switch & Hub :
  
    - A Hub is not intelligent. When a data frame arrives at any of its port, it basically rebroadcasts that to all the devices connected to it. It works at physical level.

    - However, a Switch is an intelligent device. It can learn and store the physical addresses of the devices that are connected to it. Whenever a data packet arrives, it is only sent to the intended device.
      For more details, checkout [Difference b/w Switch and Hub](https://youtu.be/1z0ULvg_pW8?si=xpCqHKTsz3nkRuQI) and [What is Switch](https://youtu.be/9eH16Fxeb9o?si=pFlWXhD9abzx0ztf)

- Physical Layer: This layer contains hardwares, e.g. cables etc. It converts the frames into signals (electrical, light or radio) for transporting or vice-versa.

For detailed explanation, checkout [OSI & TCP/IP Models](https://youtu.be/Pje0l5r7_lk?si=aPpHofugwzi2ZHfZ) and [OSI Model](https://youtu.be/0Rb8AkTEASw?si=UIzr34D5jHXC0w7H) .

Also, checkout [Encapsulation](https://youtu.be/g_-vbdv-wT4?si=843wgQrDQ4D2EZQS)


## TCP/IP Model
OSI model is not used in the real world. Applications use TCP/IP model for communication.

It has 4 layers such as 

- Application Layer

- Transport Layer

- Internet Layer (or, Network Layer)

- Link Layer ( Later it was split into **DataLink Layer** and **Physical Layer** )
 

## Types of Protocols

Some of the web protocols under TCP/IP is:

- http : HTTP uses TCP in Transport layer. It is a stateless protocol i.e. server will not store any information about the client by default.
  - Different http methods e.g. GET,POST,PUT etc. tell the server what to do with a particular request . 
- DHCP
- FTP 
- SMTP - It is used to send emails.
- POP3 & IMAC - They are used to receive emails.
- SSH
- VNC - Virtual Network Control

Besides TCP/IP protocols, another protocol is

- TelNet : It enables users to connect to remote host or device using TelNet client. It uses port 23. 

- UDP : It is a stateless connection, data loss may occur during the lifetime of the connection.

## Important Terms

- Socket : It can be defined as an interface between a process and the internet.

- Ephemeral Ports: If multiple instances of a process are in use, they will be assigned random port numbers till they are alive.

- Status Codes: When we send request to the server, we need Status Codes to know whether the request was successful or not. Click [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) to read more about it.

- Cookie : It is a unique string stored in the client's browser. When we visit a website for the first time, cookie is set. Thereafter, the browser itself sends the associated cookie with every request to a particular server.

  - Third-Party Cookies: Cookies that are set for urls that we may not have visited yet (due to misuse of cookies by websites we visit).

## How Email Works

To send and receive emails, we use SMTP and POP3  protocols at the Application level. But at the Transport level we use TCP.

- If the sender and receiver are using different clients (e.g. Yahoo and Gmail respectively) for sending emails, in that case
  - Email is first sent to the sender's SMTP server (i.e. Yahoo's SMTP server) first.

  - Then the email is sent to the receiver's SMTP server (i.e. Googles's SMTP server) .

  - Now, the receiver can access the email using his client .

- If sender and receiver are on the same client (e.g. Gmail), the mail is sent directly.

We can use the **Name Server Lookup** command to get the name and IP addresses of the SMTP servers for various domains such as google, yahoo etc. E.g.,

```
PS C:\Users\Sayan> nslookup -type=mx gmail.com 

Server:  dns.google
Address:  8.8.8.8

Non-authoritative answer:
gmail.com       MX preference = 10, mail exchanger = alt1.gmail-smtp-in.l.google.com
gmail.com       MX preference = 20, mail exchanger = alt2.gmail-smtp-in.l.google.com
gmail.com       MX preference = 40, mail exchanger = alt4.gmail-smtp-in.l.google.com
gmail.com       MX preference = 30, mail exchanger = alt3.gmail-smtp-in.l.google.com
gmail.com       MX preference = 5, mail exchanger = gmail-smtp-in.l.google.com

```
here, `-type=mx` indicates **mail exchange** i.e. the SMTP servers, `gmail.com` is the **domain name**

- For downloading emails, we use POP3 protocol. 

  - First the client connects to the POP server and performs authorization.
  - After that, the client can get his emails and perform other activities such as deletion etc.
  - While using POP, folders like **Sent Items** , **Draft** are not in sync.

- For downloading emails, we also use Internet Message Acess Protocol i.e. IMAP .

  - It allows accessing emails from multiple devices.
  - Multiple directories can be synced.

## Domain Name System

Our phone contains numerous phone numbers each having a name associated with it. While calling, we use the names to find a particular number.

Similarly, every server with an IP address also has a name associated with it. But to map between the name and the IP address, we need DNS.

When we enter **google.com** , DNS is used by HTTP protocol to find the IP address of Google's server. DNS is basically similar to a directory/database that stores IP addresses for domain names.

- We have a large number of IP addresses, hence, storing all those with their domain names in a single database is neither possible nor efficient. 

- Hence, domain names are divided into various classes. e.g. `mail.google.com` here, **mail** is the sub-domain, **google** is the second-level domain, **com** is the top-level domain. There are multiple databases for each of these categories.

- At the top, we have Root DNS servers. Checkout [this](root-servers.org) to know, who maintain these Root DNS servers. They provide the IP addresses of the TLD servers.

- Below that, we have Top-level Domain Servers, maintained by ICANN . Examples of TLD are **com**, **org**, **net**, **edu** etc. TLD server provide the IP addresses of the actual server.

- When we visit any website for the first time, its IP address is stored in local cache in our computer.

- When we enter an url in the browser,

  - the local cache is checked for the IP address.
  - if not found, the local DNS server is checked. Our ISPs can be our local DNS server, where all the info about our visited websites are stored.
  - If not found, the Root DNS server is requested. With the received IP addresses, TLD server is requested and the required IP address is found.

- We can use `dig` command for interrogating DNS name servers. e.g. `dig facebook.com` to query facebook DNS servers.

## Theoretical Topics

- HTTP (Working and general idea about message format, Proxy server)
- HTTPS
- FTP
- DNS

