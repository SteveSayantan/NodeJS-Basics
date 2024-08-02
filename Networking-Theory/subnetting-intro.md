Due to the mess created by Classful Addressing, gradually, we were on the verge of running out of IP Addresses. But, the followings saved our ass: 

## Private IP Addresses

A chunk of Public IP Addresses were taken out of the class A,B,C and they were declared as Private IP Addresses. Each of them has the same default subnet mask as their corresponding class.

| Class | Private IP Range                | Default Subnet Mask |
| :---- | :------------------------------:| -------------------:|
| A     |   10.0.0.0 - 10.255.255.255     | 255.0.0.0           |
| B     |   172.16.0.0 - 172.31.255.255   | 255.255.0.0         |
| C     |   192.168.0.0 - 192.168.255.255 | 255.255.255.0       |

This somewhat solves the shortage of IP addresses because the same private IP address can be assigned to multiple devices in different networks i.e. they are not unique. However, using private IP addresses we can not connect to the Internet. 

## Network Address Translation

Think of the network at our home. Each of the devices in our home can not have a public IP address. The router, to which all of them are connected, assigns private IP addresses to each of them using DHCP e.g. currently, the IP address of my pc is **192.168.0.100** . Since, it is a private IP address, we can not connect to the internet using it.

Our ISP assigns us only one Public IP address e.g. (23.292.10.1). Whenever any of our home devices wants to connect to the Internet, the router (using NAT) translates the private IP address of the device to the public IP assigned to us i.e. 23.292.10.1 .

This means, all of our devices, when try to connect to the Internet, have the same public IP as if they all are a single identity collectively. 

Any server on the Internet can only see the Public IP address, irrespective of the device we use to connect with it. Any response from the Internet is forwarded to the intended device by the router.

## Virtual Private Network

Using VPN, we can route all our internet traffic to another remote machine, and that machine will connect to the internet on behalf of our IP address. As a result, we can hide our public IP from being exposed.

IP addresses are divided by country,region and city. Check out [this](https://lite.ip2location.com/ip-address-ranges-by-country) .


## IPv6 Address Representation Format

Check out this [doc](https://www.ibm.com/docs/en/i/7.5?topic=concepts-ipv6-address-formats)

