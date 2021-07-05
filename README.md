# kaholo-trigger-zabbix
A kaholo trigger for integration with Zabbix Webhooks.

#### Versions
This works with Zabbix 1.8.x or greater - including 2.2, 2.4, 3.x. and 4.x!

Installation
------------

### Within the Zabbix web interface

When logged in to the Zabbix servers web interface with super-administrator privileges, navigate to the "Administration" tab, access the "Media Types" sub-tab, and click the "Create media type" button.

You need to create a media type as follows:

* **Name**: Kaholo
* **Type**: Script
* **Script name**: kaholo.sh

...and ensure that it is enabled before clicking "Save", like so:

![Zabbix Media Type](https://pictures.ericoc.com/github/zabbix-mediatype.png "Zabbix Media Type")

However, on Zabbix 3.x and greater (including 4.x), media types are configured slightly differently and you must explicity define the parameters sent to the `kaholo.sh` script. On Zabbix 3.x and 4.x, three script parameters should be added as follows:

* `{ALERT.SENDTO}`
* `{ALERT.SUBJECT}`
* `{ALERT.MESSAGE}`

...as shown here:

![Zabbix 3.x Media Type](https://pictures.ericoc.com/github/zabbix3-mediatype.png "Zabbix 3.x Media Type")

Then, create a "Kaholo" user on the "Users" sub-tab of the "Administration" tab within the Zabbix servers web interface and specify this users "Media" as the "kaholo" media type that was just created with the Slack.com channel ("#alerts" in the example) as seen below:

![Zabbix User](https://pictures.ericoc.com/github/zabbix-user.png "Zabbix User")

Finally, an action can then be created on the "Actions" sub-tab of the "Configuration" tab within the Zabbix servers web interface to notify the Zabbix "Kaholo" user ensuring that the "Subject" is "PROBLEM" for "Default message" and "RECOVERY" should you choose to send a "Recovery message".

Keeping the messages short is probably a good idea; use something such as the following for the contents of each message:

	{TRIGGER.NAME} - {HOSTNAME} ({IPADDRESS})

More Information
----------------
* [Zabbix 2.2 custom alertscripts documentation](https://www.zabbix.com/documentation/2.2/manual/config/notifications/media/script)
* [Zabbix 2.4 custom alertscripts documentation](https://www.zabbix.com/documentation/2.4/manual/config/notifications/media/script)
* [Zabbix 3.x custom alertscripts documentation](https://www.zabbix.com/documentation/3.0/manual/config/notifications/media/script)
* [Zabbix 4.x custom alertscripts documentation](https://www.zabbix.com/documentation/4.0/manual/config/notifications/media/script)

## Method: Zabbix Webhook
**Webhook URL**: `<Kaholo URL>/zabbix/webhook` 
Catches alerts sent from zabbix to this webhook.

### Parameters
1. Secret (Vault) **Optional** - If specified, check secret provided by request matches the secret provided here.
2. Severity Level (String) **Optional** - If specified accept only alerts with the specified severity.
