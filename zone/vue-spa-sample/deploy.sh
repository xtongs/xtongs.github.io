#!/usr/bin/expect -f
set password 12345678
spawn bash -c "scp -r dist/* root@111.11.111.111:/var/www/html/"
set timeout 100
expect "root@111.11.111.111's password:"
set timeout 100
send "$password\r"
set timeout 100
send "exit\r"
expect eof
