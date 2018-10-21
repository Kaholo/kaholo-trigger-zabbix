#!/bin/bash

# kaholo web-hook URL and secret
kaholoUrl='CHANGEME'		# example: https://kaholo.io
secret=='CHANGEME'

url = '$kaholoUrl/zabbix/webhook'

## Values received by this script:
# To = $1 (channel or user to send the message to, specified in the Zabbix web interface; "@username" or "#channel")
# Subject = $2 (usually either PROBLEM or RECOVERY/OK)
# Message = $3 (whatever message the Zabbix action sends, preferably something like "Zabbix server is unreachable for 5 minutes - Zabbix server (127.0.0.1)")

# Get the channel or user ($1) and Zabbix subject ($2 - hopefully either PROBLEM or RECOVERY/OK)
to="$1"
subject="$2"

# The message that we want to send to Slack is the "subject" value ($2 / $subject - that we got earlier)
#  followed by the message that Zabbix actually sent us ($3)
message="$3"

# Build our JSON payload and send it as a POST request to the Slack incoming web-hook URL
payload="payload={\"to\": \"${to//\"/\\\"}\", \"secret\": \"${secret//\"/\\\"}\",\"severity\": \"${subject//\"/\\\"}\", \"message\": \"${message//\"/\\\"}\"}"
curl -m 5 --data-urlencode "${payload}" $url -A 'kaholo-zabbix-alertscript'