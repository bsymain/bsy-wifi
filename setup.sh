


sudo ls

# Install nodejs
./setup_node.sh


# Creating WiFi Hotspot
sudo apt install -y dnsmasq
nmcli connection add type wifi con-name "BSY-Hotspot"  autoconnect no  wifi.mode ap  wifi.ssid "BSY-Hotspot" ipv4.addresses 192.168.1.1/24  ipv4.method shared  ipv6.method shared
sudo sh -c "echo 'address=/#/192.168.1.1' > /etc/NetworkManager/dnsmasq-shared.d/captive.conf"

# Add script to sudoers
sudo EDITOR="$(pwd)/append_sudoers.sh" visudo



# Create temporary file
mkdir -p tmp/


# Install npm package
npm install express
