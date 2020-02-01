# Offline Storage Storage Demo

This applications demonstrates the generic base configuration of the Ionic Enterprise Offline Storage solution. This demo application deals with configuration and creation of the database and demonstrates sample CRUD operations.

## Running the Application

In order to run this application, you need access to the Ionic Enterprise Offline Storage plugin.  If do not have access to this plugin, please contact your account manager.

Here are the general steps required to run this application:

- clone the repo and change to its root directory
- `npm install`
- `npm run build`
- `ionic cordova platform add ios` (and/or android)
- `ionic cordova platform build ios` (and/or android)

At this point you should be able to sideload the application on a device or run it in an emulator and try it out.

## General Architecture

### Services

#### Database

The database service is concerned with initializing the database and creating or modifying the schema as needed. A more complex app containing multiple databases should have multiple "database" services, one for each database. In that case, some routines from this service will likely need to be abstracted into a "database utility" service to avoid replication of logic.

#### Other Services

Each of the other services in this application handle the CRUD operations for ONE type of data entity within the application domain. Note that this does not have to be a table-by-table grouping. It can be, but it does not have to be. A logical entity within the application domain could easily span multiple tables.

### Store

This application uses an NgRX store to manage the state of the application. The store uses effects to communicate with the databases via the services mentioned above.

### Pages

The pages know nothing about how the data is stored. They get the current state from the store and dispatch actions to the store when required.  This allows them to focus on the concerns of displaying the information to the user and reacting to interaction from the user.
