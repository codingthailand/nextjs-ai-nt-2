---
name: deploy-docker-production
description: Build and run a local production Docker image for a Next.js app safely. Use this skill when the user wants to build a Docker image, run a container with an env file, check whether an image version already exists locally, or deploy a Next.js app locally with Docker without hard-coding the project name.
metadata: 
  version: "2.0.1"
---

# Docker Next.js Local Deploy Skill

## Purpose

Use this skill to build and run a Next.js application with Docker using a versioned image tag.

This skill must not hard-code the project name. Infer the image name from the current repository unless the user provides a specific name.

## Project Name Resolution

Before building, determine these values:

```text
PROJECT_NAME=<resolved project name>
IMAGE_NAME=<resolved image name>
IMAGE_VERSION=<resolved version>
IMAGE_TAG=${IMAGE_NAME}:${IMAGE_VERSION}
CONTAINER_NAME=<resolved container name>
ENV_FILE=<resolved env file>
HOST_PORT=<resolved host port>
CONTAINER_PORT=<resolved container port>
```

Resolution rules:

1. If the user provides an image name, use it.
2. Otherwise, read `package.json` and use the `name` field.
3. If `package.json` has no `name`, use the current folder name.
4. Normalize the image name:

   * lowercase
   * replace spaces and underscores with hyphens
   * remove invalid Docker image name characters
5. If the user provides a version, use it.
6. Otherwise, default to `1.0.0`.
7. If the user provides a container name, use it.
8. Otherwise, use the normalized image name as the container name.
9. If the user provides an env file, use it.
10. Otherwise, default to `.env.production`.
11. If the user provides ports, use them.
12. Otherwise, default to `HOST_PORT=4000` and `CONTAINER_PORT=3000`.

Example:

```text
package.json name: nextjs-skill-app-workshop

PROJECT_NAME=nextjs-skill-app-workshop
IMAGE_NAME=nextjs-skill-app-workshop
IMAGE_VERSION=1.0.0
IMAGE_TAG=nextjs-skill-app-workshop:1.0.0
CONTAINER_NAME=nextjs-skill-app-workshop
ENV_FILE=.env.production
HOST_PORT=4000
CONTAINER_PORT=3000
```

## Safety Rules

Before running any build or run command:

1. Confirm the current working directory is the project root.
2. Confirm `Dockerfile` exists.
3. Confirm the env file exists.
4. Confirm Docker is installed and running.
5. Check whether the requested image tag already exists locally.
6. Check whether the requested container name already exists.
7. Never print secrets from the env file.
8. Do not use the `latest` tag unless the user explicitly asks.
9. Do not run destructive cleanup commands such as:

   * `docker system prune`
   * `docker image prune`
   * `docker volume prune`
10. Do not stop, remove, or replace an existing container without explicit confirmation from the user.
11. Do not rebuild an existing version tag unless the user clearly confirms.

## Preflight Checks

Run these checks first:

```bash
pwd
ls -la

test -f package.json && echo "OK: package.json found" || echo "WARN: package.json not found"
test -f Dockerfile && echo "OK: Dockerfile found" || echo "ERROR: Dockerfile not found"
test -f "$ENV_FILE" && echo "OK: env file found: $ENV_FILE" || echo "ERROR: env file not found: $ENV_FILE"

docker --version
docker info >/dev/null && echo "OK: Docker daemon is running" || echo "ERROR: Docker daemon is not running"
```

If `Dockerfile` is missing, stop and report the issue.

If the env file is missing, stop and report the issue. Do not create a placeholder env file unless the user asks.

If Docker daemon is not running, stop and tell the user to start Docker Desktop or Docker Engine.

## Suggested Helper Commands

To infer the image name from `package.json`:

```bash
node -p "require('./package.json').name"
```

If `package.json` does not exist or has no `name`, use the current directory name:

```bash
basename "$PWD"
```

To normalize a project name manually, use lowercase kebab-case.

Example:

```text
My Next App -> my-next-app
nextjs_skill_app -> nextjs-skill-app
```

## Version Tag Check

Before building, check whether the requested image tag already exists:

```bash
docker image inspect "$IMAGE_TAG" >/dev/null 2>&1 \
  && echo "EXISTS: $IMAGE_TAG" \
  || echo "AVAILABLE: $IMAGE_TAG"
```

Also list existing local versions for this image:

```bash
docker images "$IMAGE_NAME" --format "table {{.Repository}}\t{{.Tag}}\t{{.ID}}\t{{.CreatedSince}}\t{{.Size}}"
```

If the requested image tag already exists:

1. Do not run `docker build`.
2. Report that the version already exists locally.
3. Suggest the next patch version, such as `1.0.1`.
4. Ask the user whether to use a new version or explicitly rebuild the same tag.

Only rebuild an existing tag if the user clearly confirms.

## Container Name Check

Before running the container, check whether the container name already exists:

```bash
docker ps -a --filter "name=^/${CONTAINER_NAME}$" \
  --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"
```

If a container with the same name already exists:

1. Do not run another container with the same name.
2. Report the existing container status.
3. Ask the user whether to stop/remove it or use a different container name.
4. Do not remove it automatically.

## Build Command

If the image tag does not exist, run:

```bash
docker build -t "$IMAGE_TAG" .
```

After build, verify the image exists:

```bash
docker image inspect "$IMAGE_TAG" >/dev/null \
  && echo "OK: image built successfully: $IMAGE_TAG" \
  || echo "ERROR: image not found after build: $IMAGE_TAG"
```

## Run Command

If the image exists and the container name is available, run:

```bash
docker run --restart=always -d \
  --name "$CONTAINER_NAME" \
  --env-file "$ENV_FILE" \
  -p "${HOST_PORT}:${CONTAINER_PORT}" \
  "$IMAGE_TAG"
```

## Post-run Validation

After running the container, validate with:

```bash
docker ps --filter "name=^/${CONTAINER_NAME}$" \
  --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"

docker logs --tail=80 "$CONTAINER_NAME"

curl -I "http://localhost:${HOST_PORT}"
```

Expected result:

1. Container status should be `Up`.
2. Port mapping should include `${HOST_PORT}->${CONTAINER_PORT}`.
3. Logs should not show fatal errors.
4. `curl -I` should return an HTTP response such as `200`, `301`, `302`, `307`, or `308`.

If `curl` fails, inspect logs and report the likely cause.

## Common Failure Handling

### Image tag already exists

Report:

```text
Image tag already exists locally:
<IMAGE_TAG>

Recommended action:
- Use a new patch version, such as 1.0.1
- Or explicitly confirm rebuilding the same tag
```

### Container name already exists

Report:

```text
Container already exists:
<CONTAINER_NAME>

Please confirm whether to stop/remove it, or provide a different container name.
```

### Port already in use

Check:

```bash
lsof -i :"$HOST_PORT"
```

Report the process using the port and ask whether the user wants to change `HOST_PORT`.

### Env file missing

Report:

```text
Env file was not found:
<ENV_FILE>

I cannot run the container with --env-file until this file exists.
```

Do not print or infer secrets.

### Docker daemon not running

Report:

```text
Docker is installed but the daemon is not running.
Start Docker Desktop or Docker Engine, then run the preflight checks again.
```

## Final Response Format

When finished, report:

```text
Result:
- Project: <PROJECT_NAME>
- Image: <IMAGE_TAG>
- Container: <CONTAINER_NAME>
- Env file: <ENV_FILE>
- Port: http://localhost:<HOST_PORT>
- Restart policy: always
- Validation: passed/failed

Commands used:
<list important commands>

Notes:
<any warnings, existing image/container conflicts, or follow-up action>
```

If the workflow stops because of an existing version tag, missing env file, existing container, Docker error, or port conflict, clearly state the blocking issue and the safest next command.