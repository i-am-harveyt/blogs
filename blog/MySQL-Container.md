---
title: Run MySQL in Containers
description: Instead of running MySQL locally, I like to run it in containers
slug: mysql-container
tags: [mysql, container]
hide_table_of_contents: false
---

不知道你是不是也跟我一樣，覺得 MySQL 會出些很麻煩但又很無解的問題？我相信這可以幫到你。

<!-- truncate -->

## 學生問題區

請容我花一點篇幅聊一下我作為資料庫課程助教會遇到的一些學生的疑難雜症。
畢竟這個 Blog 創立的最初目的是為了服務我的教學。

我在裝設環境時常常聽到以下問題，並且附上一些解決思路 or 回應：

:::tip Question1
助教，我的 MySQL 沒辦法連線？
:::

- MySQL 啟動了嗎？蠻多的人的情況其實是沒啟動。
- 這邊我必須說，啟動的設定往往四散各地，啟動是個麻煩，關掉也是個麻煩。

:::tip Question2
助教，我的 MYSQL username/password 是什麼呀？
:::

- 我當然不會知道你的 username/password，這要看你什麼時候設定的了？
- 我記得 Windows 應該是在安裝過程中設定的，Mac 是在初始化的過程中設定的。
- 但這東西似乎在某些情況下會突然壞掉，就不能用了？

:::danger Question3（這問題我超無解）
助教，我的 MySQL 一直在啟動和被關閉之間反覆橫跳？
:::

別說我在唬爛，我真的遇到過，他的 MySQL 啟動後會立刻關閉，然後再自己重啟，再關閉，再重啟...

最後這位學生還真的是靠跑容器解決的。偉哉容器！

我在幫學生解完問題後，常常補上一句：哎呀裝 docker 拉 XDD。如果可以裝的話，很多彎路都不用繞了。

當然前提是大家的電腦硬體條件有到位。不過 2025 年了，(應該)都能跑起來... 吧？

## 使用場景

1. 手邊有多個任務，橫跨多版本資料庫，總不能一直裝吧？這樣很臃腫，設定檔應該也會很亂
2. 有數台電腦，想確保各自電腦中的環境是一致的
3. **_（重點）_** 確保本地開發環境的資料庫跟實際環境中資料庫的設定大致相同
4. 作為助教，在不同班示範時需要讓環境維持在某個狀態，以確保學生們看到的初始狀態大致對齊
5. 電腦潔癖（如我）希望不要有外部的東西來污染我純潔的電腦（欸

如果你對我提到的幾項中有一項或以上的內容有共鳴，歡迎你一起入這容器坑。

## Getting Started

一般來說，可以裝 [docker](https://www.docker.com/) 或是 [podman](https://podman.io/)。

安裝流程上有一點差別，但後續操作上基本只差在指令打 `docker` 或 `podman` 。

先假設大家都能裝好，我們把重點放在如何起起來以及設定檔裡面寫得都是些什麼。

我會建議在 home directory 下建立一個 `Docker/` 路徑

```bash
$ cd
$ mkdir Docker && cd Docker
```

接下來我們把設定檔什麼的放在裡面集中管理。

:::info
在開發過程中，通常是把設定檔放在專案目錄底下。

譬如 project1 裡面有個設定檔，project2 裡面有另一個設定檔。

我們這邊走一個日常使用的目的，所以才放在 home directory 底下的隨便一個子目錄
:::

## MySQL Official Image

可以到 MySQL 的 [docker hub](https://hub.docker.com/_/mysql/)。這有點像 github，但這上面專門放 image。

看著有點恐怖。沒關係，我們等等在設定檔遇到問題再回來看。

## Docker Compose

:::info
雖然這邊寫 docker，但 podman 一樣通用。
:::

以下這段，對 image, container 有概念大概才會看懂，不然就先跳到 [Docker Compose File](#docker-compose-file) 吧。

有一定認識的朋友應該會問了，Dockerfile 跟 docker-compose 差在哪？

> ... Dockerfile 是用來描述如何建立 Docker image，docker-compose 是用來跑 docker 容器。
>
> ... Dockerfile and docker-compose is that the Dockerfile describes how to build Docker images, while docker-compose is used to run Docker containers.
>
> [TechTarget The Server Side](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Dockerfile-vs-docker-compose-Whats-the-difference)

通俗一點來說，

:::info
如果你要把你的專案打包，用 Dockerfile。

如果已經有一些 image ，想讓他們跑起來一起工作，用 docker-compose。
:::

今天我們的情況是 **_已經有 MySQL Image 並且想讓他跑起來_** ，所以用的就是 docker-compose 囉。

## Docker Compose File

這邊是如何用 docker-compose 把 MySQL 跑起來的範例，我會盡量解釋這設定檔中的東西有什麼用途，然後可以在哪裡找到 reference。

請先在 `Docker/` 路徑下創建 `docker-compose.yaml`

```bash
touch docker-compose.yaml
```

然後再用你最喜歡的編輯器打開 `docker-compose.yaml`，在裡面先貼上：

```yaml
services:
  dbms_mysql:
    image: mysql:9.2
    restart: always
    ports:
      - "3306:3306" # port forwarding
    environment:
      MYSQL_ROOT_PASSWORD: 53cr3t
      MYSQL_USER: dbms-example
      MYSQL_PASSWORD: dbms-example
      MYSQL_DATABASE: dbms-example
    volumes:
      - dbms_mysql:/var/lib/mysql

volumes:
  dbms_mysql:
```

我來逐個部分解釋他在做什麼：

- `services` 在描述你有哪些東西需要啟動。在我們的情境中只有 MySQL，但實際情況可能還有 redis 呀什麼的東西。
- `dbms_mysql` 是我們的 MySQL 的服務名稱。這名稱原則上只要清晰好懂不要撞名就好。
- [`image`](https://docs.docker.com/reference/compose-file/services/#image) 是在指定我們要用的 image。`mysql:9.2` 就是在說「我要用 `mysql` image，並且要 tag 是 `9.2` 的版本」。具體來說 tag 有哪些，可以到[這裡](https://hub.docker.com/_/mysql/tags)找。
- [`restart`](https://docs.docker.com/reference/compose-file/services/#restart) 是在描述如果 container 掛了的話要不要重啟？我這邊是設定重啟。
- [`port`](https://docs.docker.com/reference/compose-file/services/#ports) 在描述把 Host 的 IP/Port 映射到 Container 的 PORT。MySQL 的預設 port 是 3306，我們就把主機的 3306 映射到 container 的 3306 就好。
- [`environment`](https://docs.docker.com/reference/compose-file/services/#environment) 是可以為你的容器設定環境變數。Image 起起來的 container 需要哪些設定通常會寫在 [dockerhub](https://hub.docker.com/_/mysql/) 上
- Service 內的 [`volumes`](https://docs.docker.com/reference/compose-file/services/#volumes) 是用來把外層定義的 volume 連結到 container 上，可以看到我這邊把 dbms_mysql 給接到了 container 的 `var/lib/mysql` 上面。
- 外層的 [`volumes`](https://docs.docker.com/reference/compose-file/volumes/) 可以理解成磁碟，如果使用了這個 volumes 就可以把已經存在 volumes 裡面的資料讀進去。

:::info
你可以試試把 volumes 拿掉，會發現每次起 container 都會創建一個新 volume。
這就等於資料都被洗掉了。
:::
