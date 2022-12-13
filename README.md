# What is this repo?

This repo is intended to showcase portal features, provide documentation, reference modules and more.

It is also an environment where new portal features can be spiked, tested and documented.

# Portal basics

The portal allows different applications to execute within a shared context.
The shared context can provide user login, a notification system, a shared dashboard view, user management, navigation between applications and language features.

## Frontend components
The frontend executes as one single react app.

### Shell
The shell is the context that the portal provides. It is built as typescript library and provides no runtime on its own.
It provides the IModule typescript interface.

### Modules
A module is an app that lives inside the Shell. All modules are completely isolated from each other, and have no knowledge of other modules. Modules implement the IModule interface which will inform the shell about various properties, like its name, some menu item label, the widgets it expose etc. A module will receive read-only props from the shell, like the current user, for example.

### App
This is the runtime. It bundles 0-* modules with the shell. The end product will only contain one app, called "portal". However, for developer convenience, we might have multiple apps containing only the modules you currently work with.

## Backend components
The backend consist of multiple apis, executing as separate applications.

### Auth Reverse Proxy
Acts as a layer between the frontend and different apis. See: https://www.kallemarjokorpi.fi/blog/request-routing-in-bff.html (I don't agree with how the term BFF is used here.)
Will use cookie auth and translate that to token auth when proxying apis.

### Module Apis
Each module provides its on api (this is closer to BFF in my opinion). A module runs as its own executable, and may be hosted anywhere. The reverse proxy is responsible for routing requests
to the proper api. The reverse proxy therefore has to be configured to know about existing module apis.

### Shell Apis
The shell might provide som apis on its own. The idea is that these can exist as isolated apis, or be packaged together with the auth reverse proxy.

# Getting started with development

## How to run

- pnpm install
- pnpm dev


# TODO:
User authentication
Build pipelines
Azure environments
User authorization
Notifications
Dashboard and widgets
default language
module api
docker files for local development?



