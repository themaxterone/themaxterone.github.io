---
layout: single
title: Script-UsrGrp
excerpt: "Script Users & Groups Linux"
date: 2022-06-08
classes: wide
header:
  icon: /assets/images/scripts/script.webp
  teaser_home_page: true
  teaser: /assets/images/scripts/script.png
categories:
  - Scripts
tags:
  - Script
  - Linux

---



[Repository](https://github.com/themaxterone/scriptUsrGrp) 

[UsrGrp.sh bash script](https://github.com/themaxterone/scriptUsrGrp/blob/main/usrgrp.sh) 


This is a simple script provides the following information of all the users that are registered on the system and match them with their **IDs**, **Groups**, type of **Bash**, location of **Home** and the **Shell** which he uses.


**Tested on:**

This script works on **Arch Linux**, **Kali Linux**, **Parrot Os**, **Ubuntu 16++.00** & **Debian**


Example of result:

```txt
---------------------------------------------------------------------------
| Usr: maxter || Id: 1000 || Home: /home/maxter || Shell: /usr/bin/zsh |
---------------------------------------------------------------------------
                                Grupos:
Grupo: wheel || ID: 998
Grupo: maxter || ID: 1000
Grupo: vboxusers || ID: 108
```