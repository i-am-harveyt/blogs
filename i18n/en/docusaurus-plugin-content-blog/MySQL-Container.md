---
date: 2025-11-29T06:38:24
title: Run MySQL in Containers
description: Instead of running MySQL locally, I like to run it in containers
slug: mysql-container
tags: [mysql, container]
hide_table_of_contents: false
---

Do you also find that MySQL sometimes develops frustrating, seemingly unsolvable problems? If so, this may help.

<!-- truncate -->

## Questions from Students

Let me spend a little time on the problems students bring to me as a database course TA.
After all, this blog originally existed to support my teaching.

Here are some questions I often hear during environment setup, along with possible approaches or responses:

:::tip Question1
TA, why can't I connect to MySQL?
:::

- Is MySQL running? Quite often, it simply has not been started.
- I have to admit that startup settings can be scattered around. Starting it can be a hassle, and stopping it can be too.

:::tip Question2
TA, what is my MySQL username/password?
:::

- I cannot know your username or password. When did you set them?
- As I recall, Windows asks during installation, while on a Mac you set them during initialization.
- Yet in some cases, something seems to break and the credentials stop working.

:::danger Question 3 (this one really stumped me)
TA, why does MySQL keep starting and stopping?
:::

I am not making this up. I have seen MySQL start, immediately stop, restart itself, stop again, and repeat...

That student eventually solved it by running a container. Hooray for containers!

After helping students, I often add, "Just install Docker! XD" If they can run it, it avoids a lot of detours.

Of course, their hardware needs to support it. But it is 2025, so most computers probably can... right?

## Use Cases

1. You have several tasks requiring different database versions. Repeated installations would be bulky and could leave a mess of configuration files.
2. You use several computers and want their environments to match.
3. **_Most importantly:_** You want the local development database configuration to broadly match the actual deployment environment.
4. As a TA, you need a consistent starting state when demonstrating things to different classes.
5. You are a neat freak like me and would rather avoid cluttering your pristine computer with extra software.

If one or more of these resonates with you, welcome to the world of containers.

## Getting Started

You can generally install [Docker](https://www.docker.com/) or [Podman](https://podman.io/).

Installation differs somewhat, but many of the subsequent commands mainly differ in whether you type `docker` or `podman`.

Assuming installation goes smoothly, we will focus on starting the container and understanding its configuration.

I suggest creating a `Docker/` directory under your home directory:

```bash
$ cd
$ mkdir Docker && cd Docker
```

We will keep the configuration files there for convenience.

:::info
During project development, configuration files usually live in the project directory.

For example, project1 has its own configuration file, and project2 has another.

Here we are setting up a database for everyday use, so an arbitrary subdirectory of the home directory is fine.
:::

## MySQL Official Image

Visit the MySQL page on [Docker Hub](https://hub.docker.com/_/mysql/). Think of it as something like GitHub, but for container images.

It may look intimidating. That is fine: we can return to it when we have a configuration question.

## Docker Compose

:::info
Although this section says Docker, the general approach also applies to Podman.
:::

The next part assumes some familiarity with images and containers. Otherwise, skip ahead to [Docker Compose File](#docker-compose-file).

If you have some background, you may wonder how a Dockerfile differs from docker-compose.

> A Dockerfile describes how to build a Docker image; docker-compose runs containers.
>
> ... Dockerfile and docker-compose is that the Dockerfile describes how to build Docker images, while docker-compose is used to run Docker containers.
>
> [TechTarget The Server Side](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Dockerfile-vs-docker-compose-Whats-the-difference)

In simpler terms:

:::info
Use a Dockerfile to package your project into an image.

Use docker-compose when you already have images and want to run them together.
:::

Our situation is **_we already have a MySQL image and want to run it_**, so we will use docker-compose.

## Docker Compose File

Here is an example of running MySQL with docker-compose. I will explain the configuration fields and link to their references.

First, create `docker-compose.yaml` inside `Docker/`:

```bash
touch docker-compose.yaml
```

Open `docker-compose.yaml` in your favorite editor and paste:

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

Let's go through the pieces:

- `services` lists the services to start. We only need MySQL here, but a real setup might also include Redis and others.
- `dbms_mysql` is the name of our MySQL service. Choose a clear name that does not collide with another service.
- [`image`](https://docs.docker.com/reference/compose-file/services/#image) selects the image. `mysql:9.2` means the `mysql` image with the `9.2` tag. Available tags are listed [here](https://hub.docker.com/_/mysql/tags).
- [`restart`](https://docs.docker.com/reference/compose-file/services/#restart) controls whether the container restarts after stopping. Here, restarting is enabled.
- [`ports`](https://docs.docker.com/reference/compose-file/services/#ports) maps a host IP/port to a container port. MySQL defaults to port 3306, so we map the host's port 3306 to the container's port 3306.
- [`environment`](https://docs.docker.com/reference/compose-file/services/#environment) sets environment variables for the container. The image's required settings are usually documented on [Docker Hub](https://hub.docker.com/_/mysql/).
- The service-level [`volumes`](https://docs.docker.com/reference/compose-file/services/#volumes) attaches a volume declared at the top level. Here, `dbms_mysql` is mounted at `/var/lib/mysql` in the container.
- Think of a top-level [`volume`](https://docs.docker.com/reference/compose-file/volumes/) as persistent storage. Reusing it lets a container access the data already stored there.

:::info
Try removing the named volume configuration: a newly created container may use a new anonymous volume instead.
Your old data then appears to be gone because the new container is using different storage.
:::
