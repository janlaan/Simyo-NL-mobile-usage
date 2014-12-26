#!/usr/bin/python
import urllib, urllib2, json, cgi, sys
from cookielib import CookieJar
form = cgi.FieldStorage()

print("Content-Type: application/json\r\n")

if "username" not in form or "password" not in form:
        print "{}"
        sys.exit()
values = {
        'username': form['username'].value,
        'password': form['password'].value,
        'ojt'     : 'ZFRR-H1QB-1B3G-H8H9-ESR3-OIO2-4ZU3-8S4T'
}

data = urllib.urlencode(values)

headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
}

cj = CookieJar()
opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))
res = opener.open("https://mijn.simyo.nl/selfcare2/servlet/Login", data);

out = res.read()
import cgi

if "deze maand heb ik nog" in out:

        res2 = opener.open("https://mijn.simyo.nl/selfcare2/servlet/UsageUnits");
        out2 = res2.read()
        print out2
else:
        print "{}"
