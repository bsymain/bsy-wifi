


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

export DISTRO=focal-stable
wget -O - apt.radxa.com/$DISTRO/public.key | sudo apt-key add -

sudo sh -c  "echo 'deb http://apt.radxa.com/focal-stable/ focal main' >> /etc/apt/sources.list.d/apt-radxa-com.list"
sudo  sh -c "echo 'deb http://apt.radxa.com/focal-testing/ focal main' >> /etc/apt/sources.list.d/apt-radxa-com.list"

sudo apt install -y libmraa 

