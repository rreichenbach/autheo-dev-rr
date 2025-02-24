ifconfig | grep "inet " && docker inspect autheo-devhub-webui | grep "IPAddress"
        inet 127.0.0.1 netmask 0xff000000
        inet 192.168.1.58 netmask 0xffffff00 broadcast 192.168.1.255
            "SecondaryIPAddresses": null,
            "IPAddress": "",
                    "IPAddress": "172.27.0.3",

connect to the webui from another computer on your network by entering this URL in the browser:
http://192.168.1.58

This works because:

192.168.1.58 is your host machine's IP address on the local network
Port 80 is the default HTTP port, so it doesn't need to be specified in the URL
The Docker container's port 80 is mapped to the host's port 80, making it accessible from other machines on the network